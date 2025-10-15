"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  ShoppingCart, 
  Smartphone, 
  Code2,
  Atom,
  Download,
  Eye,
  Sparkles,
  Rocket,
  Target,
  Coffee,
  Award,
  Heart,
  Star,
  TrendingUp,
  Briefcase,
  Terminal,
  Globe,
  Calendar,
  CheckCircle2,
  Zap,
  Database,
  Layers,
  Lightbulb ,
  UserCircle, 
   ExternalLink, 
  FileDown ,
  Settings, 
  Wrench
    // ← ADD THIS
} from "lucide-react";
// 🧹 Optional Dev Console Cleanup
if (process.env.NODE_ENV === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const msg = args.join(" ");
    if (
      msg.includes("Console Ninja") ||
      msg.includes("React DevTools") ||
      msg.includes("value.onChange(callback) is deprecated") ||
      msg.includes("defined a target options but the provided ref is not yet hydrated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

// Live Coding Terminal Component
const LiveCodingTerminal = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const codeLines = [
    "const developer = 'Shubham Tiwari';",
    "const skills = ['JavaScript', 'React', 'Next.js'];",
    "const passion = 'Building amazing web experiences';",
    "console.log('Let\\'s create something awesome! 🚀');"
  ];

  useEffect(() => {
    const currentLine = codeLines[currentLineIndex];
    const typingSpeed = isDeleting ? 30 : 100;
    const lineDelay = isDeleting ? 500 : 2000;

    if (!isDeleting && currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentCharIndex === currentLine.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, lineDelay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex === 0) {
      setIsDeleting(false);
      setCurrentLineIndex((currentLineIndex + 1) % codeLines.length);
    }
  }, [currentCharIndex, currentLineIndex, isDeleting]);


  return (
	
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm ml-2">~/portfolio/code.js</span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm">
        <div className="flex items-start gap-2">
          <span className="text-gray-500 select-none">1</span>
          <div className="flex-1">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-blue-400">skills</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-yellow-400">[</span>
          </div>
        </div>
        <div className="flex items-start gap-2 ml-6">
          <span className="text-gray-500 select-none">2</span>
          <span className="text-green-400">'JavaScript'</span>
          <span className="text-white">,</span>
        </div>
        <div className="flex items-start gap-2 ml-6">
          <span className="text-gray-500 select-none">3</span>
          <span className="text-green-400">'React'</span>
          <span className="text-white">,</span>
        </div>
        <div className="flex items-start gap-2 ml-6">
          <span className="text-gray-500 select-none">4</span>
          <span className="text-green-400">'Next.js'</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-500 select-none">5</span>
          <span className="text-yellow-400">];</span>
        </div>
        <div className="flex items-start gap-2 mt-4">
          <span className="text-gray-500 select-none">6</span>
          <div className="flex-1">
            <span className="text-gray-400">// </span>
            <span className="text-gray-500">{displayedCode}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-purple-400 ml-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Interactive Timeline Component
const InteractiveTimeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [pathProgress, setPathProgress] = useState(0);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({target: timelineRef,
    offset: ["start end", "end start"], layoutEffect: false});

  useEffect(() => {
    return scrollYProgress.on("change", latest => {
      setPathProgress(latest);
    });
  }, [scrollYProgress]);

  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description: "Wrote my first line of code. Started with HTML & CSS, discovering the magic of web development.",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2023",
      title: "JavaScript Journey",
      description: "Mastered JavaScript fundamentals and started building interactive projects. Fell in love with React.",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2024",
      title: "Web Developer",
      description: "Built 30+ projects including e-commerce platforms, dashboards, and business solutions.",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2025",
      title: "Ready for Impact",
      description: "Seeking opportunities to create innovative solutions and contribute to meaningful projects.",
      icon: <Target className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div ref={timelineRef} className="relative py-12">
      {/* Animated Path Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500"
          style={{
            scaleY: pathProgress,
            transformOrigin: "top"
          }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-20"
          >
            {/* Timeline Node */}
            <motion.div
              onClick={() => setSelectedMilestone(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute left-4 top-4 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                selectedMilestone === index
                  ? `bg-gradient-to-br ${milestone.color}`
                  : 'bg-gray-800 border-2 border-gray-700'
              }`}
            >
              <AnimatePresence mode="wait">
                {selectedMilestone === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-white"
                  >
                    {milestone.icon}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Milestone Card */}
            <motion.div
              onClick={() => setSelectedMilestone(index)}
              whileHover={{ y: -5 }}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all ${
                selectedMilestone === index
                  ? 'bg-gray-900 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                  : 'bg-gray-900/50 border border-gray-800'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                </div>
                
                <AnimatePresence mode="wait">
                  {selectedMilestone === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-400 text-sm leading-relaxed"
                    >
                      {milestone.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const Homepage = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({target: heroRef,
    offset: ["start start", "end start"],
    layoutEffect: false});

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    const words = ["Ideas", "Code", "Dreams", "Solutions", "Innovation"];
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(wordInterval);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Handle scroll changes if needed
    });

    return () => unsubscribe();
  }, [scrollYProgress, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          />
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  const words = ["Ideas", "Code", "Dreams", "Solutions", "Innovation"];

  const storyStages = [
    {
      icon: <Coffee className="w-6 h-6" />,
      text: "Started with curiosity",
     
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      text: "Built 30+ projects",
      
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      text: "Deployed real solutions",
     
    },
    
  ];

  

  const skills = [
    { name: "JavaScript", level: 90, years: "3+ years", icon: <Zap />, color: "from-yellow-400 to-orange-500" },
    { name: "React.js", level: 85, years: "2+ years", icon: <Atom />, color: "from-blue-400 to-cyan-500" },
    { name: "Next.js", level: 80, years: "2+ years", icon: <Layers />, color: "from-gray-700 to-gray-900" },
    { name: "Node.js", level: 75, years: "2+ years", icon: <Terminal />, color: "from-green-400 to-emerald-500" },
    { name: "TypeScript", level: 70, years: "1+ year", icon: <Code2 />, color: "from-blue-600 to-blue-800" },
    { name: "MongoDB", level: 75, years: "2+ years", icon: <Database />, color: "from-green-600 to-green-800" }
  ];

  const experience = [
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Web Developer",
      company: "Freelance",
      period: "2023 - Present",
      location: "Remote",
      description: "Building modern web applications with React, Next.js, and cloud technologies for various clients.",
      achievements: [
        "Delivered 15+ successful client projects",
        "Maintained 100% client satisfaction rate",
        "Specialized in e-commerce and business solutions"
      ]
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Self-Taught Developer",
      company: "Personal Projects",
      period: "2022 - Present",
      location: "India",
      description: "Developed 30+ projects including e-commerce platforms, educational tools, and business solutions.",
      achievements: [
        "Mastered MERN stack development",
        "Built and deployed production applications",
        "Active open-source contributor"
      ]
    }
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Built web applications with modern frameworks and best practices",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Mobile-first, cross-browser compatible designs that work everywhere",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Solutions",
      description: "Custom online stores with payment integration and inventory management",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "API Development",
      description: "RESTful APIs and backend services with Node.js and databases",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Copy Success Notification */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <motion.div
        ref={heroRef}
        style={{ opacity, scale, y }}
        className="relative min-h-screen  overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/20 to-black"
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 -z-10">
          {[
            { x: 25, y: 0 },
            { x: 75, y: 100 },
            { x: 50, y: 50 }
          ].map((blob, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
              style={{ left: `${blob.x}%`, top: `${blob.y}%` }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Interactive particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: (mousePosition.x / window.innerWidth) * 50 - 25,
                y: (mousePosition.y / window.innerHeight) * 50 - 25,
                opacity: [0, 1, 0],
              }}
              transition={{
                x: { duration: 2 },
                y: { duration: 2 },
                opacity: { duration: 3, repeat: Infinity, delay: Math.random() * 2 },
              }}
            />
          ))}
          
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="min-h-screen flex flex-col lg:flex-row px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 py-8 sm:py-12 lg:py-0">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 md:gap-8 items-center lg:items-start justify-center text-center lg:text-left order-2 lg:order-1 pt-8 lg:pt-0">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-400/50 bg-green-900/30 cursor-pointer group"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative flex h-2 w-2"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </motion.span>
              <span className="text-xs sm:text-sm text-green-200 font-medium whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span className="group-hover:text-green-100 transition-colors">
                  Open to Work & New Opportunities
                </span>
              </span>
            </motion.div>

            

            {/* Story Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-2xl"
            >
              <div className="flex gap-2 flex-wrap justify-center lg:justify-start mb-4">
                {storyStages.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      activeTab === index 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                        : 'bg-gray-900'
                    } border ${
                      activeTab === index ? 'border-purple-400/60' : 'border-purple-400/30'
                    } relative overflow-hidden cursor-pointer transition-all`}
                    onMouseEnter={() => setHoveredIcon(index)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      animate={{ x: hoveredIcon === index || activeTab === index ? '100%' : '-100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.span
                      className="text-white relative z-10"
                      animate={{ 
                        rotate: hoveredIcon === index ? 360 : 0,
                        scale: activeTab === index ? 1.2 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {stage.icon}
                    </motion.span>
                    <span className="text-xs text-white whitespace-nowrap relative z-10 font-medium">
                      {stage.text}
                    </span>
                  </motion.div>
                ))}
              </div>

             
            </motion.div>

            {/* Main Heading with Animated Words */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full"
            >
              {/* Animated Icon Carousel - Unique Hero Intro */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex items-center gap-3 justify-center lg:justify-start mb-4"
>
  {/* Animated Icons */}
  <div className="flex items-center gap-2">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {currentWord === 0 && (
          <Lightbulb className="w-6 h-6 text-yellow-400" />
        )}
        {currentWord === 1 && (
          <Code2 className="w-6 h-6 text-blue-400" />
        )}
        {currentWord === 2 && (
          <Sparkles className="w-6 h-6 text-purple-400" />
        )}
        {currentWord === 3 && (
          <Zap className="w-6 h-6 text-orange-400" />
        )}
        {currentWord === 4 && (
          <Rocket className="w-6 h-6 text-pink-400" />
        )}
      </motion.div>
    </AnimatePresence>

    {/* Animated Dots */}
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-1.5 h-1.5 bg-purple-400 rounded-full"
        />
      ))}
    </div>
  </div>

  {/* Glowing Text */}
  <motion.span
    animate={{
      textShadow: [
  "0 0 4px rgba(88, 28, 135, 0.3)",
  "0 0 8px rgba(74, 0, 115, 0.4)",
  "0 0 4px rgba(88, 28, 135, 0.3)",
],


    }}
    transition={{ duration: 2, repeat: Infinity }}
    className="text-xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 "
  >
    Transforming
  </motion.span>

  {/* Orbiting Icons */}
  <div className="relative w-8 h-8">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <Atom className="w-4 h-4 text-cyan-400 absolute top-0 left-1/2 -translate-x-1/2" />
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <Sparkles className="w-3 h-3 text-purple-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
    </motion.div>
  </div>
</motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
                <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 mb-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -50, rotateX: 90 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                      style={{
                        backgroundSize: "200% 200%",
                        animation: "gradient 3s ease infinite"
                      }}
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="block text-white">Into Reality</span>
              </h1>
             <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
  className="flex items-center gap-3 flex-wrap justify-center lg:justify-start mt-4"
>
  {/* Orbiting Stars */}
  <div className="relative w-10 h-10">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 absolute top-0 left-1/2 -translate-x-1/2" />
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <Star className="w-4 h-4 text-purple-400 fill-purple-400 absolute bottom-0 left-1/2 -translate-x-1/2" />
    </motion.div>
  </div>
  
  {/* Text - same as above */}
  <div className="flex items-baseline gap-2 flex-wrap">
    <span className="text-xl sm:text-2xl text-gray-400">Hi, I'm</span>
    
    <motion.span
      className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 relative"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      Shubham Tiwari
      
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </motion.span>
    
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Sparkles className="w-5 h-5 text-yellow-400" />
    </motion.div>
  </div>
</motion.div>

            </motion.div>

            {/* Role */}
           {/* Animated Role with Typing Effect */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.8 }}
  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold"
>
  <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
    {/* Code Brackets */}
    <span className="text-purple-400">&lt;</span>
    
    {/* Animated Role Text */}
    <div className="flex items-center gap-2">
      <Code2 className="w-6 h-6 text-purple-400" />
      <motion.span
        className="text-gray-300"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Web Developer
      </motion.span>
    </div>
    
    <span className="text-purple-400">/&gt;</span>
    
    {/* Badge */}
    <motion.span
      whileHover={{ scale: 1.1 }}
      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 cursor-pointer"
    >
      & Problem Solver
    </motion.span>
  </div>
</motion.div>


            {/* Description */}
           {/* Enhanced Description with Interactive Cards */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1 }}
  className="space-y-4 px-4 lg:px-0 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
>
  {/* Main Description Card */}
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 group"
  >
    {/* Animated Border */}
    <motion.div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: 'linear-gradient(90deg, )',
        filter: 'blur(10px)'
      }}
    />
    
    <div className="relative z-10">
      <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
        <span className="text-purple-400 font-semibold">My story began with curiosity</span>
        {" "}— every line of code I write solves a real problem. From building e-commerce platforms that drive sales to educational tools that empower learning.
      </p>
    </div>
  </motion.div>

  
</motion.div>


           {/* Enhanced CTA Buttons with Tooltips */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 1.4 }}
  className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 lg:px-0"
>
  {/* Primary CTA */}
  <Link href="/portfolio" className="w-full sm:w-auto">
    <motion.button
     
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-xl font-semibold bg-gray-900 hover:bg-purple-900/30 transition-all text-sm sm:text-base flex items-center justify-center gap-3 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
        initial={{ x: "-100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-3 text-sm sm:text-base">
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Rocket className="w-5 h-5" />
        </motion.div>
        Explore My Journey
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.button>
  </Link>

  {/* Secondary CTA with Download */}
  <div className="relative group w-full sm:w-auto">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-xl font-semibold bg-gray-900 hover:bg-purple-900/30 transition-all text-sm sm:text-base flex items-center justify-center gap-3 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <Eye className="w-5 h-5 relative z-10" />
      <span className="relative z-10">View Resume</span>
      <Download className="w-4 h-4 relative z-10" />
    </motion.button>
    
   {/* Compact Dropdown Menu */}
<motion.div
  initial={{ opacity: 0, y: -10, scale: 0.95 }}
  whileHover={{ opacity: 1, y: 0, scale: 1 }}
  className="absolute top-full mt-2 left-0 right-0 bg-gray-900 border border-purple-500/30 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all z-10 shadow-2xl"
>
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 hover:bg-purple-500/20 transition-colors text-xs text-gray-300 group/item"
  >
    <Eye className="w-3 h-3 group-hover/item:scale-110 transition-transform" />
    <span>View</span>
  </a>
  <a
    href="/resume.pdf"
    download="Shubham_Tiwari_Resume.pdf"
    className="flex items-center gap-2 px-3 py-2 hover:bg-purple-500/20 transition-colors text-xs text-gray-300 border-t border-gray-800 group/item"
  >
    <Download className="w-3 h-3 group-hover/item:scale-110 transition-transform" />
    <span>Download</span>
  </a>
</motion.div>

  </div>

  
</motion.div>


            
          </div>

          {/* Image Container */}
          <div className="flex-1 relative flex items-center justify-center order-1 lg:order-2 py-8 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex items-center justify-center"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute inset-0 rounded-full border-2 border-purple-500/${30 - i * 5}`}
                  style={{
                    width: `${110 + i * 15}%`,
                    height: `${110 + i * 15}%`,
                    left: `-${5 + i * 7.5}%`,
                    top: `-${5 + i * 7.5}%`,
                  }}
                />
              ))}
              
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl"
              />

              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                whileTap={{ scale: 0.98 }}
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/50 cursor-pointer group"
              >
                <Image
                  src="/main.png"
                  alt="Shubham Tiwari"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
                
                
              </motion.div>

              {[
                { Icon: Atom, pos: "-top-2 -right-2 sm:-top-4 sm:-right-4", text: "React", delay: 0 },
                { Icon: ShoppingCart, pos: "-bottom-2 -left-2 sm:-bottom-4 sm:-left-4", text: "E-commerce", delay: 0.2 },
                { Icon: Smartphone, pos: "top-1/2 -left-4 sm:-left-6 md:-left-8", text: "Mobile", delay: 0.4 },
                { Icon: Code2, pos: "top-1/2 -right-4 sm:-right-6 md:-right-8", text: "Code", delay: 0.6 }
              ].map(({ Icon, pos, text, delay }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -15, 0],
                  }}
                  transition={{
                    opacity: { delay },
                    scale: { delay },
                    y: { duration: 3 + index, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: 1.3, rotate: 720, transition: { duration: 0.6 } }}
                  whileTap={{ scale: 0.9 }}
                  className={`absolute ${pos} w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group cursor-pointer`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform" />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    {text}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
	  {/* INTERACTIVE TIMELINE SECTION */}
<section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-b from-black via-purple-950/5 to-gray-950 relative">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
  
  <div className="max-w-6xl mx-auto relative z-10">
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full mb-4"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-purple-300">My Journey</span>
      </motion.div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Timeline</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Click each milestone to discover my coding journey
      </p>
    </motion.div>

    <InteractiveTimeline />
  </div>
</section>

{/* LIVE CODING TERMINAL SECTION */}
<section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-b from-gray-950 via-black to-gray-900 relative">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10 pointer-events-none" />
  
  <div className="max-w-4xl mx-auto relative z-10">
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full mb-4"
      >
        <Terminal className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-blue-300">Live Code</span>
      </motion.div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Watch Me <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Code</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Real-time coding simulation in action
      </p>
    </motion.div>

    <LiveCodingTerminal />
  </div>
</section>


      {/* SKILLS SECTION */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-b from-black via-gray-950 to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-transparent to-pink-950/10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Technical Arsenal</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Proficient in modern web technologies with hands-on experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-20 rounded-2xl blur group-hover:blur-xl transition-all`} />
                
                <div className="relative bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-lg p-6 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                      <p className="text-gray-500 text-sm">{skill.years}</p>
                    </div>
                    <span className="ml-auto text-purple-400 font-semibold">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-b from-gray-900 via-purple-950/5 to-gray-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-900/30 border border-pink-500/30 rounded-full mb-4"
            >
              <Briefcase className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300">Services Offered</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What I Offer
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive development services to bring your ideas to life
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, rotateY: 5 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} p-[1px] rounded-2xl`}>
                  <div className="h-full bg-gray-900 rounded-2xl" />
                </div>

                <div className="relative h-full p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-b from-gray-950 via-pink-950/5 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-950/10 via-transparent to-purple-950/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full mb-4"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Career Path</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              My Journey
            </h2>
            <p className="text-gray-400">
              Building experience through real-world projects
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-lg p-6 transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                    <div className="mt-1">{exp.location}</div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-48 bg-gradient-to-br from-black via-purple-950/20 to-pink-950/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gray-900 border border-purple-500/20 rounded-2xl p-12 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities. 
            Let's discuss how I can help bring your project to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-purple-500 text-purple-400 hover:bg-purple-900/30 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </motion.button>
            </Link>
            
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-purple-500 text-purple-400 hover:bg-purple-900/30 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Resume
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Homepage;
