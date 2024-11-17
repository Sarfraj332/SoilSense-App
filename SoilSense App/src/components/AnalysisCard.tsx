import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  recommendation: string;
}

const statusColors = {
  good: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  critical: 'bg-red-100 text-red-800'
};

export default function AnalysisCard({ title, value, unit, status, recommendation }: AnalysisCardProps) {
  return (
    <div className="group relative h-64 perspective-1000">
      <div className="absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-900">{value}</span>
            <span className="ml-1 text-gray-600">{unit}</span>
          </div>
          <div className={`mt-4 inline-block px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden rotate-y-180">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendation</h4>
          <p className="text-gray-600">{recommendation}</p>
          <div className="absolute bottom-6 right-6">
            <ArrowRight className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}