import { propertyConfig } from "@/lib/propertyData";

const Footer = () => {
  return (
    <footer className="py-10 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="text-center">
          <p className="text-sm text-white/70">
            © 2026 {propertyConfig.contact.company}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
