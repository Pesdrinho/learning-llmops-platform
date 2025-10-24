import { useEffect, useState } from 'react';
import { cn, scrollToElement } from '@lib/utils';

/**
 * Tabela de Conteúdos com scroll-spy
 * Destaca a seção atual durante a leitura
 */
export default function TableOfContents({ headings, className }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    // Observa todos os headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn('space-y-2', className)} aria-label="Índice">
      <p className="font-semibold text-sm mb-4">Neste artigo</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <button
              onClick={() => scrollToElement(heading.id)}
              className={cn(
                'text-left hover:text-primary transition-colors',
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}





