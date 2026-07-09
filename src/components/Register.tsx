import { useState } from "react";
import { propertyConfig } from "@/lib/propertyData";
import { toast } from "sonner";
import { Phone, Mail } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid US phone number — (555) 000-0000");
      return;
    }
    setIsSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error: insertError } = await supabase.from("leads").insert({
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest || null,
        message: null,
        source: propertyConfig.name,
        user_agent: navigator.userAgent,
      });
      if (insertError) throw insertError;

      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "inquiry-notification",
          idempotencyKey: `brochure-${id}`,
          templateData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interest: formData.interest,
            source: `Brochure request — ${propertyConfig.name}`,
          },
        },
      });
      if (error) throw error;

      toast.success(`Thank you. Patrick will follow up with the ${propertyConfig.name} brochure shortly.`);
      setFormData({ name: "", email: "", phone: "", interest: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call (609) 602-3917 or email PatrickAHalliday@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="section-padding section-sand">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className={`max-w-xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="label-uppercase mb-4">Exclusive Opportunity</p>
            <h2 className="heading-section text-charcoal mb-4">
              Request Exclusive Pre-Sale Information
            </h2>
            <p className="text-body">
              Register your interest to receive priority access to architectural plans, 
              pricing details, and exclusive pre-sale updates.
            </p>
          </div>

          {/* Direct Contact Info */}
          <div className="bg-white border border-border-subtle p-6 mb-8" style={{ borderRadius: '4px' }}>
            <p className="text-xs uppercase tracking-wider text-muted-slate mb-4 text-center">
              Direct Contact
            </p>
            <div className="text-center mb-4">
              <p className="font-serif text-lg text-charcoal">{propertyConfig.contact.name}</p>
              <p className="text-sm text-muted-slate">{propertyConfig.contact.company}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href={`tel:${propertyConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {propertyConfig.contact.phone}
              </a>
              <a 
                href={`mailto:${propertyConfig.contact.email}`}
                className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-muted-slate transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                {propertyConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input-elegant" placeholder="John Smith" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-elegant" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-elegant" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-muted-slate mb-2">Interest Level</label>
              <select id="interest" name="interest" value={formData.interest} onChange={handleChange} required className="input-elegant appearance-none cursor-pointer">
                <option value="">Select your interest...</option>
                {propertyConfig.interestLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? "Submitting..." : "Request Private Brochure"}
            </button>
            <p className="text-xs text-center text-muted-slate">
              Your information is kept strictly confidential and will never be shared.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
