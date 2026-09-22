import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrackerState, IncidentInfo } from './types';
import { DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from './constants';
import { PersonalDetailsForm } from './components/PersonalDetailsForm';
import { PlanSelector } from './components/PlanSelector';
import { PaymentScreen } from './components/PaymentScreen';
import { ReceiptUpload } from './components/ReceiptUpload';
import { VerificationCode } from './components/VerificationCode';
import { TrackerDashboard } from './components/TrackerDashboard';
import { LanguageDropdown } from './components/LanguageDropdown';
import { ShieldCheck, RotateCcw, Landmark } from 'lucide-react';

const STORAGE_KEY = 'federal_funds_tracker_state';

const initialState: TrackerState = {
  id: DEFAULT_TRACKING_ID,
  verificationNumber: DEFAULT_VERIFICATION_NUMBER,
  step: 0,
  planId: null,
  startTime: null,
};

export function App() {
  const { t } = useTranslation();
  const [trackerState, setTrackerState] = useState<TrackerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          id: DEFAULT_TRACKING_ID,
          verificationNumber: DEFAULT_VERIFICATION_NUMBER,
        };
      }
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
    return initialState;
  });

  const saveState = (newState: TrackerState) => {
    const updatedState = {
      ...newState,
      id: DEFAULT_TRACKING_ID,
      verificationNumber: DEFAULT_VERIFICATION_NUMBER,
    };
    setTrackerState(updatedState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  };

  const handleInfoContinue = (info: IncidentInfo) => {
    saveState({
      ...trackerState,
      incidentInfo: info,
      step: 1,
    });
  };

  const handlePlanSelect = (planId: string) => {
    saveState({
      ...trackerState,
      planId,
      step: 2,
    });
  };

  const handleNextStep = () => {
    if (trackerState.step === 2) {
      saveState({ ...trackerState, step: 3 });
    } else if (trackerState.step === 3) {
      saveState({ ...trackerState, step: 5 });
    }
  };

  const handleVerificationSuccess = () => {
    saveState({ ...trackerState, step: 4, startTime: Date.now() });
  };

  const handleBackToInfo = () => {
    saveState({ ...trackerState, step: 0 });
  };

  const handleRestart = () => {
    const freshState: TrackerState = {
      id: DEFAULT_TRACKING_ID,
      verificationNumber: DEFAULT_VERIFICATION_NUMBER,
      step: 0,
      planId: null,
      startTime: null,
      incidentInfo: trackerState.incidentInfo, // Preload existing user info
    };
    saveState(freshState);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight block">
                {t('common.appTitle')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                {t('common.appSubtitle')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline">{t('common.secureChannel')}</span>
              <span className="md:hidden">{t('common.encrypted')}</span>
            </div>
            <LanguageDropdown />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-start">
        {trackerState.step === 0 && (
          <PersonalDetailsForm
            initialData={trackerState.incidentInfo}
            onContinue={handleInfoContinue}
            onCancel={handleRestart}
          />
        )}
        {trackerState.step === 1 && (
          <PlanSelector
            onSelect={handlePlanSelect}
            onBack={handleBackToInfo}
          />
        )}
        {trackerState.step === 2 && (
          <PaymentScreen onContinue={handleNextStep} />
        )}
        {trackerState.step === 3 && (
          <ReceiptUpload onContinue={handleNextStep} />
        )}
        {trackerState.step === 5 && (
          <VerificationCode onSuccess={handleVerificationSuccess} />
        )}
        {trackerState.step === 4 && (
          <TrackerDashboard state={trackerState} onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>{t('common.footerRights', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
