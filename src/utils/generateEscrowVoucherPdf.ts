import jsPDF from 'jspdf';
import { MarketLinkageContract } from '../types';

export function generateEscrowVoucherPdf(contract: MarketLinkageContract) {
  const doc = new jsPDF();

  const code = contract.contractCode || contract.id || 'KS-DIR-849201';
  const farmer = contract.farmerName || 'Balwinder Singh & Farmers Collective';
  const buyer = contract.buyerCompany || contract.buyerName || 'ITC Agri Business Division';
  const crop = contract.cropName || 'Wheat (Sharbati / Lokwan)';
  const qty = contract.quantityQuintals ?? contract.quantityQtl ?? 50;
  const pricePerQtl = contract.agreedPricePerQtl ?? 2850;
  const totalVal = contract.totalContractValue ?? contract.totalDealValue ?? contract.totalValue ?? (qty * pricePerQtl);
  const bankRef = contract.bankReference || contract.escrowAccountRef || 'ICICI-AGRI-ESCROW-2026-8819';
  const status = contract.escrowStatus || 'Escrow Funded (100%)';
  const date = contract.contractDate || contract.createdDate || new Date().toISOString().split('T')[0];
  const paymentMode = contract.paymentMode || '100% Escrow Bank Deposit / RTGS Settlement';
  const logistics = contract.logisticsPartner || contract.freightArrangement || 'Buyer Farmgate Collection';
  const quality = contract.qualitySpecSheet || 'Moisture < 12% • Grade A Standard Assayed';

  // Title Banner
  doc.setFillColor(27, 67, 50); // Dark Green #1b4332
  doc.rect(0, 0, 210, 32, 'F');

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('AgriConnect KrishiSetu', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL 100% BANK ESCROW VOUCHER & RTGS DISPATCH SLIP', 14, 26);

  // Contract Details Section
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Contract Reference Code: ${code}`, 14, 44);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Issued Date: ${date}  |  Escrow Vault Status: ${status}`, 14, 50);

  doc.setLineWidth(0.3);
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 54, 196, 54);

  // Table Data
  let startY = 64;
  const rowGap = 8;

  doc.setFontSize(10);
  
  const addRow = (label: string, value: string, isBold: boolean = false) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(label, 14, startY);

    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(20, 20, 20);
    doc.text(value, 80, startY);
    startY += rowGap;
  };

  addRow('Farmer / FPO Name:', farmer, true);
  addRow('Verified Corporate Buyer:', buyer, true);
  addRow('Agricultural Commodity:', crop, true);
  addRow('Contract Quantity:', `${qty} Quintals (100 kg/Qtl)`);
  addRow('Agreed Settlement Rate:', `Rs ${pricePerQtl.toLocaleString('en-IN')} / Qtl`);
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(27, 67, 50);
  doc.line(14, startY - 2, 196, startY - 2);

  startY += 4;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(27, 67, 50);
  doc.text('TOTAL ESCROW VALUE LOCKED:', 14, startY);
  doc.text(`Rs ${totalVal.toLocaleString('en-IN')}`, 130, startY);

  startY += 12;
  doc.setFontSize(10);
  addRow('Bank Escrow Reference:', bankRef);
  addRow('Payment Channel:', paymentMode);
  addRow('Logistics / Freight Partner:', logistics);

  startY += 4;
  doc.line(14, startY - 2, 196, startY - 2);

  startY += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('Quality Assay & Spec Sheet:', 14, startY);
  
  startY += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(quality, 14, startY);

  // Footer Stamp
  doc.setFillColor(245, 247, 245);
  doc.rect(14, 240, 182, 30, 'F');

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('KrishiSetu SIH26132 Escrow Verification Seal - 100% Payment Guarantee Standard', 20, 252);
  doc.text(`Bank UTR Hold Reference: ${bankRef} | Audit Timestamp: ${new Date().toISOString()}`, 20, 260);

  doc.save(`Escrow_Voucher_${code}.pdf`);
}
