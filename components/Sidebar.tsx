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

      {/* Top */}
      <div>
        {/* Logo */}
        <h1 className="text-xl font-bold mb-10 tracking-tight">
          ⚡ Flashcard
        </h1>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          {LINKS.map(link => {
            const active = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-xl
                    transition-all duration-300 cursor-pointer
                    ${
                      active
                        ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <span>{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="mt-6">
        <ThemeToggle />
      </div>

    </div>
  );
}