import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TrackerState } from '../types';
import { PLANS, DEFAULT_TRACKING_ID, DEFAULT_VERIFICATION_NUMBER } from '../constants';
import { RouteVisualizer } from './RouteVisualizer';
import { AgentContactCard } from './AgentContactCard';
import { formatTimeRemaining, formatDateTime } from '../utils';
import { Clock, RotateCcw, UserCheck, Landmark, MessageSquare } from 'lucide-react';
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
  const [isAgentHighlighted, setIsAgentHighlighted] = useState(false);
  const agentSectionRef = useRef<HTMLDivElement>(null);

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

  const handleContactAgentClick = () => {
    if (agentSectionRef.current) {
      agentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const el = document.getElementById('agent-contact-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsAgentHighlighted(true);
    setTimeout(() => {
      setIsAgentHighlighted(false);
    }, 2200);
  };

  const planTitle = plan.id === 'fast' ? (t('planSelector.fastTitle') || t('plans.fastTitle')) : plan.id === 'medium' ? (t('planSelector.mediumTitle') || t('plans.mediumTitle')) : (t('planSelector.slowTitle') || t('plans.slowTitle'));
  const planDuration = plan.id === 'fast' ? (t('planSelector.fastDuration') || t('plans.fastDuration')) : plan.id === 'medium' ? (t('planSelector.mediumDuration') || t('plans.mediumDuration')) : (t('planSelector.slowDuration') || t('plans.slowDuration'));

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-4 sm:mt-8 pb-12">
      {/* Federal Funds Tracking Console Header Card - Sole Authoritative Display of Tracking ID */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800">{t('dashboard.title')}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t('dashboard.active')}
                </span>
              </div>
              {/* The Authoritative Tracking ID & Verification Number Display */}
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

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="nav-contact-agent-button"
              type="button"
              onClick={handleContactAgentClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('agent.contactButtonNav')}</span>
            </button>

            <button
              type="button"
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

      {/* Trace Route & Intercept Pipeline */}
      <RouteVisualizer progress={progress} />

      {/* Message Your Live Tracking Agent Section */}
      <AgentContactCard isHighlighted={isAgentHighlighted} cardRef={agentSectionRef} />

      {/* Verified Profile & Case File Information Card */}
      {state.incidentInfo && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">{t('dashboard.verifiedProfileTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
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
