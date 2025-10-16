"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Coffee, Bug, Terminal, Code2, Zap, Heart, Trophy, Flame, Shield, Rocket, Brain, 
  Sparkles, Star, Clock, Award, ChevronRight, RotateCcw, Share2, Volume2, VolumeX, 
  Dice5, GitBranch, Database, Package, Lightbulb, Wrench, CheckCircle, XCircle, 
  PartyPopper, TrendingUp, Laptop, Server, Lock, FileCode, GitCommit, Smile, Frown, 
  Eye, Target, Sword, Crown, Gauge, Flame as Fire, Zap as Lightning, BadgeCheck,
  AlertTriangle, ThumbsUp, ThumbsDown, MessageSquare, Send, Download, Upload,
  Cake, Pizza, Beer, CloudRain, Sun, Moon, Wifi, WifiOff, Loader  // ADD THIS
} from "lucide-react";

// 🎭 50+ EPIC DEVELOPER JOKES (Expanded!)
const JOKES_DATABASE = [
  // Classic Jokes
  { id: 1, text: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs! 🐛", category: "Classic", icon: Bug, difficulty: "Easy" },
  { id: 2, text: "How many programmers does it take to change a lightbulb?", punchline: "None, that's a hardware problem! 💡", category: "Classic", icon: Lightbulb, difficulty: "Easy" },
  { id: 3, text: "Why do Java developers wear glasses?", punchline: "Because they can't C#! 👓", category: "Languages", icon: Code2, difficulty: "Medium" },
  { id: 4, text: "What's a programmer's favorite hangout?", punchline: "The Foo Bar! 🍺", category: "Classic", icon: Beer, difficulty: "Easy" },
  
  // Debugging Nightmares
  { id: 5, text: "99 little bugs in the code...", punchline: "Take one down, patch it around... 127 little bugs in the code! 😭", category: "Debugging", icon: Bug, difficulty: "Hard" },
  { id: 6, text: "Debugging:", punchline: "Being a detective in a crime movie where you're also the murderer! 🕵️", category: "Debugging", icon: Bug, difficulty: "Medium" },
  { id: 7, text: "My code doesn't work...", punchline: "I have no idea why! Then it works... I have no idea why! 😂", category: "Debugging", icon: Bug, difficulty: "Hard" },
  
  // Network & Infrastructure
  { id: 8, text: "There's no place like...", punchline: "127.0.0.1 🏠", category: "Network", icon: Wifi, difficulty: "Easy" },
  { id: 9, text: "I would tell you a UDP joke...", punchline: "But you might not get it! 📡", category: "Network", icon: Server, difficulty: "Medium" },
  { id: 10, text: "I've got a really good UDP joke...", punchline: "But I don't know if you'll get it! 📡", category: "Network", icon: CloudRain, difficulty: "Medium" },
  
  // Database Humor
  { id: 11, text: "A SQL query walks into a bar...", punchline: "Walks up to two tables and asks: 'Can I JOIN you?' 🤝", category: "Database", icon: Database, difficulty: "Medium" },
  { id: 12, text: "SELECT * FROM users WHERE clue > 0", punchline: "0 rows returned 😅", category: "Database", icon: Database, difficulty: "Easy" },
  
  // Dev Life Sarcasm
  { id: 13, text: "Programmer (noun):", punchline: "An organism that turns caffeine into code! ☕→💻", category: "Sarcasm", icon: Coffee, difficulty: "Easy" },
  { id: 14, text: "Programming is like love...", punchline: "One mistake and you support it for life! 💕", category: "Sarcasm", icon: Heart, difficulty: "Hard" },
  { id: 15, text: "My code is so clean...", punchline: "...said no developer ever! 🗑️", category: "Sarcasm", icon: Code2, difficulty: "Easy" },
  { id: 16, text: "I'm not lazy...", punchline: "I'm just on energy-saving mode! ⚡", category: "Motivation", icon: Zap, difficulty: "Easy" },
  
  // Math & Logic
  { id: 17, text: "Why do programmers always mix up Halloween and Christmas?", punchline: "Because Oct 31 == Dec 25! 🎃🎄", category: "Math", icon: Code2, difficulty: "Hard" },
  { id: 18, text: "The best thing about a Boolean...", punchline: "Even if you're wrong, you're only off by a bit! 🔢", category: "Logic", icon: Code2, difficulty: "Medium" },
  { id: 19, text: "A programmer's wife tells him:", punchline: "'Go buy bread. If they have eggs, get a dozen.' He returns with 12 loaves! 🍞", category: "Logic", icon: Brain, difficulty: "Hard" },
  { id: 20, text: "To understand recursion...", punchline: "You must first understand recursion! 🔄", category: "Programming", icon: RotateCcw, difficulty: "Medium" },
  
  // Git & Version Control
  { id: 21, text: "Git commit -m 'Fixed bug'", punchline: "*Creates 5 new bugs* 'This is fine' 🔥", category: "Git", icon: GitBranch, difficulty: "Medium" },
  { id: 22, text: "git push --force", punchline: "Famous last words of every developer! 💀", category: "Git", icon: GitCommit, difficulty: "Hard" },
  
  // Security
  { id: 23, text: "My password is so secure...", punchline: "...even I can't remember it! 🔐", category: "Security", icon: Lock, difficulty: "Medium" },
  { id: 24, text: "Two-factor authentication:", punchline: "Because one password to remember wasn't enough! 😤", category: "Security", icon: Shield, difficulty: "Easy" },
  
  // NPM & Dependencies
  { id: 25, text: "npm install happiness", punchline: "Error: Cannot find module 'life' 💔", category: "NPM", icon: Package, difficulty: "Medium" },
  { id: 26, text: "node_modules folder:", punchline: "The heaviest object in the universe! 🌌", category: "NPM", icon: Package, difficulty: "Easy" },
  
  // DevOps
  { id: 27, text: "It works on my machine!", punchline: "Then we'll ship your machine! 📦", category: "DevOps", icon: Laptop, difficulty: "Easy" },
  { id: 28, text: "Docker: Because...", punchline: "'It works on my machine' wasn't good enough! 🐳", category: "DevOps", icon: Shield, difficulty: "Medium" },
  
  // Linux & Command Line
  { id: 29, text: "sudo rm -rf my-problems", punchline: "Permission denied... story of my life! 😔", category: "Linux", icon: Terminal, difficulty: "Medium" },
  { id: 30, text: "sudo make me a sandwich", punchline: "Okay. *makes sandwich* 🥪", category: "Linux", icon: Terminal, difficulty: "Easy" },
  
  // Coffee Culture
  { id: 31, text: "I don't need coffee...", punchline: "I need semicolons! Actually... I need both ☕", category: "Coffee", icon: Coffee, difficulty: "Easy" },
  { id: 32, text: "I code therefore I am...", punchline: "...caffeinated! ☕", category: "Coffee", icon: Coffee, difficulty: "Easy" },
  { id: 33, text: "Decaf coffee:", punchline: "The developer's biggest fear! 😱", category: "Coffee", icon: Coffee, difficulty: "Easy" },
  
  // Tech Humor
  { id: 34, text: "Why did the developer go broke?", punchline: "Because they used up all their cache! 💸", category: "Tech", icon: Server, difficulty: "Medium" },
  { id: 35, text: "Eight bytes walk into a bar...", punchline: "The bartender asks: 'What will it be?' One says: 'Make us a double!' 🍺", category: "Tech", icon: Beer, difficulty: "Hard" },
  { id: 36, text: "Life without barriers...", punchline: "Would be just .io! 🌐", category: "Tech", icon: Sparkles, difficulty: "Medium" },
  
  // JavaScript Madness
  { id: 37, text: "How do you comfort a JavaScript bug?", punchline: "You console it! 🤗", category: "JavaScript", icon: Terminal, difficulty: "Easy" },
  { id: 38, text: "[] + [] in JavaScript:", punchline: "''  ...Makes perfect sense! 🤪", category: "JavaScript", icon: Code2, difficulty: "Hard" },
  { id: 39, text: "typeof NaN", punchline: "'number' ...JavaScript logic! 🤯", category: "JavaScript", icon: Brain, difficulty: "Hard" },
  
  // Code Quality
  { id: 40, text: "// TODO: Fix this", punchline: "Narrator: They never fixed it. 📝", category: "Sarcasm", icon: FileCode, difficulty: "Medium" },
  { id: 41, text: "// This code is perfect", punchline: "...said by someone who's never seen it run. 😅", category: "Sarcasm", icon: Code2, difficulty: "Easy" },
  { id: 42, text: "Code review comment:", punchline: "'LGTM' (Let's Get This Merged - didn't actually look) 👀", category: "Sarcasm", icon: Eye, difficulty: "Medium" },
  
  // Meetings & Management
  { id: 43, text: "The best code:", punchline: "Is code never written! ...Because meetings! 📅", category: "Sarcasm", icon: Clock, difficulty: "Easy" },
  { id: 44, text: "Scrum Master:", punchline: "'Let's take this offline' *Never speaks of it again* 🙊", category: "Sarcasm", icon: MessageSquare, difficulty: "Medium" },
  
  // Nature & Bugs
  { id: 45, text: "Why do programmers hate nature?", punchline: "Too many bugs! 🐛🌲", category: "Classic", icon: Bug, difficulty: "Easy" },
  { id: 46, text: "Why did the developer quit?", punchline: "They didn't get arrays! 📊", category: "Sarcasm", icon: TrendingUp, difficulty: "Medium" },
  
  // AI & Future
  { id: 47, text: "ChatGPT writes better code...", punchline: "...than my code on Friday evening! 🤖", category: "AI", icon: Brain, difficulty: "Easy" },
  { id: 48, text: "Will AI replace developers?", punchline: "Not until AI learns to debug its own bugs! 🤖🐛", category: "AI", icon: Rocket, difficulty: "Medium" },
  
  // Random Tech
  { id: 49, text: "What's a programmer's favorite song?", punchline: "Hello World by Adele! 🎵", category: "Fun", icon: Sparkles, difficulty: "Easy" },
  { id: 50, text: "Why was the JavaScript developer sad?", punchline: "Because they didn't Node how to Express themselves! 😢", category: "JavaScript", icon: Server, difficulty: "Hard" },
  
  // Bonus Easter Eggs
  { id: 51, text: "404:", punchline: "Joke not found! (Ironically, this IS the joke) 🔍", category: "Classic", icon: AlertTriangle, difficulty: "Medium" },
  { id: 52, text: "CSS is awesome", punchline: "...when it's not Tuesday! 🎨", category: "CSS", icon: Sparkles, difficulty: "Easy" }
];

// 🎮 12 ENHANCED REALISTIC DEV SCENARIOS
const SCENARIOS = [
  {
    id: 1,
    title: "🌅 Day One: Legacy Hell",
    scene: "Your first day! The codebase: 10 years old, jQuery 1.4, no tests, and the last commit message is '// YOLO'...",
    difficulty: "Medium",
    choices: [
      { text: "🔥 'I'll rewrite EVERYTHING in React!'", consequence: "Manager pulls you aside: 'We need to talk about realistic expectations...' 😱", effects: { sanity: -20, respect: -30, coffee: +1, xp: 5 }, icon: Flame, mood: "😱" },
      { text: "📚 Spend a week reading code", consequence: "Found a file named 'god.js'. Comment: '// Abandon hope all ye who enter here' 🙏", effects: { sanity: -10, respect: +10, coffee: +2, xp: 15 }, icon: FileCode, mood: "🤓" },
      { text: "☕ Befriend the senior devs", consequence: "Best decision ever! They share war stories AND coffee spots! 😎", effects: { sanity: +15, respect: +15, coffee: +5, xp: 20 }, icon: Coffee, mood: "😎" }
    ]
  },
  {
    id: 2,
    title: "🚨 3 AM: Production Apocalypse",
    scene: "Phone EXPLODES with alerts. Users can't login. CEO texted in ALL CAPS. Your cat judges you from the doorway...",
    difficulty: "Hard",
    choices: [
      { text: "🏃 Hero mode: Debug NOW", consequence: "Found it! Typo in ENV file. Someone wrote DATABSE_URL. You're a legend! 🦸", effects: { sanity: -15, respect: +50, coffee: +3, xp: 50 }, icon: Rocket, mood: "🦸" },
      { text: "🔄 Panic rollback", consequence: "Crisis averted! But...why did it break? *Adds to TODO list* 😰", effects: { sanity: -5, respect: +25, coffee: +2, xp: 25 }, icon: GitCommit, mood: "😰" },
      { text: "📞 'Did you clear cache?'", consequence: "IT Crowd solution WORKED! Sometimes the classics win! 🙃", effects: { sanity: +10, respect: -10, coffee: +1, xp: 10 }, icon: Wrench, mood: "🙃" }
    ]
  },
  {
    id: 3,
    title: "👨‍💻 Code Review: The Reckoning",
    scene: "Your magnum opus: 847 lines, 23 files changed, 3 weeks of work. Reviewer: 'Where are the tests?' 💀",
    difficulty: "Hard",
    choices: [
      { text: "✅ Write 100% test coverage", consequence: "Tests pass! PR now 1500 lines. Reviewer: 'Can you split this into 12 PRs?' 🤦", effects: { sanity: -25, respect: +60, coffee: +5, xp: 60 }, icon: CheckCircle, mood: "🤦" },
      { text: "🎯 'it.todo()' everywhere", consequence: "'I'll add tests later' ...You won't. Nobody does. 😬", effects: { sanity: -5, respect: -30, coffee: +1, xp: 5 }, icon: Code2, mood: "😬" },
      { text: "💬 'Manual testing counts, right?'", consequence: "Surprisingly approved! Reviewer was on vacation mode! 😈", effects: { sanity: +15, respect: -40, coffee: +2, xp: 15 }, icon: GitBranch, mood: "😈" }
    ]
  },
  {
    id: 4,
    title: "🐛 The Heisenbug",
    scene: "Bug appears randomly. Can't reproduce it. QA swears they saw it. DevOps blames your code. Reality is an illusion...",
    difficulty: "Extreme",
    choices: [
      { text: "🔍 Science mode: Add logging", consequence: "10,000 console.logs later... Found it! Race condition! You're Sherlock Holmes! 🕵️", effects: { sanity: -20, respect: +70, coffee: +6, xp: 80 }, icon: Eye, mood: "🕵️" },
      { text: "💾 'Cannot reproduce = didn't happen'", consequence: "QA escalates to CTO. CTO reproduces it instantly. You: '...' 🤡", effects: { sanity: -40, respect: -60, coffee: +3, xp: 5 }, icon: Laptop, mood: "🤡" },
      { text: "🐳 'Let's just restart everything'", consequence: "Bug disappears! Nobody knows why. Move on? Move on. 🤷", effects: { sanity: -15, respect: +20, coffee: +4, xp: 30 }, icon: Shield, mood: "🤷" }
    ]
  },
  {
    id: 5,
    title: "🎨 'Just A Button'",
    scene: "PM at 4:45 PM Friday: 'Super quick - just add a button!' *You know the truth* 😤",
    difficulty: "Medium",
    choices: [
      { text: "⚡ YOLO: Ship in 20 min", consequence: "Button works! Also broke checkout, auth, and analytics. Oops! 🤦", effects: { sanity: -30, respect: -30, coffee: +2, xp: 10 }, icon: Zap, mood: "🤦" },
      { text: "📝 Write proper spec", consequence: "'This button needs: Auth, Analytics, A/B, Accessibility, i18n, dark mode...' PM backs away slowly 😤", effects: { sanity: -10, respect: +50, coffee: +3, xp: 40 }, icon: FileCode, mood: "😤" },
      { text: "🎨 Make it PERFECT", consequence: "4 hours on button shadow. Designer cries happy tears. PM asks where the button is 🎨", effects: { sanity: -25, respect: +25, coffee: +7, xp: 35 }, icon: Sparkles, mood: "🎨" }
    ]
  },
  {
    id: 6,
    title: "⏰ Friday 4:55 PM",
    scene: "Weekend calls. Beach awaits. Email: 'Critical hotfix for Monday demo - need it by EOD' 🏖️💀",
    difficulty: "Extreme",
    choices: [
      { text: "🏃 Stay and save the day", consequence: "Fixed at midnight. Monday: Demo postponed. Your soul has left the chat 💀", effects: { sanity: -50, respect: +40, coffee: +12, xp: 50 }, icon: Trophy, mood: "💀" },
      { text: "📧 'First thing Monday!'", consequence: "Weekend saved! Boss subtly remembers forever. Worth it? Yes. 😌", effects: { sanity: +30, respect: -20, coffee: 0, xp: 20 }, icon: Smile, mood: "😌" },
      { text: "🔥 Deploy without testing", consequence: "Deployed at 5:02 PM! Saturday 2 AM: *Everything is on fire* ☠️", effects: { sanity: -70, respect: -50, coffee: +20, xp: 15 }, icon: Flame, mood: "☠️" }
    ]
  },
  {
    id: 7,
    title: "📜 Ancient Scrolls",
    scene: "Open legacy file: 2500 lines, 63 nested ifs, variables: x, xx, xxx. Author: 'God'. Left in 2017.",
    difficulty: "Hard",
    choices: [
      { text: "🎯 Refactor everything", consequence: "Day 4: Finally understand why it was THIS way. Complexity was necessary. Mind = Blown 🤯", effects: { sanity: -40, respect: +30, coffee: +10, xp: 70 }, icon: Brain, mood: "🤯" },
      { text: "📝 Add THE comment", consequence: "'// TODO: Refactor this' - Welcome to the tradition. Developers unite! 😂", effects: { sanity: +10, respect: -5, coffee: +1, xp: 10 }, icon: FileCode, mood: "😂" },
      // ... (CONTINUING FROM PART 1)

  { text: "🙈 Close file, forget it exists", consequence: "File? What file? We don't talk about that code. Ever. 🙈", effects: { sanity: +20, respect: -15, coffee: +2, xp: 15 }, icon: XCircle, mood: "🙈" }
    ]
  },
  {
    id: 8,
    title: "⚔️ Merge Conflict Wars",
    scene: "Your branch: 127 commits behind. 94 merge conflicts. Git says: 'Good luck'. Your IDE crashes just looking at it.",
    difficulty: "Extreme",
    choices: [
      { text: "⚔️ Resolve EVERY conflict manually", consequence: "5 hours later: Done! But...what does your code do again? Memory wiped 🧟", effects: { sanity: -50, respect: +60, coffee: +15, xp: 90 }, icon: GitBranch, mood: "🧟" },
      { text: "🔥 Delete branch, start fresh", consequence: "3 days of work: GONE. But hey, clean slate! Tomorrow's problem! 😭", effects: { sanity: -35, respect: -30, coffee: +8, xp: 20 }, icon: Flame, mood: "😭" },
      { text: "🎲 'Accept current changes' YOLO", consequence: "Git roulette! Tests pass somehow. Ship it before anyone notices! 🎰", effects: { sanity: -25, respect: -40, coffee: +5, xp: 25 }, icon: Dice5, mood: "🎰" }
    ]
  },
  {
    id: 9,
    title: "📱 Mobile-First Panic",
    scene: "CEO sees the site on mobile: 'Everything is broken!' You: 'It works on desktop...' CEO: *Stares silently* 😬",
    difficulty: "Medium",
    choices: [
      { text: "📱 Emergency responsive design", consequence: "48 hours of media queries later: Perfect! CEO: 'Looks the same as before...' 😤", effects: { sanity: -30, respect: +40, coffee: +8, xp: 55 }, icon: Laptop, mood: "😤" },
      { text: "🎨 'It's a feature, not a bug'", consequence: "Marketing: 'Desktop-first experience!' CEO buys it. You: *Internal screaming* 😅", effects: { sanity: -10, respect: -20, coffee: +3, xp: 15 }, icon: Sparkles, mood: "😅" },
      { text: "💻 'Please rotate your phone'", consequence: "Users: *Confused confusion* App rating drops. Bold strategy! 📉", effects: { sanity: -20, respect: -35, coffee: +4, xp: 10 }, icon: AlertTriangle, mood: "📉" }
    ]
  },
  {
    id: 10,
    title: "☁️ Cloud Cost Catastrophe",
    scene: "AWS bill arrives: $47,000 for last month. You: 'We're a 5-person startup...' DevOps: *Sweating* 💸",
    difficulty: "Hard",
    choices: [
      { text: "🔍 Audit everything NOW", consequence: "Found the culprit: Test lambda running for 3 weeks straight. Crisis averted! 🕵️", effects: { sanity: -25, respect: +65, coffee: +7, xp: 75 }, icon: Eye, mood: "🕵️" },
      { text: "📧 'Surely this is a mistake?'", consequence: "AWS Support: 'No mistake. Pay up.' Startup bank account: *Sad noises* 💀", effects: { sanity: -40, respect: -25, coffee: +5, xp: 20 }, icon: CloudRain, mood: "💀" },
      { text: "🔥 Delete everything, start over", consequence: "No bill if there's no infrastructure! *Taps forehead* Also no product... 🤦", effects: { sanity: -60, respect: -70, coffee: +10, xp: 5 }, icon: Flame, mood: "🤦" }
    ]
  },
  {
    id: 11,
    title: "🎤 The Demo Gods",
    scene: "Investor demo in 5 minutes. Works perfectly in staging. Production: 'Error 500'. Demo gods laugh at your pain.",
    difficulty: "Extreme",
    choices: [
      { text: "🏃 Fix it DURING demo", consequence: "Live debugging while talking! Somehow works! Investors impressed by 'transparency'! 🦸", effects: { sanity: -45, respect: +80, coffee: +10, xp: 100 }, icon: Rocket, mood: "🦸" },
      { text: "📱 'Mobile version is better'", consequence: "Mobile: Also broken. *Awkward silence* You: 'Questions?' 😰", effects: { sanity: -55, respect: -40, coffee: +6, xp: 15 }, icon: Laptop, mood: "😰" },
      { text: "🎭 'Let me show you the VISION'", consequence: "PowerPoint saves the day! No demo needed. Vaporware ftw! 😎", effects: { sanity: -15, respect: +20, coffee: +4, xp: 30 }, icon: Sparkles, mood: "😎" }
    ]
  },
  {
    id: 12,
    title: "🎓 The Junior Dev",
    scene: "New junior dev's PR: Rewrote core auth. Tests pass. Code works. Also...used eval() 47 times. WHAT DO YOU DO?",
    difficulty: "Hard",
    choices: [
      { text: "📚 Teach them properly", consequence: "2-hour pairing session. Junior learns. You feel fulfilled! Teaching > Coding! 🤓", effects: { sanity: +10, respect: +50, coffee: +3, xp: 60 }, icon: Lightbulb, mood: "🤓" },
      { text: "🔥 Reject with 'NEVER AGAIN'", consequence: "Junior quits. Boss asks why. You show the eval(). Boss understands. 😤", effects: { sanity: -15, respect: -20, coffee: +2, xp: 20 }, icon: XCircle, mood: "😤" },
      { text: "✅ 'LGTM' and merge", consequence: "One week later: Security breach. You: 'How could this happen?' 🤡", effects: { sanity: -70, respect: -80, coffee: +15, xp: 5 }, icon: Flame, mood: "🤡" }
    ]
  }
];

// 🏆 ACHIEVEMENTS SYSTEM
const ACHIEVEMENTS = [
  { id: "first_joke", name: "First Laugh", icon: Sparkles, description: "Saw your first joke!", xp: 10 },
  { id: "joke_lover", name: "Joke Connoisseur", icon: Heart, description: "Loved 10 jokes!", xp: 50 },
  { id: "joke_master", name: "Comedy Master", icon: Crown, description: "Loved 25 jokes!", xp: 100 },
  { id: "survivor", name: "Survivor", icon: Trophy, description: "Completed the game!", xp: 200 },
  { id: "perfectionist", name: "Perfectionist", icon: Star, description: "Finished with 100% sanity!", xp: 500 },
  { id: "caffeine_king", name: "Caffeine King", icon: Coffee, description: "Drank 50+ coffees in one run!", xp: 100 },
  { id: "respected", name: "Team Legend", icon: Trophy, description: "Reached 80+ respect!", xp: 150 },
  { id: "burnout", name: "Burnout Speedrun", icon: Flame, description: "Lost all sanity in under 5 scenarios", xp: 50 }
];

export default function DevLifePage() {
  const [mode, setMode] = useState("menu");
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [likedJokes, setLikedJokes] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [stats, setStats] = useState({ sanity: 100, respect: 50, coffee: 0, day: 1, xp: 0, level: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showConsequence, setShowConsequence] = useState(false);
  const [lastChoice, setLastChoice] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);

  const [confetti, setConfetti] = useState([]);
  const [slotRolling, setSlotRolling] = useState(false);

  const currentJoke = JOKES_DATABASE[currentJokeIndex];
  const scenario = SCENARIOS[currentScenario];

  const categories = ["All", ...new Set(JOKES_DATABASE.map(j => j.category))];
  const filteredJokes = selectedCategory === "All" ? JOKES_DATABASE : JOKES_DATABASE.filter(j => j.category === selectedCategory);

  const triggerConfetti = () => {
    const particles = Array.from({ length: 100 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)],
      size: Math.random() * 10 + 5
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4000);
  };

  const unlockAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      setAchievements([...achievements, achievementId]);
      setShowAchievement(achievement);
      setStats(prev => ({ ...prev, xp: prev.xp + achievement.xp }));
      triggerConfetti();
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  useEffect(() => {
    if (mode === "game") {
      if (stats.sanity <= 0) {
        setGameOver(true);
        setVictory(false);
        if (currentScenario < 5) unlockAchievement("burnout");
      } else if (currentScenario >= SCENARIOS.length) {
        setGameOver(true);
        setVictory(true);
        unlockAchievement("survivor");
        if (stats.sanity === 100) unlockAchievement("perfectionist");
        if (stats.coffee >= 50) unlockAchievement("caffeine_king");
        if (stats.respect >= 80) unlockAchievement("respected");
        triggerConfetti();
      }
    }
  }, [stats, currentScenario, mode]);

  useEffect(() => {
    if (likedJokes.length === 1) unlockAchievement("first_joke");
    if (likedJokes.length === 10) unlockAchievement("joke_lover");
    if (likedJokes.length === 25) unlockAchievement("joke_master");
  }, [likedJokes]);

  const handleChoice = (choice) => {
    setLastChoice(choice);
    setShowConsequence(true);
    
    const newStats = {
      sanity: Math.max(0, Math.min(100, stats.sanity + choice.effects.sanity)),
      respect: Math.max(0, Math.min(100, stats.respect + choice.effects.respect)),
      coffee: stats.coffee + choice.effects.coffee,
      day: stats.day + 1,
      xp: stats.xp + choice.effects.xp,
      level: Math.floor((stats.xp + choice.effects.xp) / 100) + 1
    };
    setStats(newStats);

    setTimeout(() => {
      setShowConsequence(false);
      setCurrentScenario(currentScenario + 1);
      setLastChoice(null);
    }, 3500);
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setStats({ sanity: 100, respect: 50, coffee: 0, day: 1, xp: 0, level: 1 });
    setGameOver(false);
    setVictory(false);
    setShowConsequence(false);
    setLastChoice(null);
  };

  const randomJoke = () => {
    const newIndex = Math.floor(Math.random() * filteredJokes.length);
    setCurrentJokeIndex(JOKES_DATABASE.indexOf(filteredJokes[newIndex]));
    setShowPunchline(false);
  };

  const slotMachine = () => {
    setSlotRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setCurrentJokeIndex(Math.floor(Math.random() * JOKES_DATABASE.length));
      count++;
      if (count > 20) {
        clearInterval(interval);
        setSlotRolling(false);
        setShowPunchline(false);
      }
    }, 100);
  };

  const likeJoke = () => {
    if (!likedJokes.includes(currentJokeIndex)) {
      setLikedJokes([...likedJokes, currentJokeIndex]);
      triggerConfetti();
    }
  };

  const shareJoke = () => {
    if (navigator.share) {
      navigator.share({
        title: "Dev Joke 😂",
        text: `${currentJoke.text}\n\n${currentJoke.punchline}\n\nFrom: Dev Life Simulator by Shubham Tiwari`,
      });
    } else {
      navigator.clipboard.writeText(`${currentJoke.text}\n\n${currentJoke.punchline}`);
      alert("Copied to clipboard! 📋");
    }
  };

 // MENU MODE (Enhanced with Feature Banner)
if (mode === "menu") {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const SARCASTIC_FEATURES = [
    { text: "It's not a bug", subtext: "It's an undocumented feature! 🐛✨", icon: Bug },
    { text: "It's not a crash", subtext: "It's a surprise restart! 💥🔄", icon: AlertTriangle },
    { text: "It's not slow", subtext: "It's giving you time to think! 🐢💭", icon: Clock },
    { text: "It's not broken", subtext: "It's just differently functional! 🔨🎨", icon: Wrench },
    { text: "It's not a memory leak", subtext: "It's RAM appreciation day! 💾🎉", icon: Server },
    { text: "It's not unresponsive", subtext: "It's meditation mode! 🧘‍♂️⏳", icon: Loader },
    { text: "It's not outdated", subtext: "It's vintage code! 📼👴", icon: Package },
    { text: "It's not spaghetti code", subtext: "It's Italian architecture! 🍝🏛️", icon: Code2 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % SARCASTIC_FEATURES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const feature = SARCASTIC_FEATURES[currentFeature];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} 
          className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, delay: 4 }} 
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl" />
      </div>

      {/* FEATURE BANNER - SARCASM ALERT! */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-20 overflow-hidden"
      >
        <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-4 px-4">
          {/* Animated stripe pattern */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-black to-transparent"
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-1">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">
                  {feature.text}
                </h3>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <p className="text-sm md:text-base text-white/90 font-semibold">
                {feature.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/50" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/50" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/50" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/50" />
        </div>

        {/* Animated dots indicator */}
        <div className="flex justify-center gap-2 py-2 bg-black/20">
          {SARCASTIC_FEATURES.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: currentFeature === index ? 1.2 : 1,
                opacity: currentFeature === index ? 1 : 0.3
              }}
              className={`w-2 h-2 rounded-full ${
                currentFeature === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="max-w-5xl w-full relative z-10 mt-32">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-12">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Code2 className="w-28 h-28 mx-auto mb-6 text-purple-400" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Dev Life
          </h1>
          <p className="text-2xl md:text-3xl text-white/80 mb-2">Simulator 2025</p>
          <p className="text-lg text-white/60">Choose Your Developer Adventure!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.button onClick={() => setMode("jokes")} whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:p-10 rounded-3xl border-2 border-white/20 hover:border-white/40 transition-all group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <Sparkles className="w-20 h-20 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <h2 className="text-4xl font-black mb-3">Jokes & Puns</h2>
              <p className="text-white/90 text-lg mb-4">52 hilarious developer jokes & sarcasm</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">🎭 Jokes</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">😂 Sarcasm</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">🎰 Slot Machine</span>
              </div>
            </div>
          </motion.button>

          <motion.button onClick={() => setMode("game")} whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-br from-pink-600 to-purple-600 p-8 md:p-10 rounded-3xl border-2 border-white/20 hover:border-white/40 transition-all group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/20 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <Rocket className="w-20 h-20 mx-auto mb-4 group-hover:translate-y-[-12px] transition-transform" />
              <h2 className="text-4xl font-black mb-3">Career Mode</h2>
              <p className="text-white/90 text-lg mb-4">12 realistic scenarios + achievements</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">🎮 Story</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">📊 Stats</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">🏆 XP System</span>
              </div>
            </div>
          </motion.button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-3xl font-black">52</p>
              <p className="text-sm text-white/60">Jokes</p>
            </div>
            <div>
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-3xl font-black">12</p>
              <p className="text-sm text-white/60">Scenarios</p>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 text-pink-400" />
              <p className="text-3xl font-black">8</p>
              <p className="text-sm text-white/60">Achievements</p>
            </div>
            <div>
              <Star className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <p className="text-3xl font-black">∞</p>
              <p className="text-sm text-white/60">Fun</p>
            </div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} 
          className="mt-6 text-center text-white/50 text-sm">
          💜 Crafted with love, coffee & bugs by Shubham Tiwari
        </motion.p>
      </div>
    </div>
  );
}


  // JOKES MODE (Continue next message due to length...)
  if (mode === "jokes") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white py-12 px-4 relative overflow-hidden">
        <AnimatePresence>
          {confetti.map((particle) => (
            <motion.div key={particle.id} 
              initial={{ x: `${particle.x}vw`, y: particle.y, opacity: 1, rotate: 0, scale: 1 }}
              animate={{ y: '110vh', rotate: particle.rotation, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeIn" }}
              className="absolute rounded-sm pointer-events-none"
              style={{ width: particle.size, height: particle.size, backgroundColor: particle.color }}
            />
          ))}
        </AnimatePresence>

        {showAchievement && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-2xl border-2 border-white/40 shadow-2xl">
            <div className="flex items-center gap-3">
              <showAchievement.icon className="w-8 h-8" />
              <div>
                <p className="font-black text-lg">Achievement Unlocked!</p>
                <p className="text-sm">{showAchievement.name} (+{showAchievement.xp} XP)</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.button onClick={() => setMode("menu")} 
            className="mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Menu
          </motion.button>

          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              <currentJoke.icon className="w-20 h-20 mx-auto mb-4 text-purple-400" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Dev Jokes
            </h1>
            <p className="text-xl text-white/70">
              {likedJokes.length} / {JOKES_DATABASE.length} Loved ❤️ | Level {Math.floor(stats.xp / 100) + 1}
            </p>
          </motion.div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentJokeIndex(0); setShowPunchline(false); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-5 py-2 rounded-full font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}>
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentJokeIndex} initial={{ opacity: 0, scale: 0.9, rotateY: -90 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12 mb-6 relative overflow-hidden">
              
              <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentJoke.difficulty === 'Easy' ? 'bg-green-600/80' : 
                  currentJoke.difficulty === 'Medium' ? 'bg-yellow-600/80' : 'bg-red-600/80'
                }`}>
                  {currentJoke.difficulty}
                </span>
                <span className="px-3 py-1 bg-purple-600/50 rounded-full text-xs font-bold">{currentJoke.category}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight pr-32">{currentJoke.text}</h2>

              {!showPunchline ? (
                <motion.button onClick={() => setShowPunchline(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl shadow-lg">
                  Show Punchline 🤔
                </motion.button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
                    <p className="text-2xl md:text-4xl font-bold text-purple-300 leading-relaxed">{currentJoke.punchline}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <motion.button onClick={likeJoke} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        likedJokes.includes(currentJokeIndex) 
                          ? 'bg-pink-600 shadow-lg shadow-pink-500/50' 
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}>
                      <Heart className={`w-5 h-5 ${likedJokes.includes(currentJokeIndex) ? 'fill-white' : ''}`} />
                      {likedJokes.includes(currentJokeIndex) ? 'Loved!' : 'Love it!'}
                    </motion.button>

                    <motion.button onClick={shareJoke} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                      className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2">
                      <Share2 className="w-5 h-5" /> Share
                    </motion.button>

                    <motion.button onClick={randomJoke} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                      className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2">
                      <Dice5 className="w-5 h-5" /> Random
                    </motion.button>

                    <motion.button onClick={slotMachine} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} disabled={slotRolling}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                      <Sparkles className={`w-5 h-5 ${slotRolling ? 'animate-spin' : ''}`} /> 
                      {slotRolling ? 'Rolling...' : 'Slot Machine'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mb-6">
            <motion.button onClick={() => { 
              const prevIndex = filteredJokes.indexOf(currentJoke) - 1;
              setCurrentJokeIndex(JOKES_DATABASE.indexOf(filteredJokes[prevIndex >= 0 ? prevIndex : filteredJokes.length - 1]));
              setShowPunchline(false);
            }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white/10 border border-white/20 hover:bg-white/20 rounded-full flex items-center justify-center">
              <ChevronRight className="w-7 h-7 rotate-180" />
            </motion.button>

            <span className="text-white/60 font-bold text-lg">
              {filteredJokes.indexOf(currentJoke) + 1} / {filteredJokes.length}
            </span>

            <motion.button onClick={() => { 
              const nextIndex = filteredJokes.indexOf(currentJoke) + 1;
              setCurrentJokeIndex(JOKES_DATABASE.indexOf(filteredJokes[nextIndex < filteredJokes.length ? nextIndex : 0]));
              setShowPunchline(false);
            }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white/10 border border-white/20 hover:bg-white/20 rounded-full flex items-center justify-center">
              <ChevronRight className="w-7 h-7" />
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold">{JOKES_DATABASE.length}</p>
              <p className="text-sm text-white/60">Total Jokes</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-pink-400 fill-pink-400" />
              <p className="text-2xl font-bold">{likedJokes.length}</p>
              <p className="text-sm text-white/60">Loved</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold">{achievements.length}</p>
              <p className="text-sm text-white/60">Achievements</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <p className="text-2xl font-bold">{Math.floor((likedJokes.length / JOKES_DATABASE.length) * 100)}%</p>
              <p className="text-sm text-white/60">Happiness</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GAME MODE - Game Over Screen
  if (gameOver) {
    const getEndingMessage = () => {
      if (victory) {
        if (stats.coffee > 50 && stats.sanity > 70) return "🏆 LEGENDARY DEVELOPER! Coffee + Sanity = Perfection!";
        if (stats.coffee > 60) return "☕ CAFFEINE OVERLORD! Your blood type is now Java!";
        if (stats.sanity > 80) return "🧘 ZEN MASTER! You've achieved developer enlightenment!";
        if (stats.respect > 80) return "👑 TEAM LEGEND! Everyone wants to work with you!";
        return "🎉 SURVIVOR! You made it through the chaos!";
      }
      return "💀 BURNOUT ACHIEVED! Time to touch grass...";
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatePresence>
          {confetti.map((particle) => (
            <motion.div key={particle.id} 
              initial={{ x: `${particle.x}vw`, y: particle.y, opacity: 1 }}
              animate={{ y: '110vh', opacity: 0 }}
              className="absolute rounded-sm" style={{ width: particle.size, height: particle.size, backgroundColor: particle.color }} />
          ))}
        </AnimatePresence>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} 
          className="max-w-3xl w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12 text-center">
          <motion.div animate={{ rotate: victory ? [0, 360] : 0, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            {victory ? <Trophy className="w-28 h-28 mx-auto mb-6 text-yellow-400" /> : <Flame className="w-28 h-28 mx-auto mb-6 text-red-400" />}
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{getEndingMessage()}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <Brain className="w-10 h-10 mx-auto mb-2 text-purple-400" />
              <p className="text-3xl font-bold">{stats.sanity}%</p>
              <p className="text-sm text-white/60">Sanity</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <Trophy className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
              <p className="text-3xl font-bold">{stats.respect}%</p>
              <p className="text-sm text-white/60">Respect</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <Coffee className="w-10 h-10 mx-auto mb-2 text-amber-400" />
              <p className="text-3xl font-bold">{stats.coffee}</p>
              <p className="text-sm text-white/60">Coffees</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <Star className="w-10 h-10 mx-auto mb-2 text-cyan-400" />
              <p className="text-3xl font-bold">{stats.xp}</p>
              <p className="text-sm text-white/60">XP Earned</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button onClick={resetGame} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg">
              <RotateCcw className="w-6 h-6" /> Try Again
            </motion.button>

            <motion.button onClick={() => { setMode("menu"); resetGame(); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-bold text-lg flex items-center gap-3">
              Main Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // GAME MODE - Playing
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0a1f] via-[#1e1b4b] to-[#2e1065] text-white py-12 px-4 relative overflow-hidden">
      {showAchievement && (
        <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-2xl border-2 border-white/40 shadow-2xl">
          <div className="flex items-center gap-3">
            <showAchievement.icon className="w-8 h-8" />
            <div>
              <p className="font-black text-lg">Achievement!</p>
              <p className="text-sm">{showAchievement.name} (+{showAchievement.xp} XP)</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button onClick={() => setMode("menu")} 
          className="mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back
        </motion.button>

        {/* Enhanced Stats Bar */}
        <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className={`w-5 h-5 ${stats.sanity >= 70 ? 'text-green-400' : stats.sanity >= 30 ? 'text-yellow-400' : 'text-red-400'}`} />
                  <span className="font-bold text-sm">Sanity</span>
                </div>
                <span className="font-bold">{stats.sanity}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${stats.sanity}%` }} 
                  className={`h-full ${stats.sanity >= 70 ? 'bg-green-500' : stats.sanity >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className={`w-5 h-5 ${stats.respect >= 70 ? 'text-green-400' : stats.respect >= 30 ? 'text-yellow-400' : 'text-red-400'}`} />
                  <span className="font-bold text-sm">Respect</span>
                </div>
                <span className="font-bold">{stats.respect}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${stats.respect}%` }} 
                  className={`h-full ${stats.respect >= 70 ? 'bg-green-500' : stats.respect >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Coffee className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-2xl font-black">{stats.coffee}</p>
                <p className="text-xs text-white/60">Coffees</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-2xl font-black">Day {stats.day}</p>
                <p className="text-xs text-white/60">Survived</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-2xl font-black">Lv.{stats.level}</p>
                <p className="text-xs text-white/60">{stats.xp} XP</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scenario Card */}
        <AnimatePresence mode="wait">
          {!showConsequence ? (
            <motion.div key={scenario.id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
              className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12">
              
              <div className="text-center mb-8">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  scenario.difficulty === 'Medium' ? 'bg-yellow-600/80' :
                  scenario.difficulty === 'Hard' ? 'bg-orange-600/80' : 'bg-red-600/80'
                }`}>
                  {scenario.difficulty} Difficulty
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-4">{scenario.title}</h2>
                <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6" />
                <div className="bg-black/30 border border-white/10 rounded-2xl p-6 md:p-8">
                  <p className="text-xl md:text-3xl leading-relaxed">{scenario.scene}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {scenario.choices.map((choice, index) => (
                  <motion.button key={index} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }} whileTap={{ scale: 0.98 }} onClick={() => handleChoice(choice)}
                    className="bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-purple-500/50 rounded-2xl p-6 text-left transition-all group">
                    <div className="flex items-start gap-4">
                      <choice.icon className="w-10 h-10 text-purple-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xl md:text-2xl font-bold mb-3">{choice.text}</p>
                        <div className="flex flex-wrap gap-3 text-sm font-semibold">
                          {choice.effects.sanity !== 0 && (
                            <span className={`px-3 py-1 rounded-full ${choice.effects.sanity > 0 ? 'bg-green-600/80 text-green-100' : 'bg-red-600/80 text-red-100'}`}>
                              🧠 {choice.effects.sanity > 0 ? '+' : ''}{choice.effects.sanity}
                            </span>
                          )}
                          {choice.effects.respect !== 0 && (
                            <span className={`px-3 py-1 rounded-full ${choice.effects.respect > 0 ? 'bg-green-600/80 text-green-100' : 'bg-red-600/80 text-red-100'}`}>
                              🏆 {choice.effects.respect > 0 ? '+' : ''}{choice.effects.respect}
                            </span>
                          )}
                          {choice.effects.coffee > 0 && (
                            <span className="px-3 py-1 rounded-full bg-amber-600/80 text-amber-100">
                              ☕ +{choice.effects.coffee}
                            </span>
                          )}
                          {choice.effects.xp > 0 && (
                            <span className="px-3 py-1 rounded-full bg-purple-600/80 text-purple-100">
                              ⭐ +{choice.effects.xp} XP
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">{choice.mood}</span>
                        <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-white/60 font-semibold whitespace-nowrap">
                  Scenario {currentScenario + 1} / {SCENARIOS.length}
                </span>
                <div className="h-3 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${((currentScenario + 1) / SCENARIOS.length) * 100}%` }} 
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="consequence" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white/40 rounded-3xl p-8 md:p-12 text-center">
              <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <lastChoice.icon className="w-28 h-28 mx-auto mb-6" />
              </motion.div>
              <span className="text-6xl mb-4 block">{lastChoice.mood}</span>
              <h3 className="text-4xl font-black mb-6">CONSEQUENCE:</h3>
              <p className="text-2xl md:text-4xl font-bold leading-tight">{lastChoice.consequence}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
 