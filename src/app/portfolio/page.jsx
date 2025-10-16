"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Play, Info, ExternalLink, Star, TrendingUp, Code2, Sparkles, Zap, Shield, Film, Car, MessageSquare, Hash, BarChart3, FileText, Hotel, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "iPhone 15 Pro Clone",
    tagline: "Apple's Premium Landing Page Recreation",
    desc: "Stunning recreation of Apple's iPhone 15 Pro landing page with smooth GSAP animations, 3D model viewer using Three.js, and pixel-perfect modern UI/UX design matching Apple's aesthetic.",
    img: "/iphone.jpg",
    link: "https://i-phone-three-hazel.vercel.app/",
    category: "Featured",
    tech: ["React", "Three.js", "GSAP"],
    year: "2025",
    featured: true,
    icon: Sparkles
  },
  {
    id: 2,
    title: "Netflix Clone",
    tagline: "Complete Streaming Platform",
    desc: "🎬 Full-featured Netflix clone with movie browsing, search functionality, detailed movie info, trailer playback, and user authentication. Built with React and TMDb API for rich media content.",
    img: "/netflix.webp",
    link: "https://github.com/shubham-dev-tiwari/netflix",
    category: "Featured",
    tech: ["React", "TMDb API", "Node.js"],
    year: "2024",
    featured: true,
    icon: Film
  },
  {
    id: 3,
    title: "Bhairava",
    tagline: "Creative Landing Page",
    desc: "Artistic and visually stunning landing page showcasing advanced CSS animations and modern design principles. Built with pure HTML and CSS.",
    img: "/bhairava.jpg",
    link: "https://bhairava.vercel.app/",
    category: "Featured",
    tech: ["HTML", "CSS", "Animations"],
    year: "2024",
    featured: true,
    icon: Sparkles
  },
  {
    id: 4,
    title: "Cars Showcase",
    tagline: "Luxury Car Platform",
    desc: "Modern car showcase platform built with TypeScript and React. Features smooth animations, responsive design, and elegant UI for browsing luxury vehicles.",
    img: "/car.jpg",
    link: "https://github.com/shubham-dev-tiwari/cars",
    category: "E-Commerce",
    tech: ["TypeScript", "React", "CSS3"],
    year: "2024",
    icon: Car
  },
  {
    id: 5,
    title: "Ashen Ascend",
    tagline: "Dark Souls Inspired Game",
    desc: "Adaptive AI adversary system with Unreal Engine 5 in C++ 17. Features combat animations, health systems, precise hitbox collision detection, and DQN integration.",
    img: "/ashen.jpg",
    link: "https://ashen-ascend.jimdosite.com/",
    category: "Game Dev",
    tech: ["C++", "Unreal Engine", "AI/ML"],
    year: "2023",
    icon: Zap
  },
  {
    id: 6,
    title: "Nykaa Clone",
    tagline: "Beauty E-Commerce Platform",
    desc: "Full-featured e-commerce clone of Nykaa beauty store. Complete shopping experience with product catalog, cart management, checkout flow, and responsive design.",
    img: "/Nykaa.webp",
    link: "https://nykaa-clone-lovat.vercel.app",
    category: "E-Commerce",
    tech: ["Next.js", "React", "E-Commerce"],
    year: "2025",
    icon: ShoppingBag
  },
  {
    id: 7,
    title: "WhatsApp Translator",
    tagline: "Real-Time Translation Bot",
    desc: "Intelligent WhatsApp bot that translates messages in real-time. Supports multiple languages and seamless integration with WhatsApp Web API.",
    img: "/whatsapp.jpg",
    link: "https://github.com/shubham-dev-tiwari/whatsapp-translator",
    category: "AI/ML",
    tech: ["Node.js", "Translation API", "WhatsApp API"],
    year: "2024",
    icon: MessageSquare
  },
  {
    id: 8,
    title: "Word Counter",
    tagline: "Text Analysis Tool",
    desc: "Powerful text analysis tool with word counting, character counting, reading time estimation, and keyword density analysis. Clean and minimal UI.",
    img: "/word.png",
    link: "https://word-counter-two-delta.vercel.app/",
    category: "Utility",
    tech: ["JavaScript", "HTML", "CSS"],
    year: "2023",
    icon: Hash
  },
  {
    id: 9,
    title: "CRM Stats Dashboard",
    tagline: "Customer Analytics Platform",
    desc: "Comprehensive CRM statistics dashboard with data visualization, customer insights, sales analytics, and interactive charts for business intelligence.",
    img: "/crm.jpg",
    link: "https://crm-stats-ashen.vercel.app/",
    category: "SaaS",
    tech: ["React", "Chart.js", "Analytics"],
    year: "2024",
    icon: BarChart3
  },
  {
    id: 10,
    title: "Invoice Generator",
    tagline: "Professional Invoicing Tool",
    desc: "Simple and efficient invoice generator web application designed to streamline the process of creating and managing professional invoices with PDF export.",
    img: "/invoice.jpg",
    link: "https://invoice-genrator-tawny.vercel.app/",
    category: "Utility",
    tech: ["React", "PDF.js", "Forms"],
    year: "2023",
    icon: FileText
  },
  {
    id: 11,
    title: "King Sukh Guest House",
    tagline: "Hospitality Booking Platform",
    desc: "Modern web application for guest house bookings with responsive design, smooth animations, and scalable architecture. Features room browsing and booking system.",
    img: "/king.png",
    link: "https://github.com/shubham-dev-tiwari/king-sukh",
    category: "Utility",
    tech: ["React", "Booking System", "UI/UX"],
    year: "2024",
    icon: Hotel
  },
  {
    id: 12,
    title: "Aura Bazar",
    tagline: "E-Commerce Platform",
    desc: "Feature-rich e-commerce website built with React.js framework. Includes product catalog, shopping cart, checkout system, and modern UI components.",
    img: "/aurabazar.png",
    link: "https://aurabazar.vercel.app/",
    category: "E-Commerce",
    tech: ["React.js", "Shopping Cart", "UI"],
    year: "2024",
    icon: ShoppingBag
  },
  {
    id: 13,
    title: "CLAT IQ",
    tagline: "Legal Aptitude Platform",
    desc: "Comprehensive platform for CLAT (Common Law Admission Test) preparation with practice tests, performance analytics, study materials, and progress tracking.",
    img: "/clat.png",
    link: "https://clat-iq-6ae4.vercel.app/",
    category: "EdTech",
    tech: ["React", "Firebase", "Testing"],
    year: "2024",
    icon: Code2
  },
  {
    id: 14,
    title: "Better Call Alp",
    tagline: "Educator Portfolio",
    desc: "Showcasing innovation across EdTech leadership, AI filmmaking, mathematical research, and creative content creation. Each project represents a commitment to excellence and transformative impact.",
    img: "/alp1.png",
    link: "https://bettercallalp-phi.vercel.app/",
    category: "EdTech",
    tech: ["React", "Node.js", "EdTech"],
    year: "2024",
    icon: Shield
  },
  {
    id: 15,
    title: "Audiophile",
    tagline: "Premium Audio E-Commerce",
    desc: "Elegant e-commerce platform for high-end audio equipment. Features beautiful product showcases, detailed specs, and smooth checkout experience.",
    img: "/audiophile.png",
    link: "https://audiophile-ecommerce-mbart13.vercel.app/",
    category: "E-Commerce",
    tech: ["React", "Styled Components", "Audio"],
    year: "2023",
    icon: Sparkles
  },
  {
    id: 16,
    title: "Go-GPT Terminal",
    tagline: "AI Terminal Chatbot",
    desc: "Terminal-based chatbot using Golang and GPT-3.5 API. Implements conversation logic with back-and-forth communication and context management.",
    img: "/gogpt.png",
    link: "https://github.com/shubh518/chat_gpt_with_go",
    category: "AI/ML",
    tech: ["Golang", "GPT-3.5", "Terminal"],
    year: "2024",
    icon: Zap
  },
  {
    id: 17,
    title: "Exclusive E-Commerce",
    tagline: "Modern Shopping Platform",
    desc: "Full-stack e-commerce application with React, Vite, Tailwind CSS and Material UI. Features modern design, fast performance, and complete shopping flow.",
    img: "/exclusive.png",
    link: "https://e-commerce--one.vercel.app/",
    category: "E-Commerce",
    tech: ["React", "Vite", "Tailwind", "Material UI"],
    year: "2024",
    icon: ShoppingBag
  },
  {
    id: 18,
    title: "Ritu-Chakra",
    tagline: "Weather Forecast App",
    desc: "Beautiful weather forecast application with 5-day predictions. Features clean responsive design, real-time weather data, and intuitive user interface.",
    img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    link: "https://ritu-chakra.vercel.app/",
    category: "Utility",
    tech: ["React", "Weather API", "UI/UX"],
    year: "2023",
    icon: Sparkles
  },
  {
    id: 19,
    title: "Nexus Movies",
    tagline: "Movie Discovery Platform",
    desc: "Dynamic movie discovery website with seamless UX and modern UI patterns. Browse trending movies, search functionality, and detailed movie information.",
    img: "/nexus.svg",
    link: "https://nexus-sigma-ten.vercel.app/",
    category: "Entertainment",
    tech: ["React", "TMDB API", "Search"],
    year: "2023",
    icon: Film
  },
  {
    id: 20,
    title: "CRUD API",
    tagline: "RESTful Backend",
    desc: "Production-ready REST API using Golang with HTTP methods for CRUD operations. Demonstrates proficiency in net/http and encoding/json libraries.",
    img: "/crud.png",
    link: "https://github.com/shubh518/Crud-Api",
    category: "Backend",
    tech: ["Golang", "REST API", "HTTP"],
    year: "2023",
    icon: Code2
  },
  {
    id: 21,
    title: "Discord Bot",
    tagline: "Community Assistant",
    desc: "Feature-rich Discord bot using Golang and DiscordGo library. Provides server management, user interaction, and automated community features.",
    img: "/discord-bot.png",
    link: "https://github.com/shubh518/discord_bot",
    category: "Backend",
    tech: ["Golang", "Discord API", "Bot"],
    year: "2023",
    icon: MessageSquare
  },
  {
    id: 22,
    title: "Cryptography Suite",
    tagline: "Encryption & Security Tools",
    desc: "Strong encryption algorithms implemented in Go. Features file I/O operations, user interaction, cryptographic libraries, and secure key management.",
    img: "/cryptography.png",
    link: "https://github.com/shubh518/Cryptography-With-Go",
    category: "Security",
    tech: ["Golang", "Cryptography", "Security"],
    year: "2024",
    icon: Shield
  }
];

const categories = ["Featured", "All", "E-Commerce", "AI/ML", "Game Dev", "Backend", "EdTech", "SaaS", "Utility", "Entertainment", "Security"];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const categoryScrollRef = useRef(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : selectedCategory === "Featured"
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === selectedCategory);

  const featuredProjects = projects.filter(p => p.featured);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  useEffect(() => {
    const interval = setInterval(nextFeatured, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentFeatured = featuredProjects[currentFeaturedIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white">
      
      {/* Hero Section - Featured Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeaturedIndex}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentFeatured.img}
              alt={currentFeatured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1f] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevFeatured}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <button
          onClick={nextFeatured}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeaturedIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-full md:max-w-2xl"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-600/90 backdrop-blur-sm rounded-full mb-4 md:mb-6">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-bold uppercase">Featured Project</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 md:mb-4 leading-tight">
                  {currentFeatured.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-2">
                  {currentFeatured.tagline}
                </p>

                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-6 md:mb-8 max-w-xl line-clamp-3">
                  {currentFeatured.desc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {currentFeatured.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs md:text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link href={currentFeatured.link} target="_blank">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-lg font-bold hover:bg-white/90 transition-colors text-sm md:text-base"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5 fill-black" />
                      View Project
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(currentFeatured)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-colors text-sm md:text-base"
                  >
                    <Info className="w-4 h-4 md:w-5 md:h-5" />
                    More Info
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        
      </section>

      {/* Category Filter - FIXED FOR ALL DEVICES */}
      <section className=" top-0 z-40 bg-gradient-to-b from-[#0f0a1f] to-[#0f0a1f]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-6">
          <div 
            ref={categoryScrollRef}
            className="flex gap-2 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 snap-start px-4 md:px-6 py-1.5 md:py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm md:text-base ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            {selectedCategory === "Featured" ? "Featured Projects" : `${selectedCategory} Projects`}
          </h2>
          <p className="text-sm md:text-base text-white/60">{filteredProjects.length} projects</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group cursor-pointer"
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/30 transition-colors"
              >
                {/* Image - OBJECT-COVER APPLIED */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image 
  src={project.img} 
  alt={project.title} 
  width={600} 
  height={400}
  priority={index < 3}
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
                      >
                        <Link href={project.link} target="_blank">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 md:p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Play className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.button>
                        </Link>

                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 md:p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Info className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Year Badge */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 px-2 md:px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-bold">
                    {project.year}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <project.icon className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    <h3 className="text-base md:text-lg font-bold line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-white/60 line-clamp-2 mb-3">
                    {project.desc}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tech.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 md:py-1 bg-white/5 border border-white/10 rounded-md text-[10px] md:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="px-2 py-0.5 md:py-1 bg-white/5 border border-white/10 rounded-md text-[10px] md:text-xs">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-5xl w-full bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Close modal"
              >
                <span className="text-xl md:text-2xl">×</span>
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left: Image - OBJECT-COVER APPLIED */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: Content */}
                <div className="p-6 md:p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs md:text-sm text-white/60">{selectedProject.category}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-xs md:text-sm text-white/60">{selectedProject.year}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">
                    {selectedProject.title}
                  </h2>

                  <p className="text-lg md:text-xl text-white/80 mb-4 md:mb-6">
                    {selectedProject.tagline}
                  </p>

                  <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 md:mb-8">
                    {selectedProject.desc}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6 md:mb-8">
                    <p className="text-xs md:text-sm text-white/40 mb-3 uppercase tracking-wider">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-xs md:text-sm font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <Link href={selectedProject.link} target="_blank" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 md:py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      View Project
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
