/**
 * Dados dos episódios do podcast
 * Conteúdo separado em arquivos individuais para melhor modularidade
 */

import { episode as ep01 } from '@content/podcast/ep01';
import { episode as ep02 } from '@content/podcast/ep02';
import { episode as ep03 } from '@content/podcast/ep03';
import { episode as ep04 } from '@content/podcast/ep04';

export const podcastEpisodes = [ep01, ep02, ep03, ep04];

// Helper para obter episódio por slug
export const getEpisodePorSlug = (slug) => {
  return podcastEpisodes.find((ep) => ep.slug === slug) || null;
};

// Helper para obter episódio por número
export const getEpisodePorNumero = (numero) => {
  return podcastEpisodes.find((ep) => ep.numero === numero) || null;
};

// Helper para ordenar episódios (mais recentes primeiro)
export const getEpisodiosOrdenados = () => {
  return [...podcastEpisodes].sort((a, b) => new Date(b.data) - new Date(a.data));
};

// Helper para obter total de episódios
export const getTotalEpisodios = () => {
  return podcastEpisodes.length;
};




