import { arquiteturaRAG } from './rag';
import { arquiteturaFineTuning } from './fine-tuning';
import { arquiteturaPromptOnly } from './prompt-only';

export const ARQUITETURAS = {
  rag: arquiteturaRAG,
  'fine-tuning': arquiteturaFineTuning,
  'prompt-only': arquiteturaPromptOnly,
};

export const LISTA_ARQUITETURAS = Object.values(ARQUITETURAS);

export function getArquitetura(id) {
  return ARQUITETURAS[id];
}

export function filtrarArquiteturas(filtros = {}) {
  let resultado = LISTA_ARQUITETURAS;

  if (filtros.nivel) {
    resultado = resultado.filter((arq) => arq.nivel === filtros.nivel);
  }

  if (filtros.custo) {
    resultado = resultado.filter((arq) => arq.custoEstimado === filtros.custo);
  }

  if (filtros.complexidade) {
    resultado = resultado.filter((arq) => arq.complexidade === filtros.complexidade);
  }

  return resultado;
}

