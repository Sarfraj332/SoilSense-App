import React from 'react';
import { Sprout, History } from 'lucide-react';

export default function Header({ onHistoryClick }: { onHistoryClick: () => void }) {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sprout className="w-8 h-8 text-green-600" />
          <span className="text-xl font-bold text-gray-900">SoilSense</span>
        </div>
        <nav className="flex items-center space-x-8">
          <button
            onClick={onHistoryClick}
            className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-green-200 hover:border-green-400 transition-all duration-300"
          >
            <History className="w-5 h-5 text-green-600 group-hover:animate-pulse" />
            <span className="text-gray-700 group-hover:text-green-600 transition-colors">History</span>
          </button>
          <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}