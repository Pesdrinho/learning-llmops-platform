import { cn } from '@lib/utils';

/**
 * Container wrapper responsivo
 * Centraliza conteúdo e aplica padding adequado
 */
export default function Container({ children, className, size = 'default' }) {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}





