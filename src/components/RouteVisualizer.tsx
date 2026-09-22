import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Network, Database, CheckCircle2, Lock } from 'lucide-react';

interface RouteVisualizerProps {
  progress: number;
}

export function RouteVisualizer({ progress }: RouteVisualizerProps) {
  const { t } = useTranslation();

  const steps = [
    { label: t('routeVisualizer.step1Title'), desc: t('routeVisualizer.step1Desc'), icon: Database, threshold: 0 },
    { label: t('routeVisualizer.step2Title'), desc: t('routeVisualizer.step2Desc'), icon: Network, threshold: 25 },
    { label: t('routeVisualizer.step3Title'), desc: t('routeVisualizer.step3Desc'), icon: Lock, threshold: 60 },
    { label: t('routeVisualizer.step4Title'), desc: t('routeVisualizer.step4Desc'), icon: ShieldCheck, threshold: 95 },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <span>{t('routeVisualizer.title')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{t('routeVisualizer.subtitle')}</p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {t('routeVisualizer.activeMonitoring')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const isPassed = progress >= step.threshold;
          const isCurrent = progress >= step.threshold && (idx === steps.length - 1 || progress < steps[idx + 1].threshold);
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className={`p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/10'
                  : isPassed
                  ? 'border-emerald-500/30 bg-slate-800/60'
                  : 'border-slate-800 bg-slate-950/40 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isPassed && !isCurrent ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 font-mono">
                    {t('routeVisualizer.live')}
                  </span>
                ) : null}
              </div>

              <h4 className="text-xs font-bold text-slate-200">{step.label}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
