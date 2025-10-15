"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-screen min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900"
      >
        {/* Page transition - Enter animation */}
        <motion.div
          className="h-screen w-screen fixed bg-gradient-to-br from-purple-900 via-black to-gray-900 rounded-b-[100px] z-40 top-0 left-0"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Page title animation */}
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-4xl sm:text-6xl md:text-8xl cursor-default z-50 w-fit h-fit font-bold"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 capitalize">
            {pathName === "/" ? "Home" : pathName.substring(1)}
          </span>
        </motion.div>

        {/* Page transition - Exit animation */}
        <motion.div
          className="h-screen w-screen fixed bg-gradient-to-br from-purple-900 via-black to-gray-900 rounded-t-[100px] bottom-0 z-30 left-0"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />

        {/* NAVBAR - ALWAYS VISIBLE (z-50 keeps it on top) */}
        <div className="fixed .sw z-50">
          <Navbar />
        </div>

        {/* Content area with navbar spacing */}
        <div className="relative z-10 pt-16 md:pt-20">
          {children}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
