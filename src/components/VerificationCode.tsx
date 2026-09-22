import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from '../constants';
import { Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface VerificationCodeProps {
  onSuccess: () => void;
}

export function VerificationCode({ onSuccess }: VerificationCodeProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const REQUIRED_CODE = '144864';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === REQUIRED_CODE) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex-1 flex flex-col w-full max-w-md mx-auto mt-8"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 text-indigo-600">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 mb-2">
          <span>{t('common.trackingId')}: <strong className="text-slate-900">{DEFAULT_TRACKING_ID}</strong></span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span>{t('common.verificationNumber')}: <strong className="text-slate-900">{DEFAULT_VERIFICATION_NUMBER}</strong></span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t('verification.title')}</h2>
        <p className="text-slate-500 text-sm mt-2">
          {t('verification.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setCode(val);
              setError(false);
            }}
            placeholder="000000"
            className={`w-full text-center text-3xl font-mono tracking-[0.5em] py-4 rounded-xl border-2 transition-all focus:outline-none ${
              error 
                ? 'border-rose-400 bg-rose-50 text-rose-600 animate-shake' 
                : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50'
            }`}
          />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 right-0 text-center"
            >
              <p className="text-rose-500 text-xs font-bold flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{t('verification.invalidCode')}</span>
              </p>
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          disabled={code.length !== 6}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{t('verification.verifyButton')}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {t('verification.disclaimer')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
