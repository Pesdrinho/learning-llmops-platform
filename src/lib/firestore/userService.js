import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COLLECTION_NAME = 'users';

/**
 * Cria ou atualiza perfil do usuário
 */
export async function criarPerfilUsuario(userId, dados) {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);

    await setDoc(
      userRef,
      {
        displayName: dados.displayName || '',
        email: dados.email || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...dados,
      },
      { merge: true }
    );

    return userId;
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    throw error;
  }
}

/**
 * Busca perfil do usuário
 */
export async function getPerfilUsuario(userId) {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return {
      id: userSnap.id,
      ...userSnap.data(),
    };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}

/**
 * Atualiza perfil do usuário
 */
export async function atualizarPerfilUsuario(userId, dados) {
  try {
    const userRef = doc(db, COLLECTION_NAME, userId);

    await updateDoc(userRef, {
      ...dados,
      updatedAt: serverTimestamp(),
    });

    return userId;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
}

