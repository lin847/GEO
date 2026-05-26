import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Globe, 
  Layout, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowUpRight,
  Code,
  Zap,
  Shield,
  Smartphone,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  X as CloseIcon
} from 'lucide-react';

// Using the local asset path as requested
const LOGO_PATH = "/src/assets/logo.png";

// Toast Notification Component
const ToastNotification = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.9 }}
      className={`fixed top-8 right-8 z-50 max-w-md rounded-2xl shadow-2xl border backdrop-blur-md ${
        type === 'success' 
          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      <div className="p-6 flex items-start gap-4">
        <div className={`p-2 rounded-xl ${
          type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          {type === 'success' ? (
            <CheckCircle2 size={24} className="text-green-400" />
          ) : (
            <AlertCircle size={24} className="text-red-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-lg mb-1 ${
            type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <CloseIcon size={20} className="text-white/50" />
        </button>
      </div>
      {type === 'success' && (
        <div className="h-1 bg-green-500/30 rounded-b-2xl overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-green-500/60"
          />
        </div>
      )}
    </motion.div>
  );
}; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-brand-red/20">
             {/* Fallback to initials if image doesn't load */}
             <img 
               src={LOGO_PATH} 
              //  alt="geomagnetic" 
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-white font-bold text-xl">LK</span>';
               }}
             />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tighter text-xl leading-none">LK WEB DESIGNERS</span>
            <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] uppercase">Limited</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-white/70 hover:text-brand-red transition-colors tracking-wide">
              {item}
            </a>
          ))}
          <button className="bg-brand-red hover:bg-red-700 text-white px-7 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/30">
            apple
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-brand-black border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-2xl font-bold hover:text-brand-red transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-brand-red text-white px-6 py-4 rounded-xl text-center font-bold text-lg">
                apple
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 circuit-pattern opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Zap size={14} />
            GEOMAGNETICS
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
            GEOMAGNETICS <br />
            <span className="text-brand-red">DIGITAL</span> EMPIRES.
          </h1>
          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
           GEOMAGNETICS</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           
            <a href="#contact" className="w-full sm:w-auto"
>
  <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg transition-all">
    Join The List
  </button>
</a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Layout className="text-brand-red" size={32} />,
      title: "tour",
      desc: "may 2027"
    },
    {
      icon: <Cpu className="text-brand-red" size={32} />,
      title: "tour",
      desc: "june 2027."
    },
    {
      icon: <Smartphone className="text-brand-red" size={32} />,
      title: "tour",
      desc: "july2027"
    },
    {
      icon: <Shield className="text-brand-red" size={32} />,
      title: "tour",
      desc: "september 2027."
    },
    {
      icon: <Globe className="text-brand-red" size={32} />,
      title: "tour",
      desc: "october 2027."
    },
    {
      icon: <Code className="text-brand-red" size={32} />,
      title: "tour",
      desc: "november 2027."
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            We combine technical prowess with creative vision to deliver solutions that are as functional as they are beautiful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8 group hover:bg-brand-red/5 transition-colors"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 leading-relaxed mb-6">
                {s.desc}
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:gap-3 transition-all">
                Learn More <ChevronRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Lumina Tech",
      category: "IoT Dashboard",
      image: "https://picsum.photos/seed/tech/800/600"
    },
    {
      title: "Elysian Homes",
      category: "Luxury Real Estate",
      image: "https://picsum.photos/seed/luxury/800/600"
    },
    {
      title: "Nova Crypto",
      category: "Fintech Platform",
      image: "https://picsum.photos/seed/crypto/800/600"
    },
    {
      title: "Aether Audio",
      category: "E-commerce",
      image: "https://picsum.photos/seed/audio/800/600"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
            <p className="text-white/50 max-w-md">
              A glimpse into the digital experiences we've crafted for our global partners.
            </p>
          </div>
          <button className="text-brand-red font-bold flex items-center gap-2 hover:underline">
            View All Projects <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3]"
            >
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-brand-red text-sm font-bold uppercase tracking-widest mb-2">{p.category}</div>
                <h3 className="text-3xl font-bold">{p.title}</h3>
              </div>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white text-brand-black rounded-full flex items-center justify-center">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ onToast }: { onToast: (toast: { message: string; type: 'success' | 'error' }) => void }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const services = [
    "Website Design", "E-commerce", "IoT Solutions", 
    "Mobile Apps", "SEO & Marketing", "Branding", 
    "Cyber Security", "Cloud Hosting"
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || selectedServices.length === 0) {
      onToast({
        message: 'Please fill in all required fields and select at least one service.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(' https://contactform-5osmz525fq-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          selectedServices: selectedServices,
          message: formData.message
        })
      });

      if (response.ok) {
        onToast({
          message: 'Thank you! Your enquiry has been sent successfully. We\'ll get back to you within 24 hours.',
          type: 'success'
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setSelectedServices([]);
      } else {
        onToast({
          message: 'Failed to send your enquiry. Please try again or contact us directly.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      onToast({
        message: 'Network error. Please check your connection and try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Left Side: Info (Inspired by CB Website Design) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-5xl font-black mb-6 leading-tight">
                Interested in discussing a <span className="text-brand-red">project</span> with us?
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                If you begin filling in this form but don’t finish, we may still contact you based on the details you’ve entered so far.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
              <div className="space-y-4">
                <h4 className="text-brand-red font-black uppercase tracking-widest text-sm">London Office</h4>
                <div className="flex items-start gap-4 text-white/70">
                  <MapPin className="shrink-0 text-brand-red" size={20} />
                  <p></p>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <Phone className="shrink-0 text-brand-red" size={20} />
                  <p>07534655863</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-brand-red font-black uppercase tracking-widest text-sm">Surrey Office</h4>
                <div className="flex items-start gap-4 text-white/70">
                  <MapPin className="shrink-0 text-brand-red" size={20} />
                  <p></p>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <Phone className="shrink-0 text-brand-red" size={20} />
                  <p>(+44) 07534655863</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-brand-red font-black uppercase tracking-widest text-sm">Direct Contact</h4>
                <div className="flex items-center gap-4 text-white/70">
                  <Mail className="shrink-0 text-brand-red" size={20} />
                  <p>Lkwebd1@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form (Inspired by CB Website Design "Project Scope") */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Project Scope Selection */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-bold">Project Scope</h3>
                    <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Select multiple</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                          selectedServices.includes(service) 
                            ? 'bg-brand-red border-brand-red text-white' 
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="+44 0000 000000" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-red transition-colors" 
                      placeholder="Your Agency Ltd" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest">Project Details</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-red transition-colors resize-none" 
                    placeholder="Tell us about your goals, timeline, and budget..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/40">
                  <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-brand-red focus:ring-brand-red" />
                  <p>I agree to the <a href="#" className="underline hover:text-white">Privacy Policy</a> and data management.</p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red hover:bg-red-700 disabled:bg-brand-red/50 disabled:cursor-not-allowed text-white font-black py-5 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-brand-red/30"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND ENQUIRY'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-brand-red/20">
                 {/* Fallback to initials if image doesn't load */}
                 <img 
                   src={LOGO_PATH} 
                   alt="LK Web Designers" 
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     (e.target as HTMLImageElement).style.display = 'none';
                     (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-white font-bold text-xl">LK</span>';
                   }}
                 />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tighter text-2xl leading-none">LK WEB DESIGNERS</span>
                <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] uppercase">Limited</span>
              </div>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed mb-8">
              A premium UK digital agency specializing in high-end web design, IoT solutions, and luxury branding.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all cursor-pointer">
                  <Globe size={18} />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-brand-red">Services</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Website Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IoT Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Branding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cyber Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-brand-red">Quick Links</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Agency</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
          <div>© {new Date().getFullYear()} LK Web Designers Limited.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  return (
    <div className="min-h-screen selection:bg-brand-red selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <ContactSection onToast={setToast} />
      <Footer />
      
      {/* Global Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <ToastNotification
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
