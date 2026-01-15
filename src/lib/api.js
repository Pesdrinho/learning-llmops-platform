/**
 * Cliente API para comunicação com o backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Faz uma requisição autenticada à API
 */
export async function apiRequest(endpoint, options = {}) {
  const { token, ...fetchOptions } = options;
  
  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
    throw new Error(error.detail || `Erro: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Busca informações do usuário atual
 */
export async function getCurrentUser(token) {
  return apiRequest('/api/users/me', { token });
}

/**
 * Lista todos os usuários (admin only)
 */
export async function listUsers(token, limit = 100) {
  return apiRequest(`/api/users?limit=${limit}`, { token });
}

/**
 * Atualiza role de um usuário (admin only)
 */
export async function updateUserRole(token, uid, role) {
  return apiRequest(`/api/users/${uid}/role`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ role }),
  });
}

// ========== BLOG ENDPOINTS ==========

/**
 * Lista todos os posts do blog
 */
export async function listBlogPosts() {
  return apiRequest('/api/blog');
}

/**
 * Busca um post por ID
 */
export async function getBlogPost(postId) {
  return apiRequest(`/api/blog/${postId}`);
}

/**
 * Cria um novo post (editor/admin)
 */
export async function createBlogPost(token, postData) {
  return apiRequest('/api/blog', {
    method: 'POST',
    token,
    body: JSON.stringify(postData),
  });
}

/**
 * Atualiza um post (editor/admin)
 */
export async function updateBlogPost(token, postId, postData) {
  return apiRequest(`/api/blog/${postId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(postData),
  });
}

/**
 * Deleta um post (admin)
 */
export async function deleteBlogPost(token, postId) {
  return apiRequest(`/api/blog/${postId}`, {
    method: 'DELETE',
    token,
  });
}

// ========== PODCAST ENDPOINTS ==========

/**
 * Lista todos os podcasts
 */
export async function listPodcasts() {
  return apiRequest('/api/podcasts');
}

/**
 * Busca um podcast por ID
 */
export async function getPodcast(podcastId) {
  return apiRequest(`/api/podcasts/${podcastId}`);
}

/**
 * Cria um novo podcast com upload (editor/admin)
 */
export async function createPodcast(token, podcastData, audioFile) {
  const formData = new FormData();
  formData.append('audio_file', audioFile);
  formData.append('podcast_data', JSON.stringify(podcastData));
  
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/podcasts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
    throw new Error(error.detail || `Erro: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Atualiza um podcast (editor/admin)
 */
export async function updatePodcast(token, podcastId, podcastData, audioFile = null) {
  const formData = new FormData();
  if (audioFile) {
    formData.append('audio_file', audioFile);
  }
  formData.append('podcast_data', JSON.stringify(podcastData));
  
  const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/podcasts/${podcastId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
    throw new Error(error.detail || `Erro: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Deleta um podcast (admin)
 */
export async function deletePodcast(token, podcastId) {
  return apiRequest(`/api/podcasts/${podcastId}`, {
    method: 'DELETE',
    token,
  });
}

