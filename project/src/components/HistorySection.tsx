import React from 'react';
import { Clock, Download } from 'lucide-react';
import { SoilAnalysis } from '../types/analysis';
import { generatePDF } from '../utils/pdfGenerator';

interface HistorySectionProps {
  analyses: SoilAnalysis[];
}

export default function HistorySection({ analyses }: HistorySectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Analysis History</h2>
        <Clock className="w-6 h-6 text-green-600" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  Analysis #{analysis.id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(analysis.date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => generatePDF(analysis)}
                className="p-2 text-green-600 hover:text-green-700 transition-colors"
                title="Download Report"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Key Findings:
                {analysis.primaryNutrients.map((nutrient, index) => (
                  <span
                    key={`${analysis.id}-${nutrient.name}-${index}`}
                    className={`ml-2 inline-block px-2 py-1 rounded-full text-xs
                      ${
                        nutrient.status === 'good'
                          ? 'bg-green-100 text-green-800'
                          : nutrient.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }
                    `}
                  >
                    {nutrient.name}: {nutrient.value}{nutrient.unit}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}