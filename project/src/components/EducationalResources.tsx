import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

export default function EducationalResources() {
  const resources = [
    {
      title: 'Understanding Soil pH',
      type: 'article',
      description: 'Learn about the importance of soil pH and how it affects plant growth.',
      icon: FileText
    },
    {
      title: 'Proper Soil Sampling Techniques',
      type: 'video',
      description: 'Step-by-step guide to collecting soil samples for accurate analysis.',
      icon: Video
    },
    {
      title: 'Sustainable Farming Practices',
      type: 'guide',
      description: 'Comprehensive guide to maintaining soil health through sustainable methods.',
      icon: BookOpen
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Educational Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Icon className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              </div>
              <p className="text-gray-600">{resource.description}</p>
              <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                Learn More →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}