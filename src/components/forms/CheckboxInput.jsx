import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import QuestionCard from './QuestionCard';

export default function CheckboxInput({ pergunta, opcoes, value = [], onChange, obrigatoria, error }) {
  const handleToggle = (opcaoValor) => {
    const newValue = value.includes(opcaoValor)
      ? value.filter((v) => v !== opcaoValor)
      : [...value, opcaoValor];
    onChange(newValue);
  };

  return (
    <QuestionCard pergunta={pergunta.pergunta} obrigatoria={obrigatoria} error={error}>
      <div className="space-y-3">
        {opcoes.map((opcao) => (
          <div key={opcao.valor} className="flex items-center space-x-3">
            <Checkbox
              id={`${pergunta.id}-${opcao.valor}`}
              checked={value.includes(opcao.valor)}
              onCheckedChange={() => handleToggle(opcao.valor)}
            />
            <Label
              htmlFor={`${pergunta.id}-${opcao.valor}`}
              className="font-normal cursor-pointer"
            >
              {opcao.label}
            </Label>
          </div>
        ))}
      </div>
    </QuestionCard>
  );
}

