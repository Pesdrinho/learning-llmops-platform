import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import QuestionCard from './QuestionCard';

export default function RadioInput({ pergunta, opcoes, value, onChange, obrigatoria, error }) {
  return (
    <QuestionCard pergunta={pergunta.pergunta} obrigatoria={obrigatoria} error={error}>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="space-y-3">
          {opcoes.map((opcao) => (
            <div key={opcao.valor} className="flex items-center space-x-3">
              <RadioGroupItem value={opcao.valor} id={`${pergunta.id}-${opcao.valor}`} />
              <Label
                htmlFor={`${pergunta.id}-${opcao.valor}`}
                className="font-normal cursor-pointer"
              >
                {opcao.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </QuestionCard>
  );
}

