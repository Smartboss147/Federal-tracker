import React, { useState } from 'react';
import { DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from '../constants';
import { Copy, Check } from 'lucide-react';

interface PaymentScreenProps {
  onContinue: () => void;
}

export function PaymentScreen({ onContinue }: PaymentScreenProps) {
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [copiedBtc, setCopiedBtc] = useState(false);
  const walletAddress = '0x6aEC6e8AedC600B8EA25577748a513E6CDA850F3';
  const btcWalletAddress = 'bc1q857hst5jn9mtq4dj67qfq4zh04ruwes40lgd7t';

  const handleCopyUsdt = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedUsdt(true);
    setTimeout(() => setCopiedUsdt(false), 2000);
  };

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(btcWalletAddress);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-8">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 mb-1">
          <span>Tracking ID: <strong className="text-slate-900">{DEFAULT_TRACKING_ID}</strong></span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span>Verification Number: <strong className="text-slate-900">{DEFAULT_VERIFICATION_NUMBER}</strong></span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Payment steps</h2>
        <p className="text-slate-500 text-sm">Send the exact amount to the following wallet address.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {/* USDT Section */}
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cryptocurrency</label>
                <div className="text-slate-800 font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-[10px]">₮</div>
                  Tether (USDT)
                </div>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Network</label>
                <div className="text-slate-800 font-semibold text-sm">ERC-20 (Ethereum)</div>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">USDT Wallet Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 break-all">
                  {walletAddress}
                </code>
                <button
                  onClick={handleCopyUsdt}
                  className="flex items-center justify-center p-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-100 cursor-pointer"
                  title="Copy Address"
                >
                  {copiedUsdt ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bitcoin Section */}
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cryptocurrency</label>
                <div className="text-slate-800 font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">₿</div>
                  Bitcoin (BTC)
                </div>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Network</label>
                <div className="text-slate-800 font-semibold text-sm">Bitcoin Network</div>
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Bitcoin Wallet Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 break-all">
                  {btcWalletAddress}
                </code>
                <button
                  onClick={handleCopyBtc}
                  className="flex items-center justify-center p-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-100 cursor-pointer"
                  title="Copy Address"
                >
                  {copiedBtc ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onContinue}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg active:scale-[0.98] transition-all cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
