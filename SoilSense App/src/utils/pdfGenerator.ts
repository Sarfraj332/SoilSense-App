import { jsPDF } from 'jspdf';
import type { SoilAnalysis, NutrientData } from '../types/analysis';

const formatSection = (
  doc: jsPDF,
  title: string,
  data: NutrientData[],
  startY: number
): number => {
  doc.setFontSize(14);
  doc.text(title, 20, startY);
  startY += 10;

  doc.setFontSize(12);
  data.forEach((item) => {
    doc.text(`${item.name}: ${item.value}${item.unit} (${item.status})`, 30, startY);
    startY += 7;
    doc.setFontSize(10);
    doc.text(`Recommendation: ${item.recommendation}`, 40, startY);
    startY += 10;
    doc.setFontSize(12);
  });

  return startY + 5;
};

export const generatePDF = (analysis: SoilAnalysis): void => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.text('Soil Analysis Report', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.text(`Date: ${analysis.date}`, 20, yPosition);
  doc.text(`Report ID: ${analysis.id}`, 120, yPosition);
  yPosition += 20;

  // Sections
  yPosition = formatSection(doc, 'Primary Nutrients', analysis.primaryNutrients, yPosition);
  yPosition = formatSection(doc, 'Secondary Nutrients', analysis.secondaryNutrients, yPosition);
  yPosition = formatSection(doc, 'Trace Elements', analysis.traceElements, yPosition);
  formatSection(doc, 'Physical Properties', analysis.physicalProperties, yPosition);

  // Footer
  doc.setFontSize(10);
  doc.text('Generated by SoilSense - AI-Driven Soil Analysis', 20, 280);

  doc.save(`soil-analysis-${analysis.id}.pdf`);
};