import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Network, Database, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface RouteVisualizerProps {
  progress: number;
}

export function RouteVisualizer({ progress }: RouteVisualizerProps) {
  const steps = [
    { label: 'Incident Assessment', desc: 'Case profiling & forensic intake', icon: Database, threshold: 0 },
    { label: 'Blockchain Forensics', desc: 'Cluster analysis & address clustering', icon: Network, threshold: 25 },
    { label: 'Asset Freezing', desc: 'Issuing federal freeze requests', icon: Lock, threshold: 60 },
    { label: 'Final Settlement', desc: 'Funds repatriated to secure escrow', icon: ShieldCheck, threshold: 95 },
  ];

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <span>Trace Route & Intercept Pipeline</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time ledger audit and recovery progression</p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          Status: Active Monitoring
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
                    Live
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
