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
import { gsap } from 'gsap';
import { ArrowLeft, Download } from 'lucide-react';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analyses, setAnalyses] = useState<SoilAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<SoilAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Animate hero section elements
    gsap.fromTo('.hero-title', {
      opacity: 0,
      y: 50,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.fromTo('.hero-description', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });

    // Animate upload section
    gsap.fromTo('.upload-section', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.6,
      ease: 'back.out(1.2)'
    });
  }, []);

  const handleUploadComplete = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeSoilImage(file);
      setCurrentAnalysis(analysis);
      
      const newAnalyses = [...analyses, analysis];
      setAnalyses(newAnalyses);
      localStorage.setItem('soilAnalyses', JSON.stringify(newAnalyses));
      
      setShowResults(true);

      gsap.from('.analysis-results', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentAnalysis(null);
    } else if (showHistory) {
      setShowHistory(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header onHistoryClick={() => setShowHistory(!showHistory)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(showResults || showHistory) && (
          <button
            onClick={handleBack}
            className="mb-6 flex items-center space-x-2 text-teal-600 hover:text-teal-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}

        {!showHistory ? (
          <>
            <div className="hero-section text-center mb-16">
              <h1 className="hero-title text-6xl font-extrabold text-teal-900 mb-8 tracking-tight leading-tight drop-shadow-sm">
                AI-Driven Soil Health Analysis
              </h1>
              <p className="hero-description text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed font-medium">
                Upload a soil sample image and get instant analysis with AI-powered recommendations
                for optimal crop growth and soil management.
              </p>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {!showResults && (
              <div className="upload-section max-w-2xl mx-auto">
                <FileUpload onUploadComplete={handleUploadComplete} />
                {analyzing && (
                  <div className="mt-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
                    <p className="mt-4 text-teal-600">Analyzing soil composition...</p>
                  </div>
                )}
              </div>
            )}

            {showResults && currentAnalysis && (
              <div className="analysis-results mt-12 space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-teal-900">
                      Analysis Results
                    </h2>
                    <button
                      onClick={() => generatePDF(currentAnalysis)}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Report</span>
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
                    <AnalysisChart
                      data={currentAnalysis.traceElements}
                      title="Trace Elements"
                    />
                    <AnalysisChart
                      data={currentAnalysis.physicalProperties}
                      title="Physical Properties"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      ...currentAnalysis.primaryNutrients,
                      ...currentAnalysis.secondaryNutrients,
                      ...currentAnalysis.traceElements,
                      ...currentAnalysis.physicalProperties
                    ].map((item, index) => (
                      <AnalysisCard
                        key={`nutrient-${index}`}
                        title={item.name}
                        value={item.value}
                        unit={item.unit}
                        status={item.status}
                        recommendation={item.recommendation}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <HistorySection analyses={analyses} />
        )}
      </main>

      <section id="about" className="bg-gradient-to-br from-teal-50 to-emerald-50 py-16">
        <AboutSection />
      </section>
    </div>
  );
}

export default App;