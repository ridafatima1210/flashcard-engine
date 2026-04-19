'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'Upload', href: '/upload', icon: '📂' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen fixed left-0 top-0 
    bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl 
    border-r border-white/30 dark:border-gray-700 
    p-6 flex flex-col justify-between">

      {/* 🔝 TOP */}
      <div>

        {/* 🔥 Logo */}
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            ⚡ Flashcard Engine
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Learn smarter, not harder
          </p>
        </div>

        {/* 📌 Nav */}
        <nav className="flex flex-col gap-2">
          {LINKS.map(link => {
            const active = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    relative flex items-center gap-3 px-4 py-2.5 rounded-xl
                    transition-all duration-300 cursor-pointer
                    ${
                      active
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800'
                    }
                  `}
                >

                  {/* 🔥 Active Indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-white rounded-r-full"></span>
                  )}

                  <span>{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="mt-6 space-y-4">

        {/* 💡 Future stats (optional) */}
        <div className="text-xs text-gray-400">
          <p>🔥 3 day streak</p>
          <p>🧠 120 cards learned</p>
        </div>

        {/* 🌙 Theme Toggle */}
        <ThemeToggle />
      </div>

    </div>
  );
}