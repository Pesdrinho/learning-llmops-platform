import { useMemo } from 'react';
import glossaryData from '@/data/glossary.json';

/**
 * Hook para buscar termos do glossário
 * @returns {Object} Funções e dados do glossário
 */
export function useGlossary() {
  const glossaryMap = useMemo(() => {
    const map = new Map();
    glossaryData.forEach((item) => {
      map.set(item.term.toLowerCase(), item);
    });
    return map;
  }, []);

  const getTerm = (term) => {
    if (!term) return null;
    return glossaryMap.get(term.toLowerCase()) || null;
  };

  const getAllTerms = () => {
    return glossaryData;
  };

  const searchTerms = (query) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return glossaryData.filter(
      (item) =>
        item.term.toLowerCase().includes(lowerQuery) ||
        item.shortDef.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    getTerm,
    getAllTerms,
    searchTerms,
    glossaryMap,
  };
}

