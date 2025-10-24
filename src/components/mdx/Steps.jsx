import { cn } from '@lib/utils';

/**
 * Componente de lista numerada estilizada para MDX
 * Usado para tutoriais passo a passo
 */
export function Steps({ children, className }) {
  return (
    <div className={cn('my-6 space-y-6', className)}>
      {children}
    </div>
  );
}

export function Step({ step, title, children, className }) {
  return (
    <div className={cn('relative flex gap-4', className)}>
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {step}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}





