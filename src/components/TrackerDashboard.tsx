import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrackerState } from '../types';
import { PLANS, DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from '../constants';
import { RouteVisualizer } from './RouteVisualizer';
import { formatTimeRemaining, formatDateTime } from '../utils';
import { ShieldCheck, Clock, CheckCircle, RotateCcw, AlertTriangle, UserCheck, Landmark } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrackerDashboardProps {
  state: TrackerState;
  onRestart: () => void;
}

export function TrackerDashboard({ state, onRestart }: TrackerDashboardProps) {
  const { t } = useTranslation();
  const plan = PLANS.find(p => p.id === state.planId) || PLANS[0];
  const startTime = state.startTime || Date.now();
  const totalDuration = plan.durationMs;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsed = Math.max(0, now - startTime);
  const remaining = Math.max(0, totalDuration - elapsed);
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  const isCompleted = remaining === 0;

  useEffect(() => {
    if (isCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [isCompleted]);

  const planTitle = plan.id === 'fast' ? t('plans.fastTitle') : plan.id === 'medium' ? t('plans.mediumTitle') : t('plans.slowTitle');
  const planDuration = plan.id === 'fast' ? t('plans.fastDuration') : plan.id === 'medium' ? t('plans.mediumDuration') : t('plans.slowDuration');

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8 pb-12">
      {/* Header card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800">{t('dashboard.title')}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t('dashboard.active')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                <p>
                  {t('common.trackingId')}: <span className="font-mono font-semibold text-slate-800">{state.id || DEFAULT_TRACKING_ID}</span>
                </p>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <p>
                  {t('common.verificationNumber')}: <span className="font-mono font-semibold text-slate-800">{state.verificationNumber || DEFAULT_VERIFICATION_NUMBER}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRestart}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('dashboard.newSession')}</span>
            </button>
          </div>
        </div>

        {/* Live Progress Section */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('dashboard.liveProgress')}</span>
              <span className="text-3xl font-extrabold text-indigo-600 font-mono tracking-tight">
                {progress.toFixed(2)}%
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('dashboard.estimatedRemaining')}</span>
              <div className="flex items-center gap-1.5 text-slate-800 font-mono font-bold text-lg justify-end">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{formatTimeRemaining(remaining)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>{t('dashboard.started', { date: formatDateTime(startTime) })}</span>
            <span>{t('dashboard.planLabel', { plan: planTitle, duration: planDuration })}</span>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <RouteVisualizer progress={progress} />

      {/* Incident Information Card */}
      {state.incidentInfo && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-800">{t('dashboard.verifiedProfileTitle')}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                {t('common.trackingId')}: <span className="text-slate-900">{state.id || DEFAULT_TRACKING_ID}</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                {t('common.verificationNumber')}: <span className="text-indigo-900">{state.verificationNumber || DEFAULT_VERIFICATION_NUMBER}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.caseTrackingId')}</span>
              <span className="text-slate-800 font-bold font-mono text-sm">{state.id || DEFAULT_TRACKING_ID}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('common.verificationNumber')}</span>
              <span className="text-slate-800 font-bold font-mono text-sm">{state.verificationNumber || DEFAULT_VERIFICATION_NUMBER}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.fullName')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.dateOfBirth')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.dateOfBirth}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.maritalStatus')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.maritalStatus || t('dashboard.na')}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.residentialAddress')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.residentialAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.workAddress')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.workAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">{t('dashboard.employment')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.employmentType} {state.incidentInfo.employerName ? `(${state.incidentInfo.employerName})` : ''}</span>
            </div>
            <div className="sm:col-span-3">
              <span className="text-slate-400 font-medium block">{t('dashboard.claimedAmount')}</span>
              <span className="text-slate-800 font-bold text-sm">{state.incidentInfo.currency} {state.incidentInfo.amount}</span>
            </div>
            <div className="sm:col-span-3">
              <span className="text-slate-400 font-medium block mb-1">{t('dashboard.incidentDescription')}</span>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 text-xs leading-relaxed">
                {state.incidentInfo.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
