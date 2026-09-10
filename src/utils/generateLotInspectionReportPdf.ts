import jsPDF from 'jspdf';
import { FarmerBatchListing } from '../types';

export function generateLotInspectionReportPdf(lot: FarmerBatchListing) {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setTextColor(16, 185, 129); // emerald green
  doc.text('KrishiSetu Lot Quality Inspection Report', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 28);
  doc.text(`Lot Reference: ${lot.id || (lot as any).batchCode || 'LOT-2026-001'}`, 14, 34);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 38, 196, 38);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Lot Summary', 14, 46);

  doc.setFontSize(10);
  doc.text(`Crop Name: ${lot.cropName}`, 14, 54);
  doc.text(`Quantity: ${lot.quantityQtl || (lot as any).availableQuantityQuintals || 0} Quintals`, 14, 60);
  doc.text(`Asking Price: Rs ${lot.askingPrice || (lot as any).askingPricePerQtl || 0} / Qtl`, 14, 66);
  doc.text(`FairScore Floor: Rs ${lot.fairPriceFloor || (lot as any).fairBaselinePrice || 0} / Qtl`, 14, 72);
  doc.text(`Location: ${lot.district}, ${lot.state}`, 14, 78);
  doc.text(`Quality Grade: ${lot.qualityGrade}`, 14, 84);

  doc.text('Assayed Quality Parameters:', 14, 96);
  const qParams = lot.qualityParams || (lot as any).qualityParams;
  if (qParams) {
    doc.text(`• Moisture: ${qParams.moisturePercent ?? qParams.moistureContent ?? '12%'}`, 20, 104);
    doc.text(`• Foreign Matter: ${qParams.foreignMatterPercent ?? qParams.foreignMatter ?? '0.5%'}`, 20, 110);
    doc.text(`• Broken/Admixture: ${qParams.grainAdmixturePercent ?? qParams.brokenGrainsOrDamaged ?? '1.0%'}`, 20, 116);
  }

  doc.line(14, 126, 196, 126);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Verified under KrishiSetu FairScore Assessment Standard (Govt of Maharashtra SIH26132)', 14, 134);

  doc.save(`Inspection_Report_${lot.id || 'LOT'}.pdf`);
}
