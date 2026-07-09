import { useEffect, useState } from "react";

const StickyInquire = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = window.innerHeight;
      const registerEl = document.getElementById("register");
      const registerTop = registerEl?.getBoundingClientRect().top ?? Infinity;
      
      setVisible(window.scrollY > heroBottom && registerTop > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToRegister}
      className={`fixed bottom-8 right-8 z-40 px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase bg-charcoal text-white shadow-elegant backdrop-blur-sm transition-all duration-500 hover:bg-charcoal/90 hover:-translate-y-0.5 hover:shadow-lg ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ borderRadius: "4px" }}
    >
      Inquire
    </button>
  );
};

export default StickyInquire;
