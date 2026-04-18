'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function UploadZone({ onFile }: { onFile: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('File size must be under 20MB');
      return;
    }

    setError(null);
    setFile(file);

    // fake loading (simulate AI processing)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onFile(file);
    }, 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >

      {/* 📦 MAIN BOX */}
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={e => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        className={`
          group relative flex flex-col items-center justify-center 
          rounded-3xl px-12 py-24 cursor-pointer 
          bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl 
          border border-white/30 dark:border-gray-700
          shadow-lg transition-all duration-300
          ${drag ? 'scale-105 shadow-2xl border-indigo-500' : 'hover:scale-105 hover:shadow-2xl'}
        `}
      >

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {/* ✨ Glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-indigo-200/20 to-pink-200/20" />

        {/* 🧠 STATES */}

        {/* ✅ EMPTY STATE */}
        {!file && !loading && (
          <>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              📄
            </motion.div>

            <p className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              Drop your PDF here
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              or click to upload (max 20MB)
            </p>
          </>
        )}

        {/* ⏳ LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300">
              Processing your PDF...
            </p>
          </div>
        )}

        {/* 📄 FILE PREVIEW */}
        {file && !loading && (
          <div className="flex flex-col items-center text-center">

            <div className="text-5xl mb-4">📄</div>

            <p className="font-semibold text-gray-800 dark:text-white">
              {file.name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Remove file
            </button>

          </div>
        )}

        {/* Drag Badge */}
        {drag && (
          <div className="absolute top-4 right-4 text-xs bg-indigo-500 text-white px-3 py-1 rounded-full shadow">
            Drop now
          </div>
        )}
      </div>

      {/* ❌ Error */}
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">
          {error}
        </p>
      )}

    </motion.div>
  );
}