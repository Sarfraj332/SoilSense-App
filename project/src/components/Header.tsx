import React from 'react';
import { Sprout, History } from 'lucide-react';

export default function Header({ onHistoryClick }: { onHistoryClick: () => void }) {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50 to-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sprout className="w-8 h-8 text-teal-600" />
          <span className="text-2xl font-bold text-teal-900">SoilSense</span>
        </div>
        <nav className="flex items-center space-x-8">
          <button
            onClick={onHistoryClick}
            className="group flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-white border border-teal-200 hover:border-teal-400 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <History className="w-5 h-5 text-teal-600 group-hover:animate-pulse" />
            <span className="text-teal-700 group-hover:text-teal-800 font-medium">History</span>
          </button>
          <a 
            href="#about" 
            className="text-teal-600 hover:text-teal-800 transition-colors font-medium"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}