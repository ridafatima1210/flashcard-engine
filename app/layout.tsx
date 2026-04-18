import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Flashcard Engine',
  description: 'AI-powered flashcards with spaced repetition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans text-gray-900 dark:text-white`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >

          <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="ml-64 w-full min-h-screen relative overflow-hidden 
            bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#fdf2f8] 
            dark:from-gray-900 dark:via-gray-800 dark:to-black">

              {/* Glow */}
              <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-400 opacity-30 blur-3xl rounded-full"></div>
              <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-pink-400 opacity-30 blur-3xl rounded-full"></div>

              {/* Content */}
              <div className="relative z-10 p-8">
                {children}
              </div>

            </div>

          </div>

        </ThemeProvider>

      </body>
    </html>
  );
}