import { useState, useEffect } from 'react';
import RadioInput from '@/components/forms/RadioInput';
import CheckboxInput from '@/components/forms/CheckboxInput';
import ScaleInput from '@/components/forms/ScaleInput';
import TextAreaInput from '@/components/forms/TextAreaInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function EtapaFormulario({ configEtapa, respostasIniciais = {}, onSubmit }) {
  const [respostas, setRespostas] = useState(respostasIniciais);
  const [erros, setErros] = useState({});

  useEffect(() => {
    setRespostas(respostasIniciais);
  }, [respostasIniciais]);

  const handleChange = (perguntaId, valor) => {
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: valor,
    }));

    // Remove erro quando usuário responde
    if (erros[perguntaId]) {
      setErros((prev) => {
        const novosErros = { ...prev };
        delete novosErros[perguntaId];
        return novosErros;
      });
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    configEtapa.perguntas.forEach((pergunta) => {
      if (pergunta.obrigatoria) {
        const resposta = respostas[pergunta.id];

        if (!resposta || (Array.isArray(resposta) && resposta.length === 0)) {
          novosErros[pergunta.id] = 'Esta pergunta é obrigatória';
        } else if (pergunta.tipo === 'textarea' && resposta.trim().length < 10) {
          novosErros[pergunta.id] = 'Resposta muito curta (mínimo 10 caracteres)';
        }
      }
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(respostas);
    } else {
      // Scroll para o primeiro erro
      const primeiroErro = document.querySelector('[data-error="true"]');
      if (primeiroErro) {
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const renderPergunta = (pergunta) => {
    const valor = respostas[pergunta.id];
    const erro = erros[pergunta.id];

    const props = {
      key: pergunta.id,
      pergunta,
      value: valor,
      onChange: (v) => handleChange(pergunta.id, v),
      obrigatoria: pergunta.obrigatoria,
      error: erro,
    };

    switch (pergunta.tipo) {
      case 'radio':
        return <RadioInput {...props} opcoes={pergunta.opcoes} />;

      case 'checkbox':
        return <CheckboxInput {...props} opcoes={pergunta.opcoes} />;

      case 'escala':
        return <ScaleInput {...props} />;

      case 'textarea':
        return <TextAreaInput {...props} />;

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Cabeçalho da etapa */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">{configEtapa.titulo}</h2>
        <p className="text-lg text-muted-foreground">{configEtapa.descricao}</p>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Público:</strong> {configEtapa.publico}
            <br />
            <strong>Objetivo:</strong> {configEtapa.objetivo}
          </AlertDescription>
        </Alert>
      </div>

      {/* Perguntas */}
      <div className="space-y-6">
        {configEtapa.perguntas.map((pergunta) => (
          <div key={pergunta.id} data-error={!!erros[pergunta.id]}>
            {renderPergunta(pergunta)}
          </div>
        ))}
      </div>
    </form>
  );
}

