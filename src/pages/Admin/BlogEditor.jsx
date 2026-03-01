import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Container from '@/components/layout/Container';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { createBlogPost, updateBlogPost, getBlogPost, listBlogPosts, deleteBlogPost } from '@/lib/api';

/**
 * Editor de posts do blog
 */
export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [posts, setPosts] = useState([]);

  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    descricao: '',
    conteudo: '',
    tags: '',
    imagem_capa: '',
    autor: user?.displayName || user?.email || '',
    tempo_leitura: '5 min',
    publico_alvo: 'Iniciantes em LLMOps',
    dificuldade: 'Iniciante',
  });

  useEffect(() => {
    loadPosts();
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPosts = async () => {
    try {
      const data = await listBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
    }
  };

  const loadPost = async (postId) => {
    try {
      setLoading(true);
      const post = await getBlogPost(postId);
      setFormData({
        ...post,
        tags: post.tags.join(', '),
      });
    } catch (err) {
      setError(`Erro ao carregar post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-gerar slug a partir do título
    if (name === 'titulo' && !id) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const token = await user.getIdToken();
      
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (id) {
        await updateBlogPost(token, id, postData);
        setSuccess(true);
        setTimeout(() => navigate('/admin/blog'), 1500);
      } else {
        await createBlogPost(token, postData);
        setSuccess(true);
        setTimeout(() => navigate('/admin/blog'), 1500);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      const token = await user.getIdToken();
      await deleteBlogPost(token, postId);
      loadPosts();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <SEO title={id ? 'Editar Post' : 'Novo Post'} />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Admin
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>{id ? 'Editar Post do Blog' : 'Novo Post do Blog'}</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-500 text-green-700">
                  <AlertDescription>
                    Post {id ? 'atualizado' : 'criado'} com sucesso!
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conteudo">Conteúdo (Markdown) *</Label>
                  <Textarea
                    id="conteudo"
                    name="conteudo"
                    value={formData.conteudo}
                    onChange={handleChange}
                    rows={15}
                    className="font-mono text-sm"
                    placeholder="Use Markdown para formatar o conteúdo..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Suporta Markdown: **negrito**, *itálico*, # Título, - lista, etc.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="LLMOps, IA, MLOps"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autor">Autor *</Label>
                    <Input
                      id="autor"
                      name="autor"
                      value={formData.autor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagem_capa">URL da Imagem de Capa *</Label>
                  <Input
                    id="imagem_capa"
                    name="imagem_capa"
                    value={formData.imagem_capa}
                    onChange={handleChange}
                    placeholder="/images/blog/exemplo.jpg"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tempo_leitura">Tempo de Leitura *</Label>
                    <Input
                      id="tempo_leitura"
                      name="tempo_leitura"
                      value={formData.tempo_leitura}
                      onChange={handleChange}
                      placeholder="5 min"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publico_alvo">Público-Alvo *</Label>
                    <Input
                      id="publico_alvo"
                      name="publico_alvo"
                      value={formData.publico_alvo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dificuldade">Dificuldade *</Label>
                    <select
                      id="dificuldade"
                      name="dificuldade"
                      value={formData.dificuldade}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'} Post
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin')}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Lista de posts existentes */}
          {!id && posts.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Posts Existentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {posts.map(post => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{post.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{post.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/admin/blog/${post.id}`)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                        >
                          Deletar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}


