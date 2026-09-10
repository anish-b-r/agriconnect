import React from 'react';
import { X, ShieldCheck, Download, Printer } from 'lucide-react';
import { MarketLinkageContract } from '../types';

interface TransactionVoucherModalProps {
  contract: MarketLinkageContract;
  onClose: () => void;
}

export const TransactionVoucherModal: React.FC<TransactionVoucherModalProps> = ({ contract, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Official Escrow Settlement Voucher</span>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2 text-xs sm:text-sm text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500">Contract Reference:</span>
            <span className="font-mono font-bold">{contract.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Farmer:</span>
            <span className="font-bold">{contract.farmerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Buyer Company:</span>
            <span className="font-bold">{contract.buyerName} ({contract.buyerCompany})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Commodity:</span>
            <span className="font-bold">{contract.cropName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Quantity Settled:</span>
            <span className="font-bold font-mono-num">{contract.quantityQtl} Quintals</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Agreed Price per Qtl:</span>
            <span className="font-bold font-mono-num">₹{contract.agreedPricePerQtl}</span>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-extrabold text-emerald-800">
            <span>Total Value:</span>
            <span>₹{contract.totalValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-stone-500">Escrow Status:</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {contract.escrowStatus}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
