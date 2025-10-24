import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@lib/utils';
import { copyToClipboard } from '@lib/utils';

/**
 * Bloco de código com syntax highlighting e botão de copiar
 * Para MDX posts
 */
export default function CodeBlock({ children, className, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = children?.props?.children || children;
    const success = await copyToClipboard(String(code).trim());
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-6">
      {title && (
        <div className="rounded-t-lg border border-b-0 bg-muted px-4 py-2 text-sm font-medium">
          {title}
        </div>
      )}
      <div className={cn('relative overflow-hidden rounded-lg', title && 'rounded-t-none')}>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <pre className={cn('overflow-x-auto bg-muted p-4', className)}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}





