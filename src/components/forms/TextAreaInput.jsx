import { Textarea } from '@/components/ui/textarea';
import QuestionCard from './QuestionCard';
import { useState, useEffect } from 'react';

export default function TextAreaInput({ pergunta, value = '', onChange, obrigatoria, error }) {
  const [caracteres, setCaracteres] = useState(value.length);
  const maxCaracteres = pergunta.maxLength || 500;

  useEffect(() => {
    setCaracteres(value.length);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxCaracteres) {
      onChange(newValue);
    }
  };

  return (
    <QuestionCard pergunta={pergunta.pergunta} obrigatoria={obrigatoria} error={error}>
      <div className="space-y-2">
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder={pergunta.placeholder || 'Digite sua resposta...'}
          className="min-h-[120px] resize-none"
        />
        <div className="flex items-center justify-end text-xs text-muted-foreground">
          {caracteres} / {maxCaracteres}
        </div>
      </div>
    </QuestionCard>
  );
}

