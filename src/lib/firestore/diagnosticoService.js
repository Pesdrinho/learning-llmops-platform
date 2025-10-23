import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COLLECTION_NAME = 'diagnosticos';

/**
 * Cria um novo diagnóstico
 */
export async function criarDiagnostico(userId, dadosIniciais = {}) {
  try {
    const diagnosticoRef = await addDoc(collection(db, COLLECTION_NAME), {
      userId,
      etapaAtual: 1,
      status: 'em_andamento',
      respostas: {},
      scores: {
        porEtapa: {},
        porNivel: {},
        geral: 0,
      },
      recomendacoes: {
        arquiteturas: [],
        proximosPassos: [],
        recursosRecomendados: [],
      },
      metadados: {
        tempoGasto: 0,
        revisoes: 0,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      completedAt: null,
      ...dadosIniciais,
    });

    return diagnosticoRef.id;
  } catch (error) {
    console.error('Erro ao criar diagnóstico:', error);
    throw error;
  }
}

/**
 * Busca um diagnóstico por ID
 */
export async function getDiagnostico(diagnosticoId) {
  try {
    const diagnosticoRef = doc(db, COLLECTION_NAME, diagnosticoId);
    const diagnosticoSnap = await getDoc(diagnosticoRef);

    if (!diagnosticoSnap.exists()) {
      throw new Error('Diagnóstico não encontrado');
    }

    return {
      id: diagnosticoSnap.id,
      ...diagnosticoSnap.data(),
    };
  } catch (error) {
    console.error('Erro ao buscar diagnóstico:', error);
    throw error;
  }
}

/**
 * Lista todos os diagnósticos de um usuário
 */
export async function listarDiagnosticos(userId) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const diagnosticos = [];

    querySnapshot.forEach((doc) => {
      diagnosticos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return diagnosticos;
  } catch (error) {
    console.error('Erro ao listar diagnósticos:', error);
    throw error;
  }
}

/**
 * Atualiza um diagnóstico
 */
export async function updateDiagnostico(diagnosticoId, dados) {
  try {
    const diagnosticoRef = doc(db, COLLECTION_NAME, diagnosticoId);

    await updateDoc(diagnosticoRef, {
      ...dados,
      updatedAt: serverTimestamp(),
    });

    return diagnosticoId;
  } catch (error) {
    console.error('Erro ao atualizar diagnóstico:', error);
    throw error;
  }
}

/**
 * Atualiza respostas de uma etapa específica
 */
export async function salvarRespostasEtapa(diagnosticoId, nomeEtapa, respostas) {
  try {
    const diagnosticoRef = doc(db, COLLECTION_NAME, diagnosticoId);

    await updateDoc(diagnosticoRef, {
      [`respostas.${nomeEtapa}`]: respostas,
      updatedAt: serverTimestamp(),
    });

    return diagnosticoId;
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    throw error;
  }
}

/**
 * Finaliza um diagnóstico
 */
export async function finalizarDiagnostico(diagnosticoId, scores, recomendacoes) {
  try {
    const diagnosticoRef = doc(db, COLLECTION_NAME, diagnosticoId);

    await updateDoc(diagnosticoRef, {
      status: 'concluido',
      scores,
      recomendacoes,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return diagnosticoId;
  } catch (error) {
    console.error('Erro ao finalizar diagnóstico:', error);
    throw error;
  }
}

/**
 * Deleta um diagnóstico
 */
export async function deletarDiagnostico(diagnosticoId) {
  try {
    const diagnosticoRef = doc(db, COLLECTION_NAME, diagnosticoId);
    await deleteDoc(diagnosticoRef);
    return true;
  } catch (error) {
    console.error('Erro ao deletar diagnóstico:', error);
    throw error;
  }
}

