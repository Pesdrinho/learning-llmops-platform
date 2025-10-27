import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@lib/firebase';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar se o Firebase está disponível
    if (!auth) {
      console.warn('⚠️ Firebase Auth não disponível - modo offline');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Erro no AuthStateChanged:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Registrar com e-mail e senha
  const signUp = async (email, password, displayName) => {
    try {
      setError(null);
      
      if (!auth) {
        throw new Error('Firebase Auth não disponível');
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login com e-mail e senha
  const signIn = async (email, password) => {
    try {
      setError(null);
      
      if (!auth) {
        throw new Error('Firebase Auth não disponível');
      }
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login com Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      
      if (!auth) {
        throw new Error('Firebase Auth não disponível');
      }
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      return { success: true, user: result.user };
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setError(null);
      
      if (!auth) {
        throw new Error('Firebase Auth não disponível');
      }
      
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Recuperar senha
  const resetPassword = async (email) => {
    try {
      setError(null);
      
      if (!auth) {
        throw new Error('Firebase Auth não disponível');
      }
      
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Traduz mensagens de erro do Firebase
function getErrorMessage(errorCode) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já está sendo usado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/operation-not-allowed': 'Operação não permitida.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/user-disabled': 'Esta conta foi desabilitada.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'Credenciais inválidas.',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
    'auth/popup-closed-by-user': 'Login cancelado.',
    'auth/cancelled-popup-request': 'Login cancelado.',
  };

  return messages[errorCode] || 'Ocorreu um erro. Tente novamente.';
}


