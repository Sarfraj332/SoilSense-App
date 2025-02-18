import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: {
        'hero.title': 'AI-Driven Soil Health Analysis',
        'hero.description': 'Upload a soil sample image and get instant analysis with AI-powered recommendations for optimal crop growth and soil management.',
        'analysis.processing': 'Analyzing soil composition...',
        'analysis.results': 'Analysis Results',
        'analysis.downloadReport': 'Download Report',
        'analysis.primaryNutrients': 'Primary Nutrients',
        'analysis.secondaryNutrients': 'Secondary Nutrients',
        'analysis.analyzeAnother': 'Analyze Another Sample'
      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

export default i18n;