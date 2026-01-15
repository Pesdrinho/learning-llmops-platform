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
import { ArrowLeft, Save, AlertCircle, Upload } from 'lucide-react';
import { createPodcast, updatePodcast, getPodcast, listPodcasts, deletePodcast } from '@/lib/api';

export default function PodcastEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const [formData, setFormData] = useState({
    slug: '',
    numero: 1,
    titulo: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0],
    duracao: '00:00',
    temas: '',
    convidado: {
      nome: '',
      cargo: '',
      empresa: '',
      linkedin: '',
    },
    thumbnail: '',
    audiencia: {
      publico_alvo: '',
      objetivos_aprendizado: '',
      tempo_estimado: '00:00',
    },
    notas: '',
    recursos_relacionados: '',
  });

  useEffect(() => {
    loadPodcasts();
    if (id) {
      loadPodcast(id);
    }
  }, [id]);

  const loadPodcasts = async () => {
    try {
      const data = await listPodcasts();
      setPodcasts(data);
    } catch (err) {
      console.error('Erro ao carregar podcasts:', err);
    }
  };

  const loadPodcast = async (podcastId) => {
    try {
      setLoading(true);
      const podcast = await getPodcast(podcastId);
      setFormData({
        ...podcast,
        temas: podcast.temas.join(', '),
        notas: podcast.notas.map(n => `${n.tempo}: ${n.descricao}`).join('\n'),
        recursos_relacionados: podcast.recursos_relacionados.map(r => `${r.titulo} - ${r.tipo}: ${r.link}`).join('\n'),
        audiencia: {
          ...podcast.audiencia,
          objetivos_aprendizado: podcast.audiencia.objetivos_aprendizado.join('\n'),
        },
      });
    } catch (err) {
      setError(`Erro ao carregar podcast: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('convidado.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        convidado: { ...prev.convidado, [field]: value }
      }));
    } else if (name.startsWith('audiencia.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        audiencia: { ...prev.audiencia, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Auto-gerar slug
    if (name === 'titulo' && !id) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug: `ep${String(prev.numero).padStart(2, '0')}-${slug}` }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError(null);
    } else {
      setError('Por favor, selecione um arquivo de áudio válido');
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!id && !audioFile) {
      setError('Arquivo de áudio é obrigatório para novos episódios');
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const token = await user.getIdToken();
      
      const podcastData = {
        ...formData,
        temas: formData.temas.split(',').map(t => t.trim()).filter(Boolean),
        notas: formData.notas.split('\n').filter(Boolean).map(line => {
          const [tempo, ...rest] = line.split(':');
          return { tempo: tempo.trim(), descricao: rest.join(':').trim() };
        }),
        recursos_relacionados: formData.recursos_relacionados.split('\n').filter(Boolean).map(line => {
          const [titulo, rest] = line.split(' - ');
          const [tipo, link] = rest ? rest.split(': ') : ['Post', ''];
          return { titulo: titulo.trim(), tipo: tipo.trim(), link: link.trim() };
        }),
        audiencia: {
          ...formData.audiencia,
          objetivos_aprendizado: formData.audiencia.objetivos_aprendizado
            .split('\n')
            .map(o => o.trim())
            .filter(Boolean),
        },
      };

      if (id) {
        await updatePodcast(token, id, podcastData, audioFile);
        setSuccess(true);
        setTimeout(() => navigate('/admin/podcasts'), 1500);
      } else {
        await createPodcast(token, podcastData, audioFile);
        setSuccess(true);
        setTimeout(() => navigate('/admin/podcasts'), 1500);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (podcastId) => {
    if (!confirm('Tem certeza que deseja deletar este episódio?')) return;

    try {
      const token = await user.getIdToken();
      await deletePodcast(token, podcastId);
      loadPodcasts();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <SEO title={id ? 'Editar Podcast' : 'Novo Podcast'} />

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
              <CardTitle>{id ? 'Editar Episódio' : 'Novo Episódio de Podcast'}</CardTitle>
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
                    Episódio {id ? 'atualizado' : 'criado'} com sucesso!
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações básicas */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      name="numero"
                      type="number"
                      value={formData.numero}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data">Data *</Label>
                    <Input
                      id="data"
                      name="data"
                      type="date"
                      value={formData.data}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração *</Label>
                    <Input
                      id="duracao"
                      name="duracao"
                      value={formData.duracao}
                      onChange={handleChange}
                      placeholder="29:25"
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="temas">Temas (separados por vírgula) *</Label>
                  <Input
                    id="temas"
                    name="temas"
                    value={formData.temas}
                    onChange={handleChange}
                    placeholder="MLOps, LLMOps, IA"
                    required
                  />
                </div>

                {/* Arquivo de áudio */}
                <div className="space-y-2">
                  <Label htmlFor="audio">
                    Arquivo de Áudio {id ? '(opcional - deixe vazio para manter)' : '*'}
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      required={!id}
                    />
                    {audioFile && (
                      <span className="text-sm text-muted-foreground">
                        {audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    )}
                  </div>
                </div>

                {/* Convidado */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">Convidado</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="convidado.nome">Nome *</Label>
                      <Input
                        id="convidado.nome"
                        name="convidado.nome"
                        value={formData.convidado.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="convidado.cargo">Cargo *</Label>
                      <Input
                        id="convidado.cargo"
                        name="convidado.cargo"
                        value={formData.convidado.cargo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="convidado.empresa">Empresa</Label>
                      <Input
                        id="convidado.empresa"
                        name="convidado.empresa"
                        value={formData.convidado.empresa}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="convidado.linkedin">LinkedIn</Label>
                      <Input
                        id="convidado.linkedin"
                        name="convidado.linkedin"
                        value={formData.convidado.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Audiência */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">Audiência</h3>
                  <div className="space-y-2">
                    <Label htmlFor="audiencia.publico_alvo">Público-Alvo *</Label>
                    <Input
                      id="audiencia.publico_alvo"
                      name="audiencia.publico_alvo"
                      value={formData.audiencia.publico_alvo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audiencia.objetivos_aprendizado">
                      Objetivos de Aprendizado (um por linha) *
                    </Label>
                    <Textarea
                      id="audiencia.objetivos_aprendizado"
                      name="audiencia.objetivos_aprendizado"
                      value={formData.audiencia.objetivos_aprendizado}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Imagem */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">URL da Thumbnail *</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="/images/podcast/ep01.jpg"
                    required
                  />
                </div>

                {/* Notas */}
                <div className="space-y-2">
                  <Label htmlFor="notas">Notas (formato: tempo: descrição, uma por linha)</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    rows={5}
                    placeholder="00:00: Introdução&#10;05:00: Primeiro tópico"
                  />
                </div>

                {/* Recursos */}
                <div className="space-y-2">
                  <Label htmlFor="recursos_relacionados">
                    Recursos Relacionados (formato: Título - Tipo: Link, um por linha)
                  </Label>
                  <Textarea
                    id="recursos_relacionados"
                    name="recursos_relacionados"
                    value={formData.recursos_relacionados}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Post do Blog - Post: /blog/slug"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'} Episódio
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

          {/* Lista de podcasts */}
          {!id && podcasts.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Episódios Existentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {podcasts.map(podcast => (
                    <div
                      key={podcast.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">EP {podcast.numero}: {podcast.titulo}</h4>
                        <p className="text-sm text-muted-foreground">{podcast.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/admin/podcasts/${podcast.id}`)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(podcast.id)}
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


