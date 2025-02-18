import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  recommendation: string;
}

const statusColors = {
  good: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  critical: 'bg-rose-100 text-rose-800 border-rose-200'
};

const statusGradients = {
  good: 'from-emerald-50 to-teal-50',
  warning: 'from-amber-50 to-yellow-50',
  critical: 'from-rose-50 to-red-50'
};

export default function AnalysisCard({ title, value, unit, status, recommendation }: AnalysisCardProps) {
  return (
    <div className="group relative h-64 perspective-1000">
      <div className="absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className={`absolute w-full h-full bg-gradient-to-br ${statusGradients[status]} rounded-xl shadow-lg p-6 backface-hidden border border-opacity-20 ${status === 'good' ? 'border-emerald-200' : status === 'warning' ? 'border-amber-200' : 'border-rose-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <Leaf className={`w-5 h-5 ${status === 'good' ? 'text-emerald-600' : status === 'warning' ? 'text-amber-600' : 'text-rose-600'}`} />
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-900">{value}</span>
            <span className="ml-1 text-gray-600">{unit}</span>
          </div>
          <div className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        {/* Back */}
        <div className={`absolute w-full h-full bg-gradient-to-br ${statusGradients[status]} rounded-xl shadow-lg p-6 backface-hidden rotate-y-180 border border-opacity-20 ${status === 'good' ? 'border-emerald-200' : status === 'warning' ? 'border-amber-200' : 'border-rose-200'}`}>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendation</h4>
          <p className="text-gray-600">{recommendation}</p>
          <div className="absolute bottom-6 right-6">
            <ArrowRight className={`w-5 h-5 ${status === 'good' ? 'text-emerald-600' : status === 'warning' ? 'text-amber-600' : 'text-rose-600'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}