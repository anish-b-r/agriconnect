import React, { useState } from 'react';
import { X, ShieldCheck, Download, Printer, Copy, Check, FileText } from 'lucide-react';
import { MarketLinkageContract, Language } from '../types';
import { generateEscrowVoucherPdf } from '../utils/generateEscrowVoucherPdf';
import { getTranslation, getLocalizedCropName } from '../utils/translations';

interface TransactionVoucherModalProps {
  contract: MarketLinkageContract;
  onClose: () => void;
  currentLanguage?: Language | string;
}

export const TransactionVoucherModal: React.FC<TransactionVoucherModalProps> = ({
  contract,
  onClose,
  currentLanguage = 'en',
}) => {
  const langKey = (currentLanguage as Language) || 'en';
  const t = getTranslation(langKey);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const code = contract.contractCode || contract.id || 'KS-DIR-849201';
  const farmer = contract.farmerName || 'Balwinder Singh & Farmers Collective';
  const buyerCompany = contract.buyerCompany || contract.buyerName || 'ITC Agri Business Division';
  const buyerContact = contract.buyerName && contract.buyerCompany ? contract.buyerName : '';
  const crop = getLocalizedCropName(contract.cropId || '', langKey, contract.cropName || 'Wheat (Sharbati / Lokwan)');
  const qty = contract.quantityQuintals ?? contract.quantityQtl ?? 50;
  const pricePerQtl = contract.agreedPricePerQtl ?? 2850;
  const totalVal =
    contract.totalContractValue ??
    contract.totalDealValue ??
    contract.totalValue ??
    qty * pricePerQtl;
  const bankRef = contract.bankReference || contract.escrowAccountRef || 'ICICI-AGRI-ESCROW-2026-8819';
  const status = contract.escrowStatus || 'Escrow Funded (100%)';
  const date = contract.contractDate || contract.createdDate || new Date().toISOString().split('T')[0];
  const paymentMode = contract.paymentMode || '100% Escrow Bank Deposit / RTGS Settlement';
  const logistics = contract.logisticsPartner || contract.freightArrangement || 'Buyer Farmgate Collection';
  const quality = contract.qualitySpecSheet || 'Moisture < 12% • Grade A Export Standard Assayed';

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generateEscrowVoucherPdf(contract);
    } catch (err) {
      console.error('Failed to generate Escrow Voucher PDF:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleCopySummary = () => {
    const text = `🧾 *KRISHISETU OFFICIAL ESCROW SETTLEMENT VOUCHER*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Contract Code:* ${code}
👨‍🌾 *Farmer / FPO:* ${farmer}
🏢 *Buyer:* ${buyerCompany} ${buyerContact ? `(${buyerContact})` : ''}
🌾 *Commodity:* ${crop}
📦 *Quantity:* ${qty} Quintals
💰 *Agreed Rate:* ₹${pricePerQtl}/Qtl
💵 *Total Escrow Locked:* ₹${totalVal.toLocaleString('en-IN')}
🔒 *Escrow Bank UTR:* ${bankRef}
📅 *Settlement Date:* ${date}
✨ *Status:* ${status}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
_SIH26132 100% Bank Escrow Payment Protection Standard_`;

    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-scaleUp text-stone-900 font-sans">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 text-[#1b4332] font-black">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-base font-display">Official Escrow Settlement Voucher</span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher Badge & Reference */}
        <div className="flex items-center justify-between p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 font-mono text-xs">
          <div>
            <span className="text-[10px] text-stone-500 font-medium block">CONTRACT CODE</span>
            <span className="font-extrabold text-stone-900 text-sm">{code}</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1b4332] text-emerald-100 border border-emerald-900/40 shadow-2xs">
            {status}
          </span>
        </div>

        {/* Breakdown Box */}
        <div className="space-y-2.5 text-xs text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-200/80 font-mono">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200/70">
            <span className="text-stone-500 font-sans">Farmer / FPO:</span>
            <span className="font-bold text-stone-900 text-right truncate max-w-[200px]">{farmer}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-stone-200/70">
            <span className="text-stone-500 font-sans">Verified Corporate Buyer:</span>
            <span className="font-bold text-stone-900 text-right truncate max-w-[200px]">{buyerCompany}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500 font-sans">Commodity:</span>
            <span className="font-bold text-stone-900">{crop}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500 font-sans">Quantity Settled:</span>
            <span className="font-bold text-stone-900">{qty} Quintals</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500 font-sans">Agreed Rate per Qtl:</span>
            <span className="font-bold text-stone-900">₹{pricePerQtl.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center pt-2.5 border-t border-stone-200 text-sm font-extrabold text-[#1b4332]">
            <span className="font-sans">100% Escrow Total Value:</span>
            <span className="text-base font-black">₹{totalVal.toLocaleString('en-IN')}</span>
          </div>

          <div className="pt-2 text-[11px] text-stone-600 space-y-1 font-sans border-t border-stone-200/60 mt-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Escrow UTR / Ref:</span>
              <span className="font-mono font-bold text-stone-900">{bankRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Logistics & Freight:</span>
              <span className="font-medium text-stone-800 truncate max-w-[200px]">{logistics}</span>
            </div>
            {quality && (
              <div className="pt-1 text-[10px] text-stone-500 italic">
                Assay Spec: {quality}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={handleCopySummary}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-4 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              {downloading ? (
                <div className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Download className="w-3.5 h-3.5 text-emerald-300" />
              )}
              <span>{downloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
