import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'
import { TEMPLATES } from '../_shared/transactional-email-templates/registry.ts'

const TEMPLATE_NAME = 'inquiry-notification'

interface InquiryBody {
  leadId?: string
  name?: string
  email?: string
  phone?: string
  interest?: string
  message?: string
  source?: string
}

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/** Appends a row to the project's own send history. Never decides the send result. */
async function logSend(
  supabase: ReturnType<typeof createClient>,
  recipient: string,
  status: 'sent' | 'suppressed' | 'failed',
  errorMessage?: string,
) {
  const { error } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: TEMPLATE_NAME,
    recipient_email: recipient,
    status,
    error_message: errorMessage ?? null,
  })
  if (error) {
    console.error('Failed to write email_send_log', { code: error.code, message: error.message })
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables')
    return jsonResponse({ error: 'Server configuration error' }, 500)
  }

  let body: InquiryBody
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON in request body' }, 400)
  }

  const name = clean(body.name, 200)
  const email = clean(body.email, 320)
  const phone = clean(body.phone, 40)
  const interest = clean(body.interest, 100)
  const message = clean(body.message, 5000)
  const source = clean(body.source, 200)
  const leadId = clean(body.leadId, 100)

  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return jsonResponse({ error: 'A valid name and email address are required' }, 400)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // The notification always goes to the fixed address defined on the template.
  const templateData = { name, email, phone, interest, message, source }
  const notificationRecipient = TEMPLATES[TEMPLATE_NAME]?.to ?? email

  try {
    const result = await sendTemplateEmail(TEMPLATE_NAME, email, {
      templateData,
      idempotencyKey: `${TEMPLATE_NAME}-${leadId || crypto.randomUUID()}`,
    })

    if (!result.sent) {
      await logSend(supabase, notificationRecipient, 'suppressed')
      console.log('Inquiry notification suppressed', { source })
      return jsonResponse({ success: false, reason: 'recipient_suppressed' })
    }

    await logSend(supabase, notificationRecipient, 'sent')
    console.log('Inquiry notification sent', { source })
    return jsonResponse({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Inquiry notification failed', { message: errorMessage })
    await logSend(supabase, notificationRecipient, 'failed', errorMessage)
    return jsonResponse({ error: 'Failed to send notification' }, 500)
  }
})
