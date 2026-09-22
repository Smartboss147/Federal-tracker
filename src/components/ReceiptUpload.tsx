import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from '../constants';
import { UploadCloud, CheckCircle, ArrowRight, FileCheck } from 'lucide-react';

interface ReceiptUploadProps {
  onContinue: () => void;
}

export function ReceiptUpload({ onContinue }: ReceiptUploadProps) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-4 sm:mt-8">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 mb-1">
          <span>{t('common.trackingId')}: <strong className="text-slate-900">{DEFAULT_TRACKING_ID}</strong></span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span>{t('common.verificationNumber')}: <strong className="text-slate-900">{DEFAULT_VERIFICATION_NUMBER}</strong></span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{t('receipt.title')}</h2>
        <p className="text-slate-500 text-sm">
          {t('receipt.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        <label
          htmlFor="receipt-upload"
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
            file
              ? 'border-indigo-500 bg-indigo-50/20'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
          }`}
        >
          <input
            id="receipt-upload"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={previewUrl}
                alt="Receipt Preview"
                className="max-h-48 rounded-lg object-contain border border-slate-200 shadow-sm"
              />
              <span className="text-xs font-semibold text-slate-600 truncate max-w-xs">
                {file?.name}
              </span>
              <span className="text-xs text-indigo-600 font-bold hover:underline">{t('receipt.changeFile')}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">{t('receipt.clickUpload')}</p>
              <p className="text-xs text-slate-400 mt-1">{t('receipt.formatHint')}</p>
            </div>
          )}
        </label>

        {file && !uploaded && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {uploading ? (
              <span>{t('receipt.uploading')}</span>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>{t('receipt.confirmUpload')}</span>
              </>
            )}
          </button>
        )}

        {uploaded && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800 text-sm font-semibold">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t('receipt.uploadSuccess')}</span>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            onClick={onContinue}
            disabled={!uploaded && !file}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{t('receipt.proceedVerification')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
