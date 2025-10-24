import { Info, AlertTriangle, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { cn } from '@lib/utils';

/**
 * Componente Callout para destacar informações em posts MDX
 * Tipos: info, warning, success, danger, tip
 */
export default function Callout({ type = 'info', title, children, className }) {
  const config = {
    info: {
      icon: Info,
      classes: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
      iconClasses: 'text-blue-600 dark:text-blue-400',
      titleClasses: 'text-blue-900 dark:text-blue-200',
    },
    warning: {
      icon: AlertTriangle,
      classes: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950',
      iconClasses: 'text-yellow-600 dark:text-yellow-400',
      titleClasses: 'text-yellow-900 dark:text-yellow-200',
    },
    success: {
      icon: CheckCircle,
      classes: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
      iconClasses: 'text-green-600 dark:text-green-400',
      titleClasses: 'text-green-900 dark:text-green-200',
    },
    danger: {
      icon: AlertCircle,
      classes: 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950',
      iconClasses: 'text-red-600 dark:text-red-400',
      titleClasses: 'text-red-900 dark:text-red-200',
    },
    tip: {
      icon: Lightbulb,
      classes: 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950',
      iconClasses: 'text-purple-600 dark:text-purple-400',
      titleClasses: 'text-purple-900 dark:text-purple-200',
    },
  };

  const { icon: Icon, classes, iconClasses, titleClasses } = config[type] || config.info;

  return (
    <div className={cn('my-6 rounded-lg border p-4', classes, className)}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', iconClasses)} />
        </div>
        <div className="flex-1 space-y-1">
          {title && <p className={cn('font-semibold', titleClasses)}>{title}</p>}
          <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}





