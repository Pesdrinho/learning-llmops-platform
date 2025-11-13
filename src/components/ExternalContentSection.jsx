import ExternalContent from './ExternalContent';
import { BookOpen } from 'lucide-react';

/**
 * Seção completa de conteúdos externos
 * @param {Object[]} contents - Array de conteúdos externos
 * @param {string} title - Título da seção (opcional)
 */
export default function ExternalContentSection({ 
  contents = [], 
  title = 'Materiais Complementares' 
}) {
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        {title}
      </h2>
      <p className="text-muted-foreground mb-6">
        Recursos externos selecionados para aprofundar seu conhecimento sobre esta etapa
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contents.map((content, index) => (
          <ExternalContent key={index} {...content} />
        ))}
      </div>
    </section>
  );
}

