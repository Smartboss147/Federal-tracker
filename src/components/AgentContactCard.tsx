import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserCheck, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { TRACKING_AGENT } from '../constants';

interface AgentContactCardProps {
  isHighlighted?: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export function AgentContactCard({ isHighlighted = false, cardRef }: AgentContactCardProps) {
  const { t } = useTranslation();

  return (
    <div
      ref={cardRef}
      id="agent-contact-section"
      className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 bg-slate-900 border text-white shadow-xl relative overflow-hidden ${
        isHighlighted
          ? 'border-purple-400 ring-4 ring-purple-500/40 shadow-2xl shadow-purple-500/25 scale-[1.01]'
          : 'border-purple-500/30 hover:border-purple-500/50 shadow-slate-950/20'
      }`}
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>{t('agent.statusBadge')}</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
          {t('agent.title')}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
          {t('agent.subtitle')}
        </p>
      </div>

      {/* Agent details & Action */}
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Agent Info Profile */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Person Icon / Avatar */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-900/90 via-purple-900/60 to-slate-950 border border-purple-400/40 flex items-center justify-center text-purple-200 shadow-md">
              <UserCheck className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"
              title="Online"
            />
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {TRACKING_AGENT.name}
              </h4>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {t('agent.liveTrackingAgent')}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-300">
              <a
                href={`tel:${TRACKING_AGENT.phone.replace(/[\s-]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-purple-300 transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{TRACKING_AGENT.phone}</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-300 font-medium">
                  {TRACKING_AGENT.messagingApp} App
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="w-full md:w-auto shrink-0">
          <a
            id="message-agent-signal-button"
            href={TRACKING_AGENT.signalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            <span>{t('agent.messageButton')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
