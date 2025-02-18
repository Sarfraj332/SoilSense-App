import React from 'react';
import { Sprout, Brain, Database, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About SoilSense</h1>
        <p className="text-lg text-gray-600">
          Empowering farmers with AI-driven soil analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold">AI Technology</h2>
          </div>
          <p className="text-gray-600">
            Our advanced AI algorithms analyze soil images to determine texture,
            color, and composition. Using deep learning models trained on
            extensive agricultural datasets, we provide accurate soil health
            assessments.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold">Data Sources</h2>
          </div>
          <p className="text-gray-600">
            We combine data from leading agricultural databases, peer-reviewed
            research papers, and expert knowledge to deliver comprehensive
            recommendations for soil improvement and crop selection.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Created by Innovative Minds
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Lead Developer: ZN Sarfraj
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Sprout className="w-6 h-6 text-green-600" />
          <span className="text-sm text-gray-500">
            Committed to sustainable agriculture
          </span>
        </div>
      </div>
    </div>
  );
}