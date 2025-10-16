"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Mail,
  Menu,
  X,
  Github,
  Linkedin,
  Download,
  Sparkles,
  Gamepad2
} from "lucide-react";

// Constants moved outside component for optimization
const LINKS = [
  { url: "/", title: "Home", Icon: Home },
  { url: "/about", title: "About", Icon: User },
  { url: "/portfolio", title: "Portfolio", Icon: Briefcase },
   { url: "/devlife", title: "Dev Life", Icon: Gamepad2 }, // ADD THIS
  { url: "/contact", title: "Contact", Icon: Mail }
];

const SOCIAL_LINKS = [
  { Icon: Github, href: "https://github.com/shubham-dev-tiwari", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com/in/shubham-dev-tiwari/", label: "LinkedIn" }
];

// Memoized Logo Component
const Logo = ({ isMobile = false }) => (
  <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 sm:gap-3"
    >
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg blur opacity-40"
        />
        <div className="relative w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white text-base sm:text-lg md:text-xl shadow-lg">
          ST
        </div>
      </div>
      <div className={isMobile ? "block" : "hidden xs:block sm:block"}>
        <h1 className={`text-white font-bold ${isMobile ? 'text-base sm:text-lg' : 'text-sm sm:text-base md:text-lg lg:text-xl'} drop-shadow-lg leading-tight`}>
          Shubham Tiwari
        </h1>
        <p className="text-gray-300 text-[10px] sm:text-xs flex items-center gap-1 drop-shadow-md">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 
          {isMobile ? "Web Developer" : <><span className="hidden sm:inline">Web Developer</span><span className="sm:hidden">Developer</span></>}
        </p>
      </div>
    </motion.div>
  </Link>
);

// Memoized NavLink Component
const NavLink = ({ link, idx }) => {
  const { url, title, Icon } = link;
  
  return (
    <Link key={url} href={url}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-3 xl:px-4 py-2 rounded-lg cursor-pointer group text-gray-300 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2 relative z-10 drop-shadow-md text-sm xl:text-base">
          <Icon className="w-4 h-4" />
          <span className="font-medium">{title}</span>
        </div>
        <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm" />
      </motion.div>
    </Link>
  );
};

// Memoized Social Icon Component
const SocialIcon = ({ Icon, href, idx, isMobile = false }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={isMobile ? { scale: 0 } : false}
    animate={isMobile ? { scale: 1 } : false}
    transition={isMobile ? { delay: 0.4 + idx * 0.1, type: "spring" } : undefined}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.9 }}
    className={isMobile 
      ? "flex-1 p-3 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all group"
      : "p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
    }
    aria-label={Icon.name}
  >
    <Icon className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4 xl:w-5 xl:h-5'} text-gray-300 group-hover:text-white transition-colors drop-shadow-md`} />
  </motion.a>
);

// Memoized Mobile NavLink Component
const MobileNavLink = ({ link, idx, onClick }) => {
  const { url, title, Icon } = link;
  
  return (
    <Link href={url} onClick={onClick}>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: idx * 0.1, type: "spring" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm group"
      >
        <motion.div className="group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </motion.div>
        <span className="font-medium drop-shadow-md text-sm sm:text-base">{title}</span>
      </motion.div>
    </Link>
  );
};

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Memoized handlers
  const handleToggle = useCallback(() => setOpen(prev => !prev), []);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  // Memoized nav classes
  const navClasses = useMemo(() => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-purple-500/20"
        : "bg-gradient-to-br from-gray-950 via-purple-950/20 to-black backdrop-blur-xl border-b border-white/5"
    }`, [scrolled]
  );

  if (!mounted) {
    return (
      <nav className="relative top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="h-12 sm:h-14 md:h-20" />
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={navClasses}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* Logo */}
          <Logo />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {LINKS.map((link, idx) => (
              <NavLink key={link.url} link={link} idx={idx} />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {SOCIAL_LINKS.map(({ Icon, href }, idx) => (
              <SocialIcon key={idx} Icon={Icon} href={href} idx={idx} />
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139,92,246,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-3 xl:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-all text-sm xl:text-base"
            >
              <Download className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-40"
            />
            
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-[85%] xs:w-3/4 sm:w-2/3 md:w-1/2 bg-gradient-to-br from-gray-950 via-purple-950/30 to-black backdrop-blur-2xl border-l border-white/10 overflow-y-auto lg:hidden z-50 shadow-2xl"
            >
              <div className="min-h-full flex flex-col p-4 sm:p-6">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <Logo isMobile />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-all"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2 mb-6 flex-grow">
                  {LINKS.map((link, idx) => (
                    <MobileNavLink key={link.url} link={link} idx={idx} onClick={handleClose} />
                  ))}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto space-y-4">
                  {/* Social Icons */}
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map(({ Icon, href }, idx) => (
                      <SocialIcon key={idx} Icon={Icon} href={href} idx={idx} isMobile />
                    ))}
                  </div>

                  {/* Resume Button */}
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-center shadow-lg text-sm sm:text-base"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Resume
                    </div>
                  </motion.a>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4 border-t border-white/10 text-center"
                  >
                    <p className="text-gray-400 text-xs">
                      Made with 💜 by Shubham
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
