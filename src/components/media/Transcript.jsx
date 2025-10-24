import { useState } from 'react';
import { Button } from '@components/ui/button';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente de transcrição para áudio/vídeo
 * Expansível para acessibilidade
 */
export default function Transcript({ content, title = 'Transcrição' }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 rounded-lg border">
      <Button
        variant="ghost"
        className="w-full justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {title}
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t p-4 text-sm leading-relaxed text-muted-foreground">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}





