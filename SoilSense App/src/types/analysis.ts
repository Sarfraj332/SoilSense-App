export interface NutrientData {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  recommendation: string;
}

export interface SoilAnalysis {
  id: string;
  date: string;
  primaryNutrients: NutrientData[];
  secondaryNutrients: NutrientData[];
  traceElements: NutrientData[];
  physicalProperties: NutrientData[];
}