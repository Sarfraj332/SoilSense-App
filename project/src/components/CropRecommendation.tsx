import React from 'react';
import { Flower2, Sprout } from 'lucide-react';
import type { SoilAnalysis } from '../types/analysis';

interface CropRecommendationProps {
  analysis: SoilAnalysis;
}

export default function CropRecommendation({ analysis }: CropRecommendationProps) {
  const getCropSuggestions = (analysis: SoilAnalysis) => {
    const pH = analysis.physicalProperties.find(prop => prop.name === 'pH Level')?.value || 7;
    const nitrogen = analysis.primaryNutrients.find(n => n.name === 'Nitrogen (N)')?.value || 0;
    
    const suggestions = [];
    
    if (pH >= 6.0 && pH <= 7.0) {
      suggestions.push({
        crop: 'Tomatoes',
        confidence: 'High',
        details: 'Ideal pH and nitrogen levels for tomato growth'
      });
    }
    
    if (pH >= 6.5 && nitrogen >= 40) {
      suggestions.push({
        crop: 'Leafy Greens',
        confidence: 'High',
        details: 'Good nitrogen levels for leaf development'
      });
    }
    
    return suggestions;
  };

  const suggestions = getCropSuggestions(analysis);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recommended Crops</h3>
        <Flower2 className="w-6 h-6 text-green-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 border border-green-100 rounded-lg hover:border-green-200 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Sprout className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold text-gray-800">{suggestion.crop}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{suggestion.details}</p>
            <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              {suggestion.confidence} Confidence
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}