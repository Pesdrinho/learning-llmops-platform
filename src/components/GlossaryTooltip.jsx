import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import { useGlossary } from '@/hooks/useGlossary';
import { HelpCircle } from 'lucide-react';

/**
 * Componente de tooltip que exibe definições do glossário
 * @param {string} term - Termo do glossário a ser exibido
 * @param {React.ReactNode} children - Conteúdo que acionará o tooltip (opcional)
 * @param {string} className - Classes CSS adicionais
 */
export default function GlossaryTooltip({ term, children, className = '' }) {
  const { getTerm } = useGlossary();
  const glossaryTerm = getTerm(term);

  if (!glossaryTerm) {
    return children || term;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ? (
            <span className={`cursor-help underline decoration-dotted decoration-muted-foreground underline-offset-2 ${className}`}>
              {children}
            </span>
          ) : (
            <span className={`inline-flex items-center gap-1 cursor-help underline decoration-dotted decoration-muted-foreground underline-offset-2 ${className}`}>
              {term}
              <HelpCircle className="h-3 w-3 text-muted-foreground" />
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs" side="top">
          <div className="space-y-1">
            <p className="font-semibold">{glossaryTerm.term}</p>
            <p className="text-xs text-muted-foreground">{glossaryTerm.shortDef}</p>
            {glossaryTerm.longDef && (
              <p className="text-xs leading-relaxed pt-1 border-t">{glossaryTerm.longDef}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

