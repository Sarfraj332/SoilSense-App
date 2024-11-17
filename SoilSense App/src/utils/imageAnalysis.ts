import type { SoilAnalysis, NutrientData } from '../types/analysis';

// Simulates image analysis by extracting color information
const analyzeImageColors = async (file: File): Promise<{ r: number; g: number; b: number }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
        if (!imageData) return;

        let r = 0, g = 0, b = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }
        
        const pixelCount = imageData.length / 4;
        resolve({
          r: Math.round(r / pixelCount),
          g: Math.round(g / pixelCount),
          b: Math.round(b / pixelCount)
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

// Generate nutrient values based on color analysis
const generateNutrientValue = (
  baseValue: number,
  variance: number,
  colorInfluence: { r: number; g: number; b: number }
): number => {
  const randomFactor = 0.8 + Math.random() * 0.4; // Random variation between 0.8 and 1.2
  const colorFactor = (colorInfluence.r + colorInfluence.g + colorInfluence.b) / (255 * 3);
  return Math.round((baseValue + (variance * colorFactor)) * randomFactor);
};

const determineStatus = (value: number, optimal: number): 'good' | 'warning' | 'critical' => {
  const percentage = (value / optimal) * 100;
  if (percentage >= 80 && percentage <= 120) return 'good';
  if (percentage >= 60 && percentage <= 140) return 'warning';
  return 'critical';
};

export const analyzeSoilImage = async (file: File): Promise<SoilAnalysis> => {
  const colorInfo = await analyzeImageColors(file);
  
  const generateNutrient = (
    name: string,
    baseValue: number,
    variance: number,
    unit: string,
    optimal: number
  ): NutrientData => {
    const value = generateNutrientValue(baseValue, variance, colorInfo);
    const status = determineStatus(value, optimal);
    
    const recommendations = {
      good: `${name} levels are optimal. Continue current practices.`,
      warning: `Consider supplementing ${name} levels through appropriate fertilization.`,
      critical: `Urgent: ${name} levels require immediate attention. Apply recommended fertilizers.`
    };

    return {
      name,
      value,
      unit,
      status,
      recommendation: recommendations[status]
    };
  };

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    date: new Date().toISOString(),
    primaryNutrients: [
      generateNutrient('Nitrogen (N)', 45, 30, 'mg/kg', 45),
      generateNutrient('Phosphorus (P)', 15, 10, 'mg/kg', 15),
      generateNutrient('Potassium (K)', 235, 100, 'mg/kg', 235)
    ],
    secondaryNutrients: [
      generateNutrient('Calcium (Ca)', 2100, 500, 'mg/kg', 2100),
      generateNutrient('Magnesium (Mg)', 180, 60, 'mg/kg', 180),
      generateNutrient('Sulfur (S)', 12, 5, 'mg/kg', 12)
    ],
    traceElements: [
      generateNutrient('Iron (Fe)', 85, 30, 'mg/kg', 85),
      generateNutrient('Manganese (Mn)', 45, 20, 'mg/kg', 45)
    ],
    physicalProperties: [
      generateNutrient('pH Level', 6.8, 1, 'pH', 6.8)
    ]
  };
};