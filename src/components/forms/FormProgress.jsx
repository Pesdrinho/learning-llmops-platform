import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FormProgress({ atual, total, etapasCompletadas = [], className, onEtapaClick }) {
  const porcentagem = (atual / total) * 100;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          Etapa {atual} de {total}
        </span>
        <span className="font-semibold text-primary">{Math.round(porcentagem)}%</span>
      </div>
      <Progress value={porcentagem} className="h-2" />
      
      {/* Indicador visual de etapas */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((etapaNum) => {
          const isCompleta = etapasCompletadas.includes(etapaNum);
          const isAtual = etapaNum === atual;
          const isAcessivel = isCompleta || etapaNum <= atual;

          return (
            <button
              key={etapaNum}
              onClick={() => isAcessivel && onEtapaClick && onEtapaClick(etapaNum)}
              disabled={!isAcessivel || !onEtapaClick}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all',
                isAtual && 'ring-2 ring-primary ring-offset-2',
                isCompleta && 'bg-primary text-primary-foreground',
                !isCompleta && isAcessivel && 'bg-muted text-muted-foreground hover:bg-muted/80',
                !isAcessivel && 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed',
                isAcessivel && onEtapaClick && 'cursor-pointer'
              )}
              title={`Etapa ${etapaNum}${isCompleta ? ' (completa)' : ''}`}
            >
              {isCompleta ? <Check className="h-4 w-4" /> : etapaNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}

