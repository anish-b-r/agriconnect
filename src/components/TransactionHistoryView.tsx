import React from 'react';
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight,
  Clock,
  Lock,
  Download,
  AlertCircle,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { MarketLinkageContract, Language } from '../types';

interface TransactionHistoryViewProps {
  contracts: MarketLinkageContract[];
  currentLanguage?: Language;
  onViewVoucher?: (contract: MarketLinkageContract) => void;
  onSelectContract?: (contract: MarketLinkageContract) => void;
  onUpdateContractStatus?: (
    contractId: string,
    newStatus: 'Escrow Funded (100%)' | 'Dispatched' | 'Quality Passed & Paid'
  ) => void;
}

export const TransactionHistoryView: React.FC<TransactionHistoryViewProps> = ({
  contracts = [],
  currentLanguage = 'en',
  onViewVoucher,
  onSelectContract,
  onUpdateContractStatus,
}) => {
  const handleVoucherClick = (contract: MarketLinkageContract) => {
    if (onSelectContract) {
      onSelectContract(contract);
    } else if (onViewVoucher) {
      onViewVoucher(contract);
    }
  };

  const getEscrowStatusBadge = (status?: string) => {
    switch (status) {
      case 'Quality Passed & Paid':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#1b4332] text-emerald-100 border border-emerald-900/40 shadow-xs font-mono inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Quality Passed & Paid</span>
          </span>
        );
      case 'Escrow Funded (100%)':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-sky-200 border border-slate-700 shadow-xs font-mono inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>Escrow Funded (100%)</span>
          </span>
        );
      case 'Dispatched':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-950 text-amber-200 border border-amber-800 shadow-xs font-mono inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Dispatched / In-Transit</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-stone-900 text-stone-200 border border-stone-800 shadow-xs font-mono">
            {status || 'Active Contract'}
          </span>
        );
    }
  };

  if (!contracts || contracts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-stone-400 border border-stone-200/80 shadow-sm space-y-3">
        <Receipt className="w-10 h-10 text-stone-300 mx-auto" />
        <h3 className="text-base font-extrabold text-stone-900 font-display">No Finalized Escrow Contracts Found</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Finalize negotiations in the Buyer Market or list your harvest lots to lock 100% bank escrow guaranteed deals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn font-sans text-stone-900">
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-100 border border-stone-800 text-xs font-extrabold font-mono shadow-xs mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Bank Escrow Guarantee Vault</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight font-display text-stone-900">
              Escrow Contracts & Bank Settlement Vouchers
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500 font-semibold">
            {contracts.length} Verified Contracts Active
          </span>
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => {
            const totalVal =
              contract.totalValue ??
              contract.totalDealValue ??
              (contract.agreedPricePerQtl || 2500) * (contract.quantityQuintals || contract.quantityQtl || 50);
            const quantity = contract.quantityQuintals ?? contract.quantityQtl ?? 50;
            const pricePerQtl = contract.agreedPricePerQtl ?? (quantity > 0 ? Math.round(totalVal / quantity) : 0);
            const contractCode = contract.contractCode || contract.id || `KS-DIR-${Math.floor(100000 + Math.random() * 900000)}`;

            return (
              <div
                key={contract.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[11px] font-extrabold text-stone-100 font-mono px-3 py-1 rounded-full bg-stone-900 border border-stone-800 shadow-xs tracking-wider">
                        {contractCode}
                      </span>
                      {getEscrowStatusBadge(contract.escrowStatus)}
                    </div>
                    <h3 className="text-base font-extrabold text-stone-900 font-display mt-1">
                      {contract.cropName || 'Farm Harvest Batch'}
                    </h3>
                  </div>

                  <div className="text-left md:text-right font-mono">
                    <span className="text-2xl font-black text-[#1b4332] block tracking-tight">
                      ₹{totalVal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">
                      {quantity} Quintals @ ₹{pricePerQtl}/Qtl
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block font-sans uppercase font-bold">INSTITUTIONAL BUYER</span>
                    <strong className="text-stone-900 text-xs mt-0.5 block truncate">
                      {contract.buyerCompany || contract.buyerName || 'Verified Corporate Buyer'}
                    </strong>
                    <span className="text-[10px] text-stone-500 truncate block">{contract.buyerName}</span>
                  </div>

                  <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block font-sans uppercase font-bold">ESCROW BANK REF</span>
                    <strong className="text-stone-900 text-xs mt-0.5 block truncate">
                      {contract.bankReference || contract.escrowAccountRef || 'BANK-ESCROW-2026'}
                    </strong>
                    <span className="text-[10px] text-stone-500 block">Date: {contract.contractDate || contract.createdDate || 'Recent'}</span>
                  </div>

                  <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/70">
                    <span className="text-[10px] text-stone-400 block font-sans uppercase font-bold">LOGISTICS & FREIGHT</span>
                    <strong className="text-stone-900 text-xs mt-0.5 block truncate">
                      {contract.freightArrangement || 'Buyer Farmgate Pickup'}
                    </strong>
                    <span className="text-[10px] text-[#1b4332] font-semibold block">Verified Escrow Lock</span>
                  </div>
                </div>

                {contract.qualitySpecSheet && (
                  <div className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/60 text-xs text-stone-600 font-mono">
                    <strong className="text-stone-900 font-sans text-[11px] block mb-0.5">Quality Specification Sheet:</strong>
                    <span>{contract.qualitySpecSheet}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {onUpdateContractStatus && (
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span className="text-[11px] text-stone-400 font-sans hidden sm:inline">Update Escrow State:</span>
                        <button
                          onClick={() => onUpdateContractStatus(contract.id, 'Escrow Funded (100%)')}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-blue-50 text-blue-900 border border-stone-200 cursor-pointer shadow-2xs"
                        >
                          Fund Escrow
                        </button>
                        <button
                          onClick={() => onUpdateContractStatus(contract.id, 'Dispatched')}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-amber-50 text-amber-900 border border-stone-200 cursor-pointer shadow-2xs"
                        >
                          Mark Dispatched
                        </button>
                        <button
                          onClick={() => onUpdateContractStatus(contract.id, 'Quality Passed & Paid')}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white hover:bg-emerald-50 text-emerald-900 border border-stone-200 cursor-pointer shadow-2xs"
                        >
                          Release Payment
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleVoucherClick(contract)}
                    className="px-4 py-2 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs ml-auto"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official Escrow Voucher & RTGS Slip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

