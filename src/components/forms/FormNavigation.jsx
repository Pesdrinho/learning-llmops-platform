import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function FormNavigation({
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true,
  isLastStep = false,
  isSubmitting = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t pt-6 mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={!canGoBack || isSubmitting}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <Button
        type="submit"
        onClick={onNext}
        disabled={!canGoNext || isSubmitting}
        className="gap-2"
      >
        {isLastStep ? (
          <>
            <Check className="h-4 w-4" />
            {isSubmitting ? 'Finalizando...' : 'Finalizar'}
          </>
        ) : (
          <>
            {isSubmitting ? 'Salvando...' : 'Próxima'}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}

