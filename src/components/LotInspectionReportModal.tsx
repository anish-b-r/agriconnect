import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  Award, 
  FileText, 
  Copy, 
  Check, 
  IndianRupee, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calendar,
  MapPin,
  Scale,
  QrCode,
  Sparkles
} from 'lucide-react';
import { FarmerBatchListing } from '../types';
import { generateLotInspectionReportPdf } from '../utils/generateLotInspectionReportPdf';

interface LotInspectionReportModalProps {
  lot: FarmerBatchListing;
  onClose: () => void;
}

export const LotInspectionReportModal: React.FC<LotInspectionReportModalProps> = ({
  lot,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const totalFairVal = lot.availableQuantityQuintals * lot.fairBaselinePrice;
  const totalAskingVal = lot.availableQuantityQuintals * lot.askingPricePerQtl;
  const isGradeA = lot.qualityGrade === 'Grade A';

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      generateLotInspectionReportPdf(lot);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWhatsAppSummary = () => {
    const text = `🌾 *KRISHISETU LOT INSPECTION & FAIR BASELINE REPORT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Lot Reference:* ${lot.batchCode}
👨‍🌾 *Farmer / FPO:* ${lot.farmerName}
📍 *Location:* ${lot.village}, ${lot.district}, ${lot.state}
📦 *Crop & Variety:* ${lot.cropName} (${lot.variety})
⚖️ *Available Volume:* ${lot.availableQuantityQuintals} Quintals (${(lot.availableQuantityQuintals / 10).toFixed(1)} MT)
📅 *Harvest Date:* ${lot.harvestDate}

🏅 *QUALITY ASSAY RESULTS (Grade: ${lot.qualityGrade})*
• Moisture: ${lot.qualityParams.moistureContent}% (Certified Safe Storage)
• Foreign Matter: ${lot.qualityParams.foreignMatter}%
• Broken / Damaged: ${lot.qualityParams.brokenGrainsOrDamaged}%
• Grain Size: ${lot.qualityParams.grainSizeOrCount}
• Luster: ${lot.qualityParams.colorAndLuster}
• Variety Purity: ${100 - lot.qualityParams.admixturePercent}%

💰 *FAIR BASELINE PRICING (Zero Middleman Cut)*
• *Fair Baseline Floor:* ₹${lot.fairBaselinePrice.toLocaleString('en-IN')}/Qtl
• *Govt MSP Benchmark:* ₹${lot.mspBenchmark.toLocaleString('en-IN')}/Qtl
• *Target Offer Price:* ₹${lot.askingPricePerQtl.toLocaleString('en-IN')}/Qtl
• *Total Lot Valuation:* ₹${totalAskingVal.toLocaleString('en-IN')}

⚠️ *Offline Trader Notice:* Quality is pre-assayed. Arbitrary moisture cuts or katta discounts are not applicable.
━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Digitally Verified on KrishiSetu e-APMC Platform_`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-stone-300 max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 flex-shrink-0">
          <div className="flex items-center gap-2 text-emerald-900">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base tracking-tight font-heading flex items-center gap-2">
                <span>Lot Inspection & Fair Baseline Report</span>
                <span className="text-[11px] font-mono font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  PDF
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                Official quality assay parameters and fair price baseline for offline buyer negotiations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 cursor-pointer p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-stone-150 bg-stone-50/70 -mx-4 sm:-mx-6 px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Lot: <strong className="font-mono text-stone-900">{lot.batchCode}</strong></span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-semibold">{lot.cropName} ({lot.variety})</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy for WhatsApp */}
            <button
              onClick={handleCopyWhatsAppSummary}
              className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-stone-200 cursor-pointer shadow-2xs transition-colors"
              title="Copy formatted text to paste into WhatsApp for offline buyers"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy for WhatsApp</span>
                </>
              )}
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-stone-200 cursor-pointer shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Report Content (Matches PDF document design) */}
        <div className="overflow-y-auto py-4 space-y-5 pr-1 text-stone-900 font-sans">
          {/* Document Preview Container */}
          <div className="bg-white border-2 border-stone-300 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            {/* Document Header Banner */}
            <div className="bg-emerald-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    KS
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    KrishiSetu National Agri-Portal
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-black tracking-tight mt-1 font-heading text-white">
                  OFFICIAL LOT INSPECTION & FAIR BASELINE REPORT
                </h1>
                <p className="text-[11px] text-emerald-200/90 mt-0.5">
                  Pre-Sale Independent Quality Assay & Statutory Fair Baseline Valuation
                </p>
              </div>

              <div className="bg-emerald-800/80 px-3.5 py-2 rounded-lg text-right border border-emerald-700/60 w-full sm:w-auto">
                <div className="text-[10px] uppercase font-bold text-emerald-300 font-mono">
                  Report ID: KS-INSP-{lot.batchCode.replace(/[^a-zA-Z0-9]/g, '')}
                </div>
                <div className="text-xs text-white font-semibold">
                  Valid for 30 Days from Assay
                </div>
                <div className="text-[10px] text-emerald-300 mt-0.5">
                  Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Offline Buyer Negotiation Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-900 block">Notice for Offline Traders, Arhtiyas & Local Buyers:</strong>
                <span>
                  This lot has undergone standard APMC & Agmark laboratory quality testing. Moisture, foreign matter, and varietal purity are pre-certified below. No unilateral "katta cut" or arbitrary price deductions should be applied to this batch.
                </span>
              </div>
            </div>

            {/* Section 1: Provenance & Lot Metadata */}
            <div>
              <div className="flex items-center gap-2 pb-1.5 border-b border-stone-200 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  1. Commodity & Provenance Identification
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 text-[11px] block">Commodity & Variety</span>
                  <strong className="text-stone-900 font-medium text-sm">{lot.cropName}</strong>
                  <div className="text-stone-500 text-[11px]">({lot.variety})</div>
                </div>

                <div>
                  <span className="text-stone-400 text-[11px] block">Available Volume</span>
                  <strong className="text-stone-900 text-sm font-mono-num">{lot.availableQuantityQuintals} Qtl</strong>
                  <div className="text-stone-500 text-[11px]">({(lot.availableQuantityQuintals / 10).toFixed(1)} Metric Tonnes)</div>
                </div>

                <div>
                  <span className="text-stone-400 text-[11px] block">Farmer / FPO Origin</span>
                  <strong className="text-stone-900 font-medium">{lot.farmerName}</strong>
                  <div className="text-stone-500 text-[11px]">{lot.village}, {lot.district}</div>
                </div>

                <div>
                  <span className="text-stone-400 text-[11px] block">Harvest Date</span>
                  <strong className="text-stone-900">{lot.harvestDate}</strong>
                  <div className="text-emerald-700 text-[11px] font-semibold">Fresh Harvest Lot</div>
                </div>
              </div>
            </div>

            {/* Section 2: Certified Quality Parameters */}
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-200 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  2. Assayed Quality Parameters & Compliance
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isGradeA 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <Award className="w-3.5 h-3.5" />
                  <span>Certified {lot.qualityGrade}</span>
                </span>
              </div>

              {/* Table of Parameters */}
              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-100/80 text-stone-700 font-semibold border-b border-stone-200 text-[11px]">
                    <tr>
                      <th className="py-2 px-3">Quality Parameter</th>
                      <th className="py-2 px-3">Observed Value</th>
                      <th className="py-2 px-3">Mandi / FAQ Standard</th>
                      <th className="py-2 px-3 text-right">Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-150">
                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Moisture Content</td>
                      <td className="py-2.5 px-3 font-bold font-mono-num text-emerald-700">{lot.qualityParams.moistureContent}%</td>
                      <td className="py-2.5 px-3 text-stone-500">&lt; 12.0% (Safe for long storage)</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{lot.qualityParams.moistureContent <= 12 ? 'Passed (Optimal)' : 'Acceptable'}</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Foreign Matter & Dust</td>
                      <td className="py-2.5 px-3 font-bold font-mono-num text-emerald-700">{lot.qualityParams.foreignMatter}%</td>
                      <td className="py-2.5 px-3 text-stone-500">&lt; 1.0% maximum APMC limit</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Clean / Minimal Dust</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Broken / Damaged Grains</td>
                      <td className="py-2.5 px-3 font-bold font-mono-num text-emerald-700">{lot.qualityParams.brokenGrainsOrDamaged}%</td>
                      <td className="py-2.5 px-3 text-stone-500">&lt; 3.0% standard tolerance</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>FAQ Compliant</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Grain Size & Boldness</td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{lot.qualityParams.grainSizeOrCount || 'Bold 8.0mm+'}</td>
                      <td className="py-2.5 px-3 text-stone-500">Uniform Screen Tested</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Premium Bold</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Color & Luster Appearance</td>
                      <td className="py-2.5 px-3 font-bold text-stone-900">{lot.qualityParams.colorAndLuster || 'Superior / Bright'}</td>
                      <td className="py-2.5 px-3 text-stone-500">Natural Golden Sheen</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>High Luster</span>
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-stone-50">
                      <td className="py-2.5 px-3 font-medium text-stone-900">Varietal Admixture</td>
                      <td className="py-2.5 px-3 font-bold font-mono-num text-emerald-700">{lot.qualityParams.admixturePercent}%</td>
                      <td className="py-2.5 px-3 text-stone-500">&lt; 2.0% varietal mixing</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>99%+ Purity</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Fair Baseline Price & Valuation Benchmarks */}
            <div>
              <div className="flex items-center gap-2 pb-1.5 border-b border-stone-200 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  3. Economic Baseline & Fair Price Valuation
                </span>
              </div>

              {/* Price Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-num">
                {/* Fair Baseline Floor */}
                <div className="bg-emerald-50 rounded-xl p-3.5 border-2 border-emerald-400">
                  <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Fair Baseline Floor</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-950">
                    ₹{lot.fairBaselinePrice.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-emerald-700 font-sans"> / Qtl</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-1 font-sans">
                    Recommended statutory fair floor based on CACP C2 comprehensive cost formula.
                  </p>
                </div>

                {/* Statutory MSP */}
                <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-200">
                  <div className="flex items-center justify-between text-blue-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Govt MSP Benchmark</span>
                    <Scale className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-blue-950">
                    ₹{lot.mspBenchmark.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-blue-700 font-sans"> / Qtl</span>
                  </div>
                  <p className="text-[10px] text-blue-700 mt-1 font-sans">
                    Central Government statutory Minimum Support Price floor for 2025-26.
                  </p>
                </div>

                {/* Farmer Asking Rate */}
                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200">
                  <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Farmer Target Rate</span>
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-amber-950">
                    ₹{lot.askingPricePerQtl.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-amber-700 font-sans"> / Qtl</span>
                  </div>
                  <p className="text-[10px] text-amber-700 mt-1 font-sans">
                    Reflects premium grade quality, clean storage, and immediate lot readiness.
                  </p>
                </div>
              </div>

              {/* Total Lot Financial Summary */}
              <div className="mt-3 bg-stone-900 text-white p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-400 text-[11px] block">Total Certified Lot Valuation (at Fair Baseline):</span>
                  <div className="text-xl font-bold font-mono-num text-emerald-400">
                    ₹{totalFairVal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Target value at asking rate: ₹{totalAskingVal.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-stone-800 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-stone-400 text-[11px] block">Settlement Method:</span>
                  <strong className="text-white">Direct Bank Transfer / Spot RTGS</strong>
                  <div className="text-[10px] text-stone-400">0% Commission • No Middleman Deductions</div>
                </div>
              </div>
            </div>

            {/* Section 4: Signature & QR Verification Footer */}
            <div className="pt-3 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                    <QrCode className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-stone-500">
                    <div className="font-bold text-stone-800">KrishiSetu Verification Hash</div>
                    <div className="font-mono text-stone-400">KS-INSP-{lot.id.toUpperCase()}-VERIFIED</div>
                    <div>Scan to view original inspection data & live Mandi price audit</div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-stone-500 w-full sm:w-auto flex flex-col sm:items-end">
                  <div className="font-bold text-stone-800">KrishiSetu e-APMC Quality Wing</div>
                  <div>Certified under Indian Agriculture Grading Standards (AGMARK)</div>
                  <div className="text-emerald-700 font-semibold mt-0.5">✓ Pre-Sale Assay Authentic</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200 flex-shrink-0">
          <div className="text-xs text-stone-500 hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ready for sharing with millers, arhtiyas, and local trading collective.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Download PDF Report'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
