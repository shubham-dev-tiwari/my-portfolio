"use client";

import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { 
  Briefcase, Code2, Award, Calendar, MapPin, Sparkles, Zap, Rocket,
  ChevronDown, Coffee, Folder, Terminal, Bug, Package, GitBranch, 
  Lightbulb, Gamepad2, Trophy, Target, Flame, Heart, Star, 
  CheckCircle, XCircle, AlertCircle, TrendingUp, Activity, 
  BarChart, Send, User, Keyboard, Type, HelpCircle, Brain,
  Cpu, Database, Shield, Palette,
  Server,
  Laugh,
  LaughIcon,
  Trash2,
  Clock,
  BarChart3,
  Hand
} from "lucide-react";

// Constants
const DEVELOPER_PUNS = [
  { icon: Coffee, text: "My code never has bugs, just features! 🎁", color: "from-green-500 to-emerald-500" },
  { icon: Bug, text: "99 bugs in the code... 99 bugs... 🐛", color: "from-red-500 to-pink-500" },
  { icon: Terminal, text: "There's no place like 127.0.0.1 🏠", color: "from-blue-500 to-cyan-500" },
  { icon: Code2, text: "I code therefore I am... caffeinated ☕", color: "from-purple-500 to-pink-500" },
  { icon: GitBranch, text: "git push --force (just kidding!) 😅", color: "from-green-500 to-emerald-500" },
];

const STATS = [
  { icon: Code2, number: "20+", label: "Projects", sublabel: "// Not counting TODO apps 😅", color: "from-[#6d28d9] to-[#4c1d95]" },
  { icon: Coffee, number: "∞", label: "Coffee Cups", sublabel: "// Fuel for coding 🚀", color: "from-[#7c3aed] to-[#312e81]" },
  { icon: Bug, number: "404", label: "Bugs Fixed", sublabel: "// Error not found 😎", color: "from-[#5b21b6] to-[#3730a3]" },
  { icon: GitBranch, number: "5", label: "Internships", sublabel: "// git commit -m 'success'", color: "from-[#4c1d95] to-[#1e1b4b]" }
];

const SKILL_CATEGORIES = {
  "Frontend Magic 🎨": {
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"],
    pun: "Making pixels dance since 2023"
  },
  "Backend Sorcery ⚡": {
    skills: ["Node.js", "Express.js", "GO", "gorilla/mux", "MongoDB"],
    pun: "Where the real magic happens"
  },
  "DevOps Wizardry 🐳": {
    skills: ["Docker", "Git", "Linux", "Terminal"],
    pun: "It works on my machine! 🤷‍♂️"
  },
  "Security Ninja 🥷": {
    skills: ["Burpsuite", "Metasploit", "N-Map", "John The Ripper"],
    pun: "Hacking legally since day 1"
  },
  "3D Universe 🌌": {
    skills: ["Blender", "Unreal", "Figma"],
    pun: "Making 3D dreams come true"
  },
  "Languages Spoken 💬": {
    skills: ["JavaScript", "TypeScript", "Python", "C++", "GO"],
    pun: "Polyglot but with semicolons"
  }
};

const EXPERIENCES = [
  {
    title: "CodeVertex",
    role: "Web Development Intern",
    description: "Built an invoice generator that actually works! (Unlike my first attempt 😅)",
    achievements: [
      "Developed invoice generator with TypeScript",
      "Added PDF export (jsPDF is magic!)",
      "Made it responsive because mobile users exist"
    ],
    funFact: "Learned that CSS centering is still hard in 2024",
    tech: ["TypeScript", "HTML", "CSS", "jsPDF"],
    date: "Oct 2024 - Dec 2024",
    location: "Remote",
    icon: Code2,
    color: "from-purple-600 to-pink-600",
    emoji: "📄"
  },
  {
    title: "Apna Guide",
    role: "Web Developer Intern",
    description: "Cloned Netflix. Yes, THE Netflix. (Legal edition)",
    achievements: [
      "Built Netflix clone with React",
      "TMDb API integration (API keys are friends)",
      "Word counter app (because why not?)"
    ],
    funFact: "Spent 3 hours debugging a typo. Classic dev move.",
    tech: ["React", "JavaScript", "CSS", "TMDb API"],
    date: "Oct 2024 - Nov 2024",
    location: "Remote",
    icon: Rocket,
    color: "from-pink-600 to-purple-600",
    emoji: "🎬"
  },
  {
    title: "InnoByte",
    role: "Web Developer Intern",
    description: "Led a team. Learned that git merge conflicts are real.",
    achievements: [
      "Led King Sukh project",
      "Improved productivity by 30%",
      "Made UI so smooth, butter got jealous"
    ],
    funFact: "git commit -m 'Fixed it' x 100",
    tech: ["HTML", "CSS", "JavaScript"],
    date: "Aug 2024 - Sep 2024",
    location: "Remote",
    icon: Award,
    color: "from-orange-600 to-pink-600",
    emoji: "👑"
  },
  {
    title: "Internship Studio",
    role: "Full Stack Developer",
    description: "Built e-commerce platform. Now I know why Amazon is expensive.",
    achievements: [
      "Full-stack e-commerce with React & Node.js",
      "Payment gateway integration",
      "Designed UI that even my mom could use"
    ],
    funFact: "Discovered CORS. Still recovering.",
    tech: ["React", "Node.js", "Tailwind CSS", "Express.js"],
    date: "Jul 2024 - Aug 2024",
    location: "Remote",
    icon: Briefcase,
    color: "from-blue-600 to-purple-600",
    emoji: "🛒"
  },
  {
    title: "InternPe",
    role: "Web Development Intern",
    description: "Optimized websites. Made internet 0.001% faster.",
    achievements: [
      "Improved performance by 40%",
      "Created 15+ responsive pages",
      "Next.js became my best friend"
    ],
    funFact: "Learned that users hate slow websites. Who knew?",
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    date: "Jul 2024 - Aug 2024",
    location: "Remote",
    icon: Zap,
    color: "from-purple-600 to-pink-600",
    emoji: "⚡"
  }
];

const CODE_SNIPPETS = ['<div>', '</>', '{...}', '( )', '[ ]', 'return', 'const', 'async'];

// Floating code snippets
const FloatingCodeSnippets = () => {
  const snippets = useMemo(() => 
    CODE_SNIPPETS.map((code, i) => ({
      code,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {snippets.map(({ code, x, y, duration }, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-500 font-mono text-xl md:text-2xl"
          initial={{ x: `${x}vw`, y: `${y}vh` }}
          animate={{
            x: [`${x}vw`, `${(x + 50) % 100}vw`],
            y: [`${y}vh`, `${(y + 50) % 100}vh`],
            rotate: [0, 360]
          }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
};

// ULTRA ENGAGING Terminal Biography Component
const TerminalBiography = () => {
  const [terminalMode, setTerminalMode] = useState('boot');
  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentPun, setCurrentPun] = useState(0);
  const [commandCount, setCommandCount] = useState(0);
  const [gameMode, setGameMode] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [particles, setParticles] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints, setMaxHints] = useState(2);
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const hasBooted = useRef(false);

  // Achievement system
  const checkAchievements = (cmd) => {
    const newAchievements = [];
    
    if (commandCount === 10 && !achievements.includes('rookie')) {
      newAchievements.push('rookie');
      showAchievement('🏆 Rookie! Used 10 commands');
    }
    if (commandCount === 50 && !achievements.includes('expert')) {
      newAchievements.push('expert');
      showAchievement('🎖️ Expert! Used 50 commands');
    }
    if (score >= 100 && !achievements.includes('winner')) {
      newAchievements.push('winner');
      showAchievement('🏅 Winner! Scored 100+ points');
    }
    if (cmd === 'matrix' && !achievements.includes('matrix')) {
      newAchievements.push('matrix');
      showAchievement('💚 Neo! Entered the Matrix');
    }
    if (streak >= 3 && !achievements.includes('streak')) {
      newAchievements.push('streak');
      showAchievement('🔥 Hot Streak! 3 wins in a row');
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  const showAchievement = (text) => {
    setCommandHistory(prev => [...prev, { 
      text: `\n🎉 ${text} 🎉\n`, 
      color: "text-yellow-400 font-bold animate-pulse" 
    }]);
    createParticles();
  };

  // Particle effect
  const createParticles = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  // Shake animation
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Rotate puns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPun((prev) => (prev + 1) % DEVELOPER_PUNS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to terminal
  const scrollToTerminal = () => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => inputRef.current?.focus(), 500);
  };

  // Boot sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootSequence = [
      { delay: 0, text: "$ whoami", color: "text-green-400" },
      { delay: 500, text: "> Shubham Tiwari", color: "text-white" },
      { delay: 1000, text: "$ cat about.txt", color: "text-green-400" },
      { delay: 1500, text: "> Loading developer profile...", color: "text-blue-400" },
      { delay: 2000, text: "> 👨‍💻 Full Stack Developer", color: "text-purple-400" },
      { delay: 2500, text: "> 🎓 Computer Science Student", color: "text-cyan-400" },
      { delay: 3000, text: "> 🚀 5 Internships Completed", color: "text-yellow-400" },
      { delay: 3500, text: "> ☕ Coffee-powered coding machine", color: "text-orange-400" },
      { delay: 4000, text: "", color: "text-white" },
      { delay: 4500, text: "$ echo $PASSION", color: "text-green-400" },
      { delay: 5000, text: '> "Building cool stuff, one commit at a time"', color: "text-pink-400" },
      { delay: 5500, text: "", color: "text-white" },
      { delay: 6000, text: "💡 Try: help, matrix, game, trivia, ascii", color: "text-yellow-400" },
    ];

    bootSequence.forEach(({ delay, text, color }) => {
      setTimeout(() => {
        setCommandHistory(prev => [...prev, { type: 'system', text, color }]);
      }, delay);
    });

    setTimeout(() => setTerminalMode('ready'), 7000);
  }, []);

  // Commands
  const commands = {
  help: () => [
    { text: "╔═══════════════════════════════════════╗", color: "text-purple-400" },
    { text: "║        🎮 INTERACTIVE TERMINAL        ║", color: "text-cyan-400" },
    { text: "╠═══════════════════════════════════════╣", color: "text-purple-400" },
    { text: "║  📌 Info: whoami, about, skills       ║", color: "text-gray-400" },
    { text: "║  🎮 Games: game, rps, trivia, typing  ║", color: "text-gray-400" },
    { text: "║  🎨 Fun: matrix, hack, ascii, animate ║", color: "text-gray-400" },
    { text: "║  🏆 More: achievements, stats, contact║", color: "text-gray-400" },
    { text: "║  💡 Game: hint, exit (quit game)      ║", color: "text-gray-400" },
    { text: "║  ☕ Utils: coffee, joke, clear, time  ║", color: "text-gray-400" },
    { text: "╚═══════════════════════════════════════╝", color: "text-purple-400" },
  ],
  
  whoami: () => [
    { text: "╔═══════════════════════════════════╗", color: "text-purple-400" },
    { text: "║  👤 SHUBHAM TIWARI                ║", color: "text-white" },
    { text: "╠═══════════════════════════════════╣", color: "text-purple-400" },
    { text: "║  🎯 Full Stack Developer          ║", color: "text-cyan-400" },
    { text: "║  🚀 CS Student & Tech Enthusiast  ║", color: "text-cyan-400" },
    { text: "╚═══════════════════════════════════╝", color: "text-purple-400" },
  ],
  
  about: () => [
    { text: "┌─────────────────────────────────────┐", color: "text-purple-400" },
    { text: "│  👨‍💻 DEVELOPER PROFILE              │", color: "text-cyan-400" },
    { text: "├─────────────────────────────────────┤", color: "text-purple-400" },
    { text: "│  🎓 Education: Computer Science      │", color: "text-white" },
    { text: "│  💼 Experience: 5 Internships        │", color: "text-white" },
    { text: "│  🌍 Location: India                  │", color: "text-white" },
    { text: "│  ☕ Fuel: Coffee + Pizza             │", color: "text-white" },
    { text: "│  🦸 Superpower: 3 AM Debugging       │", color: "text-white" },
    { text: "└─────────────────────────────────────┘", color: "text-purple-400" },
  ],
  
  skills: () => [
    { text: "╔═══════════════════════════════════════╗", color: "text-purple-400" },
    { text: "║         🛠️ TECH STACK                 ║", color: "text-cyan-400" },
    { text: "╠═══════════════════════════════════════╣", color: "text-purple-400" },
    { text: "║  💻 Frontend:                         ║", color: "text-blue-400" },
    { text: "║    React, Next.js, Tailwind CSS       ║", color: "text-white" },
    { text: "║                                       ║", color: "text-white" },
    { text: "║  ⚙️  Backend:                          ║", color: "text-green-400" },
    { text: "║    Node.js, Express, MongoDB, GO      ║", color: "text-white" },
    { text: "║                                       ║", color: "text-white" },
    { text: "║  🐳 DevOps:                           ║", color: "text-yellow-400" },
    { text: "║    Docker, Git, Linux                 ║", color: "text-white" },
    { text: "║                                       ║", color: "text-white" },
    { text: "║  🔒 Security:                         ║", color: "text-red-400" },
    { text: "║    Burpsuite, Metasploit, N-Map       ║", color: "text-white" },
    { text: "╚═══════════════════════════════════════╝", color: "text-purple-400" },
  ],
  
  contact: () => [
    { text: "╔════════════════════════════════════════╗", color: "text-cyan-400" },
    { text: "║      📫 GET IN TOUCH                   ║", color: "text-white" },
    { text: "╠════════════════════════════════════════╣", color: "text-cyan-400" },
    { text: "║  📧 shubhamtiwaridevlog@gmail.com      ║", color: "text-purple-400" },
    { text: "║  🔗 github.com/shubham-dev-tiwari      ║", color: "text-purple-400" },
    { text: "║  💼 linkedin.com/in/shubham-dev-tiwari/║", color: "text-blue-400" },
    { text: "╚════════════════════════════════════════╝", color: "text-cyan-400" },
  ],
  
  matrix: () => {
    const lines = [];
    for (let i = 0; i < 20; i++) {
      const chars = '01アイウエオカキクケコサシスセソタチツテト';
      const line = Array.from({ length: 50 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      lines.push({ text: line, color: "text-green-400" });
    }
    createParticles();
    return lines;
  },
  
  hack: () => {
    triggerShake();
    setGameMode({ type: 'hack', step: 0 });
    return [
      { text: "[*] 🔴 INITIATING HACK SEQUENCE...", color: "text-red-400" },
      { text: "[*] 🔍 Scanning network: 192.168.1.1", color: "text-yellow-400" },
      { text: "[*] Type 'bypass' to continue or 'exit' to abort", color: "text-cyan-400" },
    ];
  },
  
  bypass: () => {
    if (gameMode?.type === 'hack' && gameMode.step === 0) {
      setGameMode({ type: 'hack', step: 1 });
      return [
        { text: "[*] 🔓 Bypassing firewall...", color: "text-orange-400" },
        { text: "[*] 💾 Type 'download' to extract data or 'exit' to abort", color: "text-cyan-400" },
      ];
    }
    return [{ text: "❌ Command only available during hack sequence", color: "text-red-400" }];
  },
  
  download: () => {
    if (gameMode?.type === 'hack' && gameMode.step === 1) {
      setGameMode(null);
      setScore(prev => prev + 150);
      createParticles();
      return [
        { text: "[*] 💾 Downloading data...", color: "text-cyan-400" },
        { text: "[■■■■■■■■■■] 100% COMPLETE", color: "text-green-400" },
        { text: "[+] ✅ HACK SUCCESSFUL! +150 points", color: "text-green-400" },
        { text: "[!] ⚠️  Remember: Always hack ethically!", color: "text-purple-400" },
      ];
    }
    return [{ text: "❌ Command only available during hack sequence", color: "text-red-400" }];
  },
  
  game: () => {
    const target = Math.floor(Math.random() * 100) + 1;
    setGameMode({ type: 'number', target, attempts: 0, range: { min: 1, max: 100 } });
    setHintsUsed(0);
    return [
      { text: "╔═══════════════════════════════════╗", color: "text-cyan-400" },
      { text: "║   🎮 NUMBER GUESSING GAME         ║", color: "text-yellow-400" },
      { text: "╠═══════════════════════════════════╣", color: "text-cyan-400" },
      { text: "║  Guess a number between 1-100!    ║", color: "text-white" },
      { text: "║  💡 Type 'hint' for help (2 max)  ║", color: "text-gray-400" },
      { text: "║  🚪 Type 'exit' to quit game      ║", color: "text-gray-400" },
      { text: "║  Fewer attempts = Higher score!   ║", color: "text-gray-400" },
      { text: "╚═══════════════════════════════════╝", color: "text-cyan-400" },
    ];
  },
  
  hint: () => {
    if (!gameMode) {
      return [{ text: "❌ No active game! Start a game first", color: "text-red-400" }];
    }

    if (hintsUsed >= maxHints) {
      return [{ text: "❌ No more hints available!", color: "text-red-400" }];
    }

    setHintsUsed(prev => prev + 1);

    if (gameMode.type === 'number') {
      const target = gameMode.target;
      const range = gameMode.range;
      const mid = Math.floor((range.min + range.max) / 2);
      
      if (hintsUsed === 0) {
        // First hint: narrow range
        if (target < mid) {
          return [
            { text: `💡 Hint 1: The number is less than ${mid}`, color: "text-yellow-400" },
            { text: `Hints remaining: ${maxHints - hintsUsed - 1}`, color: "text-gray-400" },
          ];
        } else {
          return [
            { text: `💡 Hint 1: The number is greater than ${mid}`, color: "text-yellow-400" },
            { text: `Hints remaining: ${maxHints - hintsUsed - 1}`, color: "text-gray-400" },
          ];
        }
      } else {
        // Second hint: even/odd
        return [
          { text: `💡 Hint 2: The number is ${target % 2 === 0 ? 'EVEN' : 'ODD'}`, color: "text-yellow-400" },
          { text: "No more hints available!", color: "text-red-400" },
        ];
      }
    }

    if (gameMode.type === 'trivia') {
      setHintsUsed(prev => prev + 1);
      const answer = gameMode.question.a;
      const firstLetter = answer[0].toUpperCase();
      return [
        { text: `💡 Hint: Answer starts with "${firstLetter}"`, color: "text-yellow-400" },
        { text: `Hints remaining: ${maxHints - hintsUsed - 1}`, color: "text-gray-400" },
      ];
    }

    if (gameMode.type === 'typing') {
      return [
        { text: "💡 Hint: Just type the word exactly as shown!", color: "text-yellow-400" },
        { text: "Letters are case-sensitive!", color: "text-gray-400" },
      ];
    }

    return [{ text: "💡 No hints available for this game", color: "text-yellow-400" }];
  },
  
  rps: () => {
    setGameMode({ type: 'rps' });
    return [
      { text: "╔═══════════════════════════════════╗", color: "text-cyan-400" },
      { text: "║  ✊✋✌️  ROCK PAPER SCISSORS ✌️✋✊ ║", color: "text-yellow-400" },
      { text: "╠═══════════════════════════════════╣", color: "text-cyan-400" },
      { text: "║  Type: rock, paper, or scissors   ║", color: "text-white" },
      { text: "║  Win = 50 points! 🏆              ║", color: "text-green-400" },
      { text: "║  Type 'exit' to quit              ║", color: "text-gray-400" },
      { text: "╚═══════════════════════════════════╝", color: "text-cyan-400" },
    ];
  },
  
  trivia: () => {
    const triviaQuestions = [
      { q: "What does HTML stand for?", a: "hypertext markup language", hint: "Marking up hypertext" },
      { q: "Who created JavaScript?", a: "brendan eich", hint: "Brendan ___" },
      { q: "What year was Python released?", a: "1991", hint: "Early 90s" },
      { q: "What does CSS stand for?", a: "cascading style sheets", hint: "Cascading ___" },
      { q: "What database does MongoDB use?", a: "nosql", hint: "Not SQL" },
      { q: "What does API stand for?", a: "application programming interface", hint: "Programming ___" },
      { q: "Who created Linux?", a: "linus torvalds", hint: "Linus ___" },
    ];
    const question = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    setGameMode({ type: 'trivia', question });
    setHintsUsed(0);
    return [
      { text: "╔═══════════════════════════════════╗", color: "text-purple-400" },
      { text: "║      🧠 CODING TRIVIA 🧠          ║", color: "text-cyan-400" },
      { text: "╠═══════════════════════════════════╣", color: "text-purple-400" },
      { text: `║  ${question.q.padEnd(32)} ║`, color: "text-white" },
      { text: "║                                   ║", color: "text-white" },
      { text: "║  💡 Type 'hint' for help          ║", color: "text-yellow-400" },
      { text: "║  🚪 Type 'exit' to quit           ║", color: "text-gray-400" },
      { text: "╚═══════════════════════════════════╝", color: "text-purple-400" },
    ];
  },
  
  typing: () => {
    const words = ["javascript", "python", "developer", "coding", "terminal", "algorithm", "function", "variable"];
    const word = words[Math.floor(Math.random() * words.length)];
    setGameMode({ type: 'typing', word, startTime: Date.now() });
    return [
      { text: "╔═══════════════════════════════════╗", color: "text-green-400" },
      { text: "║  ⌨️  SPEED TYPING CHALLENGE ⌨️   ║", color: "text-yellow-400" },
      { text: "╠═══════════════════════════════════╣", color: "text-green-400" },
      { text: `║  Type this word fast:             ║`, color: "text-white" },
      { text: `║                                   ║`, color: "text-white" },
      { text: `║      >>> ${word.toUpperCase()} <<<${' '.repeat(Math.max(0, 16 - word.length))}║`, color: "text-yellow-400" },
      { text: "║                                   ║", color: "text-white" },
      { text: "║  🚪 Type 'exit' to quit           ║", color: "text-gray-400" },
      { text: "╚═══════════════════════════════════╝", color: "text-green-400" },
    ];
  },
  
  ascii: () => [
    { text: "    _____ _           _     _                     ", color: "text-cyan-400" },
    { text: "   / ____| |         | |   | |                    ", color: "text-cyan-400" },
    { text: "  | (___ | |__  _   _| |__ | |__   __ _ _ __ ___  ", color: "text-purple-400" },
    { text: "   \\___ \\| '_ \\| | | | '_ \\| '_ \\ / _` | '_ ` _ \\ ", color: "text-purple-400" },
    { text: "   ____) | | | | |_| | |_) | | | | (_| | | | | | |", color: "text-pink-400" },
    { text: "  |_____/|_| |_|\\__,_|_.__/|_| |_|\\__,_|_| |_| |_|", color: "text-pink-400" },
    { text: "", color: "text-white" },
    { text: "         💻 Full Stack Developer 💻", color: "text-yellow-400" },
  ],
  
  animate: () => {
    createParticles();
    return [
      { text: "✨ ═══════════════════════════════ ✨", color: "text-cyan-400" },
      { text: "   🚀 PARTICLE ANIMATION ACTIVATED 🚀", color: "text-yellow-400" },
      { text: "✨ ═══════════════════════════════ ✨", color: "text-cyan-400" },
    ];
  },
  
  time: () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();
    return [
      { text: "╔════════════════════════════════════╗", color: "text-purple-400" },
      { text: "║      ⏰ CURRENT TIME ⏰            ║", color: "text-cyan-400" },
      { text: "╠════════════════════════════════════╣", color: "text-purple-400" },
      { text: `║  🕐 ${timeStr.padEnd(29)}║`, color: "text-white" },
      { text: `║  📅 ${dateStr.padEnd(29)}║`, color: "text-white" },
      { text: "╚════════════════════════════════════╝", color: "text-purple-400" },
    ];
  },
  
  achievements: () => {
    if (achievements.length === 0) {
      return [
        { text: "╔═══════════════════════════════════╗", color: "text-yellow-400" },
        { text: "║      🏆 ACHIEVEMENTS 🏆           ║", color: "text-yellow-400" },
        { text: "╠═══════════════════════════════════╣", color: "text-yellow-400" },
        { text: "║  No achievements yet!             ║", color: "text-white" },
        { text: "║  Keep exploring to unlock! 🔓     ║", color: "text-gray-400" },
        { text: "╚═══════════════════════════════════╝", color: "text-yellow-400" },
      ];
    }
    return [
      { text: "╔═══════════════════════════════════╗", color: "text-yellow-400" },
      { text: "║      🏆 YOUR ACHIEVEMENTS 🏆      ║", color: "text-yellow-400" },
      { text: "╠═══════════════════════════════════╣", color: "text-yellow-400" },
      ...achievements.map(a => ({ 
        text: `║  ✅ ${a.toUpperCase().padEnd(28)} ║`, 
        color: "text-green-400" 
      })),
      { text: "╚═══════════════════════════════════╝", color: "text-yellow-400" },
    ];
  },
  
  joke: () => {
    const jokes = [
      "Q: Why do programmers prefer dark mode?\nA: Because light attracts bugs! 🐛",
      "Q: How many programmers does it take to change a light bulb?\nA: None. That's a hardware problem! 💡",
      "There are 10 types of people:\nThose who understand binary and those who don't 😄",
      "Q: Why do Java developers wear glasses?\nA: Because they can't C# 😎",
      "I would tell you a UDP joke...\nBut you might not get it 📡",
      "Q: Why did the developer go broke?\nA: Because he used up all his cache! 💰",
    ];
    return [{ text: jokes[Math.floor(Math.random() * jokes.length)], color: "text-pink-400" }];
  },
  
  coffee: () => {
    createParticles();
    return [
      { text: "☕ BREWING ULTIMATE COFFEE... ☕", color: "text-yellow-400" },
      { text: "[░░░░░░░░░░] 0%", color: "text-gray-600" },
      { text: "[████░░░░░░] 40%", color: "text-yellow-600" },
      { text: "[████████░░] 80%", color: "text-orange-500" },
      { text: "[██████████] 100%", color: "text-green-400" },
      { text: "", color: "text-white" },
      { text: "☕☕☕ COFFEE READY! ☕☕☕", color: "text-orange-400" },
      { text: "💪 MAXIMUM CAFFEINE ACHIEVED! 🚀", color: "text-green-400" },
    ];
  },
  
  stats: () => [
    { text: "╔═══════════════════════════════════╗", color: "text-purple-400" },
    { text: "║      📊 YOUR STATISTICS 📊        ║", color: "text-cyan-400" },
    { text: "╠═══════════════════════════════════╣", color: "text-purple-400" },
    { text: `║  💻 Commands: ${commandCount.toString().padEnd(18)}║`, color: "text-white" },
    { text: `║  🏆 Score: ${score.toString().padEnd(21)}║`, color: "text-yellow-400" },
    { text: `║  🔥 Streak: ${streak.toString().padEnd(20)}║`, color: "text-orange-400" },
    { text: `║  ⭐ Achievements: ${achievements.length.toString().padEnd(14)}║`, color: "text-purple-400" },
    { text: "╚═══════════════════════════════════╝", color: "text-purple-400" },
  ],
  
  clear: () => {
    setCommandHistory([]);
    return [];
  },
  
  exit: () => {
    if (gameMode) {
      setGameMode(null);
      setHintsUsed(0);
      return [
        { text: "🚪 Game exited!", color: "text-yellow-400" },
        { text: "Type 'help' to see available commands", color: "text-gray-400" },
      ];
    }
    return [
      { text: "👋 Thanks for exploring my terminal!", color: "text-cyan-400" },
      { text: "💻 Keep coding & stay awesome! ✨", color: "text-purple-400" },
    ];
  },
};

// ENHANCED handleCommand with better game logic
const handleCommand = (cmd) => {
  const trimmedCmd = cmd.trim().toLowerCase();
  setCommandHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}`, color: "text-green-400" }]);
  setCommandCount(prev => prev + 1);
  checkAchievements(trimmedCmd);

  // Number game with hints
  if (gameMode?.type === 'number') {
    if (trimmedCmd === 'exit') {
      return handleCommand('exit');
    }
    if (trimmedCmd === 'hint') {
      const output = commands.hint();
      setCommandHistory(prev => [...prev, ...output]);
      return;
    }

    const guess = parseInt(trimmedCmd);
    if (isNaN(guess)) {
      setCommandHistory(prev => [...prev, { text: "❌ Enter a valid number, 'hint', or 'exit'", color: "text-red-400" }]);
      return;
    }

    const newAttempts = gameMode.attempts + 1;
    if (guess === gameMode.target) {
      const basePoints = 100;
      const attemptPenalty = newAttempts * 10;
      const hintPenalty = hintsUsed * 20;
      const points = Math.max(10, basePoints - attemptPenalty - hintPenalty);
      
      setCommandHistory(prev => [...prev, 
        { text: `🎉 CORRECT! The number was ${gameMode.target}`, color: "text-green-400" },
        { text: `Attempts: ${newAttempts} | Hints used: ${hintsUsed}`, color: "text-cyan-400" },
        { text: `+${points} points 🏆`, color: "text-yellow-400" },
      ]);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setGameMode(null);
      setHintsUsed(0);
      createParticles();
    } else if (guess < gameMode.target) {
      setCommandHistory(prev => [...prev, { 
        text: `📈 Too low! Try higher (Attempt ${newAttempts}/∞)`, 
        color: "text-yellow-400" 
      }]);
      setGameMode({ ...gameMode, attempts: newAttempts });
    } else {
      setCommandHistory(prev => [...prev, { 
        text: `📉 Too high! Try lower (Attempt ${newAttempts}/∞)`, 
        color: "text-yellow-400" 
      }]);
      setGameMode({ ...gameMode, attempts: newAttempts });
    }
    return;
  }

  // RPS game
  if (gameMode?.type === 'rps') {
    if (trimmedCmd === 'exit') {
      return handleCommand('exit');
    }

    const choices = ['rock', 'paper', 'scissors'];
    if (!choices.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, { 
        text: "❌ Invalid! Type: rock, paper, scissors, or exit", 
        color: "text-red-400" 
      }]);
      return;
    }

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const isWin = (trimmedCmd === 'rock' && computerChoice === 'scissors') ||
                 (trimmedCmd === 'paper' && computerChoice === 'rock') ||
                 (trimmedCmd === 'scissors' && computerChoice === 'paper');
    
    if (trimmedCmd === computerChoice) {
      setCommandHistory(prev => [...prev, { 
        text: `🤝 Tie! We both chose ${trimmedCmd}`, 
        color: "text-yellow-400" 
      }]);
      setStreak(0);
    } else if (isWin) {
      setCommandHistory(prev => [...prev, { 
        text: `🎉 YOU WIN! ${trimmedCmd} beats ${computerChoice} +50pts`, 
        color: "text-green-400" 
      }]);
      setScore(prev => prev + 50);
      setStreak(prev => prev + 1);
      createParticles();
    } else {
      setCommandHistory(prev => [...prev, { 
        text: `😢 You lose! ${computerChoice} beats ${trimmedCmd}`, 
        color: "text-red-400" 
      }]);
      setStreak(0);
    }
    setGameMode(null);
    return;
  }

  // Trivia game with hints
  if (gameMode?.type === 'trivia') {
    if (trimmedCmd === 'exit') {
      return handleCommand('exit');
    }
    if (trimmedCmd === 'hint') {
      const output = commands.hint();
      setCommandHistory(prev => [...prev, ...output]);
      return;
    }

    if (trimmedCmd === gameMode.question.a) {
      const basePoints = 100;
      const hintPenalty = hintsUsed * 30;
      const points = Math.max(20, basePoints - hintPenalty);
      
      setCommandHistory(prev => [...prev, { 
        text: `🎉 CORRECT! +${points} points!`, 
        color: "text-green-400" 
      }]);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setGameMode(null);
      setHintsUsed(0);
      createParticles();
    } else {
      setCommandHistory(prev => [...prev, { 
        text: `❌ Wrong! Answer: ${gameMode.question.a}`, 
        color: "text-red-400" 
      }]);
      setStreak(0);
      setGameMode(null);
      setHintsUsed(0);
    }
    return;
  }

  // Typing game
  if (gameMode?.type === 'typing') {
    if (trimmedCmd === 'exit') {
      return handleCommand('exit');
    }

    if (trimmedCmd === gameMode.word) {
      const timeTaken = ((Date.now() - gameMode.startTime) / 1000).toFixed(2);
      const points = Math.max(50, 200 - Math.floor(timeTaken * 10));
      setCommandHistory(prev => [...prev, 
        { text: `⚡ PERFECT! Time: ${timeTaken}s`, color: "text-green-400" },
        { text: `+${points} points! 🏆`, color: "text-yellow-400" },
      ]);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setGameMode(null);
      createParticles();
    } else {
      setCommandHistory(prev => [...prev, { 
        text: "❌ Wrong! Try again or type 'exit'", 
        color: "text-red-400" 
      }]);
    }
    return;
  }

  // Hack game sequence
  if (gameMode?.type === 'hack') {
    if (trimmedCmd === 'exit') {
      setGameMode(null);
      setCommandHistory(prev => [...prev, { 
        text: "🚪 Hack sequence aborted!", 
        color: "text-yellow-400" 
      }]);
      return;
    }
  }

  // Easter eggs
  if (trimmedCmd === 'sudo rm -rf /') {
    triggerShake();
    setCommandHistory(prev => [...prev, 
      { text: "⚠️  DANGER! System destruction detected!", color: "text-red-400" },
      { text: "🛡️  Safety protocols engaged!", color: "text-green-400" },
      { text: "😄 Nice try though!", color: "text-yellow-400" },
    ]);
    return;
  }

  if (trimmedCmd.includes('npm install')) {
    setCommandHistory(prev => [...prev, 
      { text: "📦 Installing packages...", color: "text-yellow-400" },
      { text: "⚠️  Warning: 2047 vulnerabilities found", color: "text-red-400" },
      { text: "💀 Just kidding! We're all good 😄", color: "text-green-400" },
    ]);
    return;
  }

  // Regular commands
  if (commands[trimmedCmd]) {
    const output = commands[trimmedCmd]();
    setCommandHistory(prev => [...prev, ...output]);
  } else if (trimmedCmd) {
    setCommandHistory(prev => [...prev, { 
      text: `❌ Command not found: '${trimmedCmd}'. Type 'help'`, 
      color: "text-red-400" 
    }]);
  }
};
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      handleCommand(userInput);
      setUserInput('');
    }
  };

  const PunIcon = DEVELOPER_PUNS[currentPun].icon;

  return (
    <div className="flex flex-col gap-6 md:gap-8 justify-center relative" ref={terminalRef}>
      {/* Particle Effects */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0, x: `${particle.x}%`, y: `${particle.y}%` }}
          animate={{ opacity: 0, scale: 2, y: `${particle.y - 50}%` }}
          transition={{ duration: 2 }}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-50"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
        />
      ))}

      {/* Pun Banner */}
      <motion.div
        key={currentPun}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${DEVELOPER_PUNS[currentPun].color} rounded-xl md:rounded-2xl p-3 md:p-4 shadow-2xl border border-white/20`}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 text-white font-mono text-xs md:text-sm lg:text-base">
          <PunIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-semibold text-center">{DEVELOPER_PUNS[currentPun].text}</span>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-4 py-3 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" 
              onClick={() => handleCommand('clear')} 
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <Terminal className="w-4 h-4 text-purple-400 ml-2" />
            <span className="text-sm text-gray-400 font-mono">shubham@portfolio</span>
          </div>
          
          <div className="flex items-center gap-4">
            {streak > 0 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xs text-orange-400 font-mono flex items-center gap-1"
              >
                <Flame className="w-3 h-3" />
                <span>{streak}x</span>
              </motion.div>
            )}
            {score > 0 && (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-xs text-yellow-400 font-mono flex items-center gap-1"
              >
                <Trophy className="w-3 h-3" />
                <span>{score}pts</span>
              </motion.div>
            )}
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-green-400 font-mono"
            >
              ● online
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 font-mono text-sm h-96 md:h-[500px] overflow-y-auto space-y-1 bg-black/40">
          {commandHistory.map((line, idx) => (
            <div key={idx} className={`${line.color} whitespace-pre-wrap`}>
              {line.text}
            </div>
          ))}
          
          {terminalMode === 'ready' && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-white"
                placeholder={gameMode ? "Enter your answer..." : "Type a command..."}
                autoFocus
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-white"
              >
                █
              </motion.span>
            </div>
          )}
        </div>

        {/* Enhanced Status Bar with Icons */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-2 border-t border-purple-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4 text-gray-400 font-mono">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Coffee className="w-3 h-3 text-yellow-400" />
              <span>caffeinated</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="flex items-center gap-1"
            >
              <Activity className="w-3 h-3 text-blue-400" />
              <span>{commandCount} cmds</span>
            </motion.div>
            {gameMode && (
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-1 text-pink-400"
              >
                <Gamepad2 className="w-3 h-3" />
                <span>game</span>
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-2 text-purple-400 font-mono">
            <BarChart className="w-3 h-3" />
            <span>{commandHistory.length} lines</span>
            {achievements.length > 0 && (
              <>
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400">{achievements.length}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Quick Buttons with Icons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
           { cmd: "whoami", icon: User },
          { cmd: 'help', icon: HelpCircle },
          { cmd: 'about', icon: User },
          { cmd: 'skills', icon: Code2 },
          { cmd: 'game', icon: Target },
          { cmd: 'trivia', icon: Brain },
          { cmd: 'typing', icon: Keyboard },
          { cmd: 'matrix', icon: Activity },
          { cmd: 'ascii', icon: Type },
          { cmd: 'coffee', icon: Coffee },
          { cmd: 'hack', icon:   Server },
           { cmd: 'joke', icon:   LaughIcon },
           
           { cmd: "time", icon: Clock },
           { cmd: "hint",  icon: Lightbulb },
          { cmd: "exit", icon: XCircle },
           { cmd: "achievements", icon: Trophy },
      { cmd: "stats",  icon: BarChart3 },
       { cmd: "animate", icon: Sparkles },
       { cmd: "rps", icon: Hand },

       { cmd: "clear", icon: Trash2 },
        ].map(({ cmd, icon: Icon }) => (
          <motion.button
            key={cmd}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              scrollToTerminal();
              setTimeout(() => handleCommand(cmd), 600);
            }}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg text-purple-300 font-mono text-xs hover:from-purple-600/40 hover:to-pink-600/40 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center gap-1"
          >
            <Icon className="w-3 h-3" />
            <span>{cmd}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="flex justify-center"
      >
        <div className="bg-purple-900/30 rounded-full p-2">
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
        </div>
      </motion.div>
    </div>
  );
};

// StatCard component
const StatCard = ({ stat, index, isInView }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : {}}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-pointer h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl  opacity-50 group-hover:opacity-75 transition-all`} />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 text-center h-full flex flex-col justify-center">
        <div className="flex justify-center mb-2 md:mb-3 text-white">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1 md:mb-2 font-mono">
          {stat.number}
        </div>
        <div className="text-xs md:text-sm text-white font-semibold mb-1">{stat.label}</div>
        <div className="text-[10px] md:text-xs text-gray-400 font-mono">{stat.sublabel}</div>
      </div>
    </motion.div>
  );
};

// SkillBadge component
const SkillBadge = ({ skill, delay, isInView, onHover, isHovered }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay }}
    whileHover={{ scale: 1.15, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    onHoverStart={() => onHover(skill)}
    onHoverEnd={() => onHover(null)}
    className="relative group px-3 md:px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white transition-all shadow-lg hover:shadow-purple-500/50"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/30 group-hover:to-pink-600/30 rounded-lg transition-all" />
    <span className="relative z-10 text-xs md:text-sm font-medium drop-shadow-md flex items-center gap-2">
      {isHovered && <Sparkles className="w-3 h-3 md:w-4 md:h-4" />}
      {skill}
    </span>
  </motion.div>
);

const AboutPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px", once: false });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px", once: false });

  const statsRef = useRef();
  const isStatsRefInView = useInView(statsRef, { margin: "-100px", once: false });

  const [selectedExp, setSelectedExp] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleSkillHover = useCallback((skill) => {
    setHoveredSkill(skill);
  }, []);

  const selectedExperience = EXPERIENCES[selectedExp];
  const SelectedExpIcon = selectedExperience.icon;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <FloatingCodeSnippets />

      <div className="h-screen overflow-y-auto relative z-10" ref={containerRef}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 flex flex-col gap-16 md:gap-24 lg:gap-32">
          
          <TerminalBiography />

          {/* STATS */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} index={idx} isInView={isStatsRefInView} />
            ))}
          </div>

          {/* SKILLS */}
          <div className="flex flex-col gap-6 md:gap-8 justify-center" ref={skillRef}>
            <motion.h1
              initial={{ x: "-300px", opacity: 0 }}
              animate={isSkillRefInView ? { x: 0, opacity: 1 } : {}}
              className="font-bold text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
            >
              {'<SKILLS />'}
            </motion.h1>

            <div className="space-y-4 md:space-y-6">
              {Object.entries(SKILL_CATEGORIES).map(([category, data], catIdx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isSkillRefInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: catIdx * 0.1 }}
                  className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300 flex items-center gap-2">
                      <Folder className="w-4 h-4 md:w-5 md:h-5" />
                      {category}
                    </h3>
                    <span className="text-[10px] md:text-xs text-gray-500 italic font-mono hidden sm:block">// {data.pun}</span>
                  </div>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {data.skills.map((skill, idx) => (
                      <SkillBadge
                        key={skill}
                        skill={skill}
                        delay={catIdx * 0.1 + idx * 0.05}
                        isInView={isSkillRefInView}
                        onHover={handleSkillHover}
                        isHovered={hoveredSkill === skill}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="flex flex-col gap-8 md:gap-12 justify-center pb-24 md:pb-48" ref={experienceRef}>
            <motion.h1
              initial={{ x: "-300px", opacity: 0 }}
              animate={isExperienceRefInView ? { x: "0", opacity: 1 } : {}}
              className="font-bold text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
            >
              {'<EXPERIENCE />'}
            </motion.h1>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {EXPERIENCES.map((exp, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedExp(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                    selectedExp === idx
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{exp.emoji}</span>
                  <span className="hidden sm:inline">{exp.title}</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={selectedExp}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedExperience.color} rounded-2xl md:rounded-3xl  opacity-30 group-hover:opacity-50 transition-all`} />
              <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 md:mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl md:text-4xl">{selectedExperience.emoji}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{selectedExperience.title}</h3>
                    </div>
                    <p className="text-purple-400 font-semibold mb-2 text-sm md:text-base">{selectedExperience.role}</p>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        {selectedExperience.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        {selectedExperience.location}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-r ${selectedExperience.color} shadow-lg self-start`}>
                    <SelectedExpIcon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">{selectedExperience.description}</p>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <div className="flex items-center gap-2 text-pink-400 font-semibold mb-2">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm">Fun Fact:</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300 italic font-mono">{selectedExperience.funFact}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 md:w-5 md:h-5" />
                    What I Actually Did:
                  </h4>
                  <ul className="space-y-2">
                    {selectedExperience.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                        <span className="font-mono text-xs md:text-sm">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                    <Package className="w-3 h-3 md:w-4 md:h-4" />
                    Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-2 md:px-3 py-1 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full text-[10px] md:text-xs text-purple-300 border border-purple-500/30 font-mono"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default AboutPage;
