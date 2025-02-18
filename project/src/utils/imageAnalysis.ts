import type { SoilAnalysis, NutrientData } from '../types/analysis';

const isSoilImage = async (file: File): Promise<boolean> => {
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
        if (!imageData) return resolve(false);

        let browns = 0;
        let reds = 0;
        let total = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // Enhanced soil color detection
          if ((r > g && r > b) || // Reddish soils
              (r > 60 && g > 40 && b < 40) || // Brown soils
              (r > 120 && g > 80 && b < 60)) { // Sandy soils
            browns++;
            if (r > 150 && g < 100) reds++;
          }
          total++;
        }

        resolve((browns / total) > 0.35);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const analyzeImageColors = async (file: File): Promise<{
  redness: number;
  organicMatter: number;
  moisture: number;
  texture: number;
}> => {
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
        if (!imageData) {
          resolve({ redness: 0.5, organicMatter: 0.5, moisture: 0.5, texture: 0.5 });
          return;
        }

        let redIntensity = 0;
        let darkMatter = 0;
        let blueValues = 0;
        let colorVariance = 0;
        let previousColors: number[] = [];
        let total = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // Calculate red soil content
          redIntensity += (r > g && r > b) ? (r / 255) : 0;
          
          // Calculate organic matter (darkness)
          const brightness = (r + g + b) / 3;
          darkMatter += (brightness < 128) ? 1 : 0;
          
          // Calculate moisture (blue tones)
          blueValues += (b > r && b > g) ? (b / 255) : 0;
          
          // Calculate texture (local color variations)
          if (previousColors.length > 0) {
            const avgPrev = previousColors.reduce((a, b) => a + b) / previousColors.length;
            colorVariance += Math.abs(brightness - avgPrev);
          }
          previousColors = [r, g, b];
          
          total++;
        }

        const pixels = imageData.length / 4;
        
        resolve({
          redness: Math.min(redIntensity / pixels, 1),
          organicMatter: Math.min(darkMatter / pixels, 1),
          moisture: Math.min(blueValues / pixels, 1),
          texture: Math.min(colorVariance / (pixels * 255), 1)
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const calculateNutrientValue = (
  baseValue: number,
  soilCharacteristics: {
    redness: number;
    organicMatter: number;
    moisture: number;
    texture: number;
  },
  weights: {
    redness?: number;
    organicMatter?: number;
    moisture?: number;
    texture?: number;
  }
): number => {
  let multiplier = 1;
  
  if (weights.redness) {
    multiplier *= 1 + (soilCharacteristics.redness - 0.5) * weights.redness;
  }
  if (weights.organicMatter) {
    multiplier *= 1 + (soilCharacteristics.organicMatter - 0.5) * weights.organicMatter;
  }
  if (weights.moisture) {
    multiplier *= 1 + (soilCharacteristics.moisture - 0.5) * weights.moisture;
  }
  if (weights.texture) {
    multiplier *= 1 + (soilCharacteristics.texture - 0.5) * weights.texture;
  }

  return Math.round(baseValue * multiplier);
};

const determineStatus = (value: number, optimal: number): 'good' | 'warning' | 'critical' => {
  const percentage = (value / optimal) * 100;
  if (percentage >= 80 && percentage <= 120) return 'good';
  if (percentage >= 60 && percentage <= 140) return 'warning';
  return 'critical';
};

export const analyzeSoilImage = async (file: File): Promise<SoilAnalysis> => {
  if (!await isSoilImage(file)) {
    throw new Error('The uploaded image does not appear to be a soil sample. Please upload a clear image of soil.');
  }
  
  const soilCharacteristics = await analyzeImageColors(file);
  
  const generateNutrient = (
    name: string,
    baseValue: number,
    weights: {
      redness?: number;
      organicMatter?: number;
      moisture?: number;
      texture?: number;
    },
    unit: string,
    optimal: number
  ): NutrientData => {
    const value = calculateNutrientValue(baseValue, soilCharacteristics, weights);
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
      generateNutrient('Nitrogen (N)', 45, { organicMatter: 1.2, moisture: 0.8 }, 'mg/kg', 45),
      generateNutrient('Phosphorus (P)', 15, { redness: 0.9, organicMatter: 0.6 }, 'mg/kg', 15),
      generateNutrient('Potassium (K)', 235, { texture: 0.7, moisture: 0.5 }, 'mg/kg', 235)
    ],
    secondaryNutrients: [
      generateNutrient('Calcium (Ca)', 2100, { texture: 0.4, redness: 0.3 }, 'mg/kg', 2100),
      generateNutrient('Magnesium (Mg)', 180, { organicMatter: 0.5, moisture: 0.4 }, 'mg/kg', 180),
      generateNutrient('Sulfur (S)', 12, { organicMatter: 0.8, moisture: 0.6 }, 'mg/kg', 12)
    ],
    traceElements: [
      generateNutrient('Iron (Fe)', 85, { redness: 1.2, texture: 0.4 }, 'mg/kg', 85),
      generateNutrient('Manganese (Mn)', 45, { organicMatter: 0.9, moisture: 0.5 }, 'mg/kg', 45),
      generateNutrient('Copper (Cu)', 12, { organicMatter: 0.7, texture: 0.6 }, 'mg/kg', 12),
      generateNutrient('Zinc (Zn)', 25, { texture: 0.8, moisture: 0.4 }, 'mg/kg', 25)
    ],
    physicalProperties: [
      generateNutrient('pH Level', 6.8, { moisture: 0.6, organicMatter: 0.4 }, 'pH', 6.8)
    ]
  };
};