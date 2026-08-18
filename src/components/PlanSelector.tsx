import React, { useState } from 'react';
import { PLANS } from '../constants';
import { Clock, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

interface PlanSelectorProps {
  onSelect: (planId: string) => void;
  onBack: () => void;
}

export function PlanSelector({ onSelect, onBack }: PlanSelectorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(PLANS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlanId) {
      onSelect(selectedPlanId);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 flex-1 flex flex-col w-full max-w-2xl mx-auto mt-4 sm:mt-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Select Recovery Plan</h2>
        <p className="text-slate-500 text-sm">
          Choose a tracking speed and duration tier suitable for your case.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{plan.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration: {plan.durationLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-indigo-600">{plan.priceLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
