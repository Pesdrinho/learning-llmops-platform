import { useState } from 'react';
import { Input } from '@components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@components/ui/button';

/**
 * Barra de busca com sugestões
 * @param {string} value - Valor atual da busca
 * @param {function} onChange - Callback quando o valor muda
 * @param {string} placeholder - Texto placeholder
 */
export default function SearchBar({ value, onChange, placeholder = 'Buscar guias...' }) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

