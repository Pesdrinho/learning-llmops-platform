import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function FormProgress({ atual, total, className }) {
  const porcentagem = (atual / total) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          Etapa {atual} de {total}
        </span>
        <span className="font-semibold text-primary">{Math.round(porcentagem)}%</span>
      </div>
      <Progress value={porcentagem} className="h-2" />
    </div>
  );
}

