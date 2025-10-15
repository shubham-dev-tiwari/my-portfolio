"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavLink = ({ link }) => {
  const pathName = usePathname();
  const isActive = pathName === link.url;

  return (
    <Link href={link.url}>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative px-4 py-2 rounded-lg cursor-pointer group
          transition-all duration-300
          ${isActive 
            ? "text-white bg-white/20 backdrop-blur-sm shadow-lg" 
            : "text-gray-300 hover:text-white"
          }
        `}
      >
        <div className="flex items-center gap-2 relative z-10 drop-shadow-md">
          {link.icon}
          <span className="font-medium">{link.title}</span>
        </div>
        
        {/* Hover effect for non-active links */}
        {!isActive && (
          <motion.div
            className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
          />
        )}
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg border border-white/20"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavLink;
