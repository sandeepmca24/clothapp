import React from 'react';
import { useSwap } from '../context/SwapContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notification } = useSwap();

  if (!notification) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    warning: 'border-amber-200 bg-amber-50/90 text-amber-950',
    info: 'border-neutral-200 bg-white text-neutral-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md ${borderColors[notification.type]}`}>
        {icons[notification.type]}
        <p className="text-xs font-medium leading-relaxed">
          {notification.message}
        </p>
      </div>
    </div>
  );
};
