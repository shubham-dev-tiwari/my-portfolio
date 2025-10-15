"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Send, Rocket, Check, AlertCircle, Zap, Star, Heart, Code, Briefcase, Eye, X, ChevronRight, Mail, Copy, Github, Linkedin, Twitter } from "lucide-react";

export default function ContactPage() {
  const formRef = useRef();
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [particles, setParticles] = useState([]);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const milestones = [
    {
      title: "The Genesis",
      year: "2019",
      emoji: <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/bot.png" alt="bot"/>,
      color: "from-green-400 to-emerald-600",
      description: "Where It All Began",
      story: "In the vast darkness of uncertainty, a single seed of curiosity was planted. The first 'Hello World' wasn't just code—it was a declaration of possibility. Late nights debugging, countless Stack Overflow tabs, and the pure joy of seeing 'It works!' for the first time.",
      achievements: [
        "First HTML/CSS website",
        "Learned JavaScript fundamentals",
        "Built first interactive calculator",
        "Discovered the power of problem-solving"
      ],
      tech: ["HTML", "CSS", "JavaScript"],
      icon: Code
    },
    {
      title: "The Transformation",
      year: "2021",
      emoji: <img width="100" height="100" src="https://img.icons8.com/3d-stickle/100/happy-retro-robot.png" alt="happy-retro-robot"/>,
      color: "from-blue-400 to-cyan-600",
      description: "React & Modern Web",
      story: "The universe expanded. React opened doors to component-based thinking, state management became poetry, and hooks transformed complexity into elegance. Each project was a new galaxy to explore, each bug a lesson in disguise.",
      achievements: [
        "Mastered React ecosystem",
        "Built 10+ production apps",
        "Contributed to open source",
        "Learned Next.js & TypeScript"
      ],
      tech: ["React", "Next.js", "TypeScript", "Tailwind"],
      icon: Zap
    },
    {
      title: "The Launch",
      year: "2023",
      emoji: <img width="100" height="100" src="https://img.icons8.com/3d-stickle/100/ai-keycap-assistant.png" alt="ai-keycap-assistant"/>,
      color: "from-purple-400 to-pink-600",
      description: "Professional Orbit",
      story: "From learning to earning. The transition from student to professional, from building for myself to crafting solutions for clients worldwide. Every project became a mission, every deadline a launch countdown.",
      achievements: [
        "30+ client projects delivered",
        "Built scalable SaaS platforms",
        "Mentored junior developers",
        "Established remote work mastery"
      ],
      tech: ["Full Stack", "Node.js", "MongoDB", "AWS"],
      icon: Briefcase
    },
    {
      title: "The Vision",
      year: "2025",
      emoji: <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/music-robot.png" alt="music-robot"/>,
      color: "from-pink-400 to-rose-600",
      description: "Beyond The Horizon",
      story: "The journey never ends—it only evolves. AI integration, Web3 exploration, and pushing the boundaries of what's possible. The future isn't just about code; it's about creating experiences that matter.",
      achievements: [
        "AI-powered applications",
        "3D web experiences",
        "Global collaborations",
        "Continuous innovation"
      ],
      tech: ["AI/ML", "Three.js", "Web3", "Innovation"],
      icon: Eye
    }
  ];

  // Typewriter effect
  useEffect(() => {
    if (step === 0) {
      const text = "🚀 Capsule docked. I'm Shubham's assistant. Ready to send your message into the cosmos?";
      let i = 0;
      const timer = setInterval(() => {
        if (i <= text.length) {
          setTypingText(text.slice(0, i));
          i++;
        } else clearInterval(timer);
      }, 25);
      return () => clearInterval(timer);
    }
  }, [step]);

  // Create particle explosion
  const createParticles = (index) => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: `${index}-${i}-${Date.now()}`,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      scale: Math.random() * 1.5 + 0.5
    }));
    setParticles([...particles, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1500);
  };

  // Form progress
  const calculateProgress = () => {
    const name = formRef.current?.user_name?.value || "";
    const email = formRef.current?.user_email?.value || "";
    const message = formRef.current?.user_message?.value || "";
    const total = (name.length > 0 ? 33 : 0) + (email.length > 0 ? 33 : 0) + (message.length > 0 ? 34 : 0);
    setFormProgress(total);
  };

  // Copy email
  const copyEmail = () => {
    navigator.clipboard.writeText("shubhamtiwaridevlog@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setRocketLaunched(true);

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_PUBLIC_KEY
    ).then(
      () => {
        setLoading(false);
        setSuccess(true);
        formRef.current.reset();
        setTimeout(() => {
          setSuccess(false);
          setStep(0);
          setChoice("");
          setRocketLaunched(false);
          setFormProgress(0);
        }, 4000);
      },
      () => {
        setLoading(false);
        setError(true);
        setRocketLaunched(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white relative overflow-hidden">
      
      {/* Enhanced Starfield */}
      <div className="fixed inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3,
              height: Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(124, 58, 237, 1) 0%, rgba(236, 72, 153, 0) 70%)`,
              left: "50%",
              top: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: particle.scale }}
            animate={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 0, 
              scale: 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Rocket Launch */}
      <AnimatePresence>
        {rocketLaunched && (
          <motion.div
            className="fixed left-1/2 top-1/2 text-8xl z-50"
            initial={{ x: "-50%", y: "50%", rotate: -45 }}
            animate={{ 
              x: "-50%", 
              y: "-250vh", 
              rotate: -45,
              scale: [1, 2, 3]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeIn" }}
          >
            🚀
            <motion.div
              className="absolute -bottom-20 left-1/2 -translate-x-1/2"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              🔥
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Modal */}
      <AnimatePresence>
        {showStoryModal && selectedPlanet !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStoryModal(false)}
          >
            <motion.div
              className="max-w-3xl w-full bg-gradient-to-br from-[#1e1b4b]/95 to-[#2e1065]/95 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8 md:p-12 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{milestones[selectedPlanet].emoji}</div>
                <h2 className={`text-5xl font-black mb-2 bg-gradient-to-r ${milestones[selectedPlanet].color} bg-clip-text text-transparent`}>
                  {milestones[selectedPlanet].title}
                </h2>
                <p className="text-2xl text-white/80">{milestones[selectedPlanet].description}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold text-purple-300">{milestones[selectedPlanet].year}</span>
                  <Star className="w-5 h-5 text-yellow-400" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    The Journey
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {milestones[selectedPlanet].story}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Star className="w-6 h-6 text-purple-400" />
                    Key Achievements
                  </h3>
                  <div className="grid gap-3">
                    {milestones[selectedPlanet].achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      >
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/90">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Code className="w-6 h-6 text-cyan-400" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {milestones[selectedPlanet].tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-full text-sm font-semibold"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                onClick={() => setShowStoryModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                Close Story
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        
        {/* Journey Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
             
              <h1 className="text-6xl md:text-8xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Journey Through Space 
                   <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block text-6xl mb-6"
              >
               <img width="64" height="64" src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-astronaut-space-wanicon-flat-wanicon.png" alt="external-astronaut-space-wanicon-flat-wanicon"/>
              </motion.div>
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Click on each planet to explore the story behind every milestone
              </p>
            </motion.div>

            <div className="space-y-40">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredPlanet(i);
                    createParticles(i);
                  }}
                  onMouseLeave={() => setHoveredPlanet(null)}
                >
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    
                    {/* Planet */}
                    <motion.div
                      className="flex-shrink-0 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedPlanet(i);
                        setShowStoryModal(true);
                      }}
                      animate={hoveredPlanet === i ? { 
                        rotate: [0, 10, -10, 0],
                        y: [-10, 10, -10]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative">
                        <motion.div
                          className={`w-40 h-40 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-7xl shadow-2xl border-4 border-white/20 relative overflow-hidden`}
                          animate={hoveredPlanet === i ? {
                            boxShadow: [
                              "0 0 30px rgba(124, 58, 237, 0.6)",
                              "0 0 80px rgba(236, 72, 153, 1)",
                              "0 0 30px rgba(124, 58, 237, 0.6)",
                            ]
                          } : {}}
                          transition={{ duration: 1, repeat: hoveredPlanet === i ? Infinity : 0 }}
                        >
                          {m.emoji}
                          
                          <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
                          </motion.div>
                        </motion.div>

                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.color} blur-3xl opacity-50 -z-10`} />
                        
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/10"
                          style={{ width: "180%", height: "180%", left: "-40%", top: "-40%" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </motion.div>

                    {/* Story Card */}
                    <motion.div
                      className="flex-1 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer"
                      whileHover={{ scale: 1.02, x: 10 }}
                      onClick={() => {
                        setSelectedPlanet(i);
                        setShowStoryModal(true);
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <m.icon className="w-8 h-8 text-purple-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className={`text-4xl font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent mb-2`}>
                            {m.year}
                          </p>
                          <h3 className="text-3xl font-bold mb-2">{m.title}</h3>
                          <p className="text-lg text-white/70 mb-4">{m.description}</p>
                          <p className="text-white/60 line-clamp-2 mb-4">{m.story}</p>
                          
                          <div className="flex items-center gap-2 text-purple-400 font-semibold">
                            <Eye className="w-5 h-5" />
                            <span>Click to explore full story</span>
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Connection Line */}
                  {i < milestones.length - 1 && (
                    <motion.div
                      className="absolute left-20 md:left-20 top-full h-40 w-1 bg-gradient-to-b from-purple-400/50 via-pink-400/30 to-transparent mx-auto"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  )}

                  {/* Hover Info */}
                  <AnimatePresence>
                    {hoveredPlanet === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-0 left-20 md:left-20 -translate-y-full mt-4 px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-2xl text-sm font-semibold shadow-xl whitespace-nowrap"
                      >
                        <Star className="w-4 h-4 inline-block mr-2" />
                        Click for detailed story! ✨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-32"
            >
              <p className="text-white/50 mb-4">Continue to Message Capsule</p>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Capsule Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
            className="max-w-2xl w-full"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-[3rem] blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/10 rounded-[3rem] p-8 md:p-12">
                
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="inline-block text-7xl mb-4"
                  >
                   <img width="100" height="100" src="https://img.icons8.com/3d-stickle/100/retro-robot-jumping.png" alt="retro-robot-jumping"/>
                  </motion.div>
                  <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Message Capsule
                  </h2>
                  <p className="text-white/60 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Ready to Launch
                  </p>
                </div>

                {step === 1 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-white/60">Capsule Fuel</span>
                      <span className="text-purple-400 font-bold">{formProgress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#7c3aed] to-[#4c1d95]"
                        animate={{ width: `${formProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {step === 0 && (
                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-lg">{typingText}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>|</motion.span></p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { label: "Collaborate", emoji: <img width="64" height="64" src="https://img.icons8.com/arcade/64/onboarding.png" alt="onboarding"/>, icon: Zap },
                        { label: "Say Hi", emoji: <img width="100" height="100" src="https://img.icons8.com/3d-stickle/100/happy-robot-assistant-waving-hello.png" alt="happy-robot-assistant-waving-hello"/>, icon: Heart },
                        { label: "Need Dev", emoji: <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/robot-humanoid.png" alt="robot-humanoid"/>, icon: Star }
                      ].map((opt, i) => (
                        <motion.button
                          key={i}
                          onClick={() => { setChoice(opt.label); setStep(1); }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] rounded-2xl font-bold hover:from-[#6d28d9] hover:to-[#5b21b6] transition-all"
                        >
                          <div className="text-4xl mb-2">{opt.emoji}</div>
                          <div className="flex items-center justify-center gap-2">
                            <opt.icon className="w-4 h-4" />
                            {opt.label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="px-6 py-3 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-3xl rounded-tr-sm">
                        <p className="font-semibold">{choice}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] flex items-center justify-center flex-shrink-0 text-xl">
                       <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/chatbot.png" alt="chatbot"/>
                        </div>
                        <div className="flex-1">
                          <p className="mb-4 text-white/80">Perfect! Fill in your details...</p>

                          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                            <input
                              type="text"
                              name="user_name"
                              required
                              placeholder="Your name"
                              onChange={calculateProgress}
                              className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#7c3aed] outline-none text-white placeholder-white/40"
                            />
                            <input
                              type="email"
                              name="user_email"
                              required
                              placeholder="Your email"
                              onChange={calculateProgress}
                              className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#7c3aed] outline-none text-white placeholder-white/40"
                            />
                            <textarea
                              name="user_message"
                              required
                              rows={4}
                              placeholder="Your message..."
                              onChange={calculateProgress}
                              className="w-full px-4 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#7c3aed] outline-none text-white placeholder-white/40 resize-none"
                            />
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:from-[#6d28d9] hover:to-[#5b21b6] transition-all"
                            >
                              {loading ? (
                                <>
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                    <Rocket className="w-6 h-6" />
                                  </motion.div>
                                  Launching...
                                </>
                              ) : (
                                <>
                                  <Send className="w-6 h-6" />
                                  Launch Message
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-2xl text-center"
                        >
                          <Check className="w-16 h-16 text-green-400 mx-auto mb-3" />
                          <p className="text-3xl font-black text-green-400 mb-2">Message Launched! 🌌</p>
                          <p className="text-green-300/80">I'll respond soon!</p>
                        </motion.div>
                      )}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl text-center"
                        >
                          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-3" />
                          <p className="text-red-400 font-bold">Launch failed. Try again!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Email & Social Section */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-center text-white/60 text-sm mb-4">Or reach out directly</p>
                  
                  <motion.button
                    onClick={copyEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mb-4 flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <span className="font-mono text-sm">shubhamtiwaridevlog@gmail.com</span>
                    </div>
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                    )}
                  </motion.button>

                  <div className="flex gap-3">
                    {[
                      { Icon: Github, href: "https://github.com/shubham-dev-tiwari", label: "GitHub" },
                      { Icon: Linkedin, href: "https://linkedin.com/in/shubham-dev-tiwari", label: "LinkedIn" },
                      { Icon: Twitter, href: "https://twitter.com/shubhamtiwari", label: "Twitter" }
                    ].map(({ Icon, href, label }, idx) => (
                      <motion.a
                        key={idx}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                        title={label}
                      >
                        <Icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
