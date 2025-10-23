import { Slider } from '@/components/ui/slider';
import QuestionCard from './QuestionCard';
import { cn } from '@/lib/utils';

export default function ScaleInput({ pergunta, value = 5, onChange, obrigatoria, error }) {
  const { min = 1, max = 10, labels = {} } = pergunta;

  return (
    <QuestionCard pergunta={pergunta.pergunta} obrigatoria={obrigatoria} error={error}>
      <div className="space-y-4">
        {/* Valor atual */}
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-primary">{value}</div>
        </div>

        {/* Slider */}
        <Slider
          min={min}
          max={max}
          step={1}
          value={[value]}
          onValueChange={(newValue) => onChange(newValue[0])}
          className="cursor-pointer"
        />

        {/* Labels */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {Object.entries(labels).map(([num, label]) => (
            <span
              key={num}
              className={cn(
                'transition-colors',
                parseInt(num) === value && 'text-primary font-semibold'
              )}
            >
              {num}: {label}
            </span>
          ))}
        </div>
      </div>
    </QuestionCard>
  );
}

