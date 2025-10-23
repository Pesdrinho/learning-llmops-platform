import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export default function QuestionCard({
  pergunta,
  obrigatoria = false,
  children,
  error,
  className,
}) {
  return (
    <Card className={cn('p-6 space-y-4', error && 'border-destructive', className)}>
      <div className="space-y-2">
        <Label className="text-base font-semibold">
          {pergunta}
          {obrigatoria && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>

      {children}

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </Card>
  );
}

