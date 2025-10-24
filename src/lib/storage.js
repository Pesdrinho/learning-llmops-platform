/**
 * Módulo de persistência híbrida (localStorage + preparação para Firestore)
 * Por enquanto usa localStorage, mas estruturado para migração futura
 */

const STORAGE_PREFIX = 'llmops_';

/**
 * Salva dados no localStorage
 */
export function saveData(key, data) {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    return true;
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    return false;
  }
}

/**
 * Carrega dados do localStorage
 */
export function loadData(key, defaultValue = null) {
  try {
    const serialized = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (serialized === null) return defaultValue;
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
}

/**
 * Remove dados do localStorage
 */
export function removeData(key) {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
    return false;
  }
}

/**
 * Limpa todos os dados do app no localStorage
 */
export function clearAllData() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
    return false;
  }
}

/**
 * Verifica se uma chave existe no storage
 */
export function hasData(key) {
  return localStorage.getItem(`${STORAGE_PREFIX}${key}`) !== null;
}

// ========================================
// PREPARAÇÃO PARA FIRESTORE (Fase 2+)
// ========================================

/**
 * Placeholder: Salvará dados no Firestore no futuro
 * Por enquanto usa localStorage
 */
export async function saveToFirestore(collection, docId, data, userId) {
  console.log(`[PLACEHOLDER] saveToFirestore: ${collection}/${docId}`, { userId, data });
  // TODO: Implementar com Firestore na Fase 2
  return saveData(`${collection}_${docId}_${userId}`, data);
}

/**
 * Placeholder: Carregará dados do Firestore no futuro
 * Por enquanto usa localStorage
 */
export async function loadFromFirestore(collection, docId, userId) {
  console.log(`[PLACEHOLDER] loadFromFirestore: ${collection}/${docId}`, { userId });
  // TODO: Implementar com Firestore na Fase 2
  return loadData(`${collection}_${docId}_${userId}`);
}

/**
 * Placeholder: Deletará dados do Firestore no futuro
 * Por enquanto usa localStorage
 */
export async function deleteFromFirestore(collection, docId, userId) {
  console.log(`[PLACEHOLDER] deleteFromFirestore: ${collection}/${docId}`, { userId });
  // TODO: Implementar com Firestore na Fase 2
  return removeData(`${collection}_${docId}_${userId}`);
}


