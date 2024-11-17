import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisCard from './components/AnalysisCard';
import AnalysisChart from './components/AnalysisChart';
import HistorySection from './components/HistorySection';
import AboutSection from './components/AboutSection';
import type { SoilAnalysis } from './types/analysis';
import { generatePDF } from './utils/pdfGenerator';
import { analyzeSoilImage } from './utils/imageAnalysis';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analyses, setAnalyses] = useState<SoilAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<SoilAnalysis | null>(null);

  useEffect(() => {
    const savedAnalyses = localStorage.getItem('soilAnalyses');
    if (savedAnalyses) {
      setAnalyses(JSON.parse(savedAnalyses));
    }
  }, []);

  const handleUploadComplete = async (file: File) => {
    setAnalyzing(true);
    try {
      const analysis = await analyzeSoilImage(file);
      setCurrentAnalysis(analysis);
      
      const newAnalyses = [...analyses, analysis];
      setAnalyses(newAnalyses);
      localStorage.setItem('soilAnalyses', JSON.stringify(newAnalyses));
      
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error appropriately
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-green-50 to-emerald-100">
      <Header onHistoryClick={() => setShowHistory(!showHistory)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showHistory ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                AI-Driven Soil Health Analysis
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload a soil sample image and get instant analysis with AI-powered recommendations
                for optimal crop growth and soil management.
              </p>
            </div>

            {!showResults && (
              <div className="max-w-2xl mx-auto">
                <FileUpload onUploadComplete={handleUploadComplete} />
                {analyzing && (
                  <div className="mt-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Analyzing soil composition...</p>
                  </div>
                )}
              </div>
            )}

            {showResults && currentAnalysis && (
              <div className="mt-12 space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Analysis Results
                    </h2>
                    <button
                      onClick={() => generatePDF(currentAnalysis)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      Download Report
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <AnalysisChart
                      data={currentAnalysis.primaryNutrients}
                      title="Primary Nutrients"
                    />
                    <AnalysisChart
                      data={currentAnalysis.secondaryNutrients}
                      title="Secondary Nutrients"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...currentAnalysis.primaryNutrients, ...currentAnalysis.secondaryNutrients]
                      .map((item, index) => (
                        <AnalysisCard
                          key={`${item.name}-${index}`}
                          title={item.name}
                          value={item.value}
                          unit={item.unit}
                          status={item.status}
                          recommendation={item.recommendation}
                        />
                      ))}
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setCurrentAnalysis(null);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Analyze Another Sample
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <HistorySection analyses={analyses} />
        )}
      </main>

      <section id="about" className="bg-white py-16">
        <AboutSection />
      </section>
    </div>
  );
}

export default App;