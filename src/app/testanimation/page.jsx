"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const TestPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll-driven animations
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#0f0a1f", "#7c3aed", "#ec4899"]
  );
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Basic variants
  const variants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    variant1: {
      x: 400,
      y: 300,
      opacity: 0.5,
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    },
    variant2: {
      x: 100,
      y: -300,
      rotate: 90,
      scale: 1.5,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      boxShadow: "0 0 50px rgba(124, 58, 237, 0.8)",
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Particle explosion on click
  const createParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065]">
      
      {/* Section 1: Basic Animations */}
      <section className="h-screen flex flex-col items-center justify-center gap-8 p-8">
        <h1 className="text-4xl font-black text-white mb-8">Framer Motion Test Animations</h1>
        
        {/* Test 1: Basic Movement */}
        <div className="w-full flex gap-4 justify-center">
          <motion.div
            className="w-32 h-32 bg-red-400 rounded-xl flex items-center justify-center text-white font-bold"
            variants={variants}
            initial="initial"
            animate="variant1"
          >
            Variant 1
          </motion.div>

          <motion.div
            className="w-32 h-32 bg-blue-400 rounded-xl flex items-center justify-center text-white font-bold"
            variants={variants}
            initial="initial"
            animate="variant2"
          >
            Variant 2
          </motion.div>
        </div>

        {/* Test 2: Hover Effects */}
        <motion.div
          className="w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
          variants={variants}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hover Me
        </motion.div>

        {/* Test 3: Particle Explosion */}
        <div className="relative">
          <motion.button
            onClick={createParticles}
            className="px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] rounded-xl text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Click for Particles
          </motion.button>

          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-4 h-4 bg-yellow-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ 
                x: p.x, 
                y: p.y, 
                opacity: 0, 
                scale: 0 
              }}
              transition={{ duration: 1.5 }}
              style={{ left: "50%", top: "50%" }}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Scroll-Driven Animations */}
      <section className="h-screen sticky top-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-64 h-64 rounded-3xl flex items-center justify-center text-white font-bold text-2xl mb-8"
            style={{ 
              backgroundColor: bgColor,
              scale: scale,
              rotate: rotate
            }}
          >
            Scroll Down
          </motion.div>

          <p className="text-white/60 text-lg">
            Progress: {Math.round(scrollYProgress.get() * 100)}%
          </p>
        </div>
      </section>

      {/* Section 3: Advanced Animations */}
      <section className="h-screen flex items-center justify-center gap-8">
        
        {/* Rotating Planet */}
        <motion.div
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-6xl"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌍
          
          {/* Orbit Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            style={{ width: "180%", height: "180%", left: "-40%", top: "-40%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2" />
          </motion.div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-2xl opacity-50 -z-10" />
        </motion.div>

        {/* Typewriter Effect */}
        <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md">
          <motion.p
            className="text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {"This is a typewriter effect".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.p>
        </div>

        {/* Stagger Children */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-40 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Item {i}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 4: Complex Animations */}
      <section className="h-screen flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          
          {/* Path Drawing */}
          <svg width="200" height="200" viewBox="0 0 200 200">
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              stroke="#7c3aed"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Morphing Shape */}
          <motion.div
            className="w-40 h-40 bg-gradient-to-br from-pink-500 to-rose-500"
            animate={{
              borderRadius: ["20%", "50%", "20%"],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Wave Animation */}
          <div className="flex gap-2 items-end h-40">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg"
                animate={{
                  height: ["20%", "100%", "20%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Bounce */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
            animate={{
              y: [0, -100, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default TestPage;
