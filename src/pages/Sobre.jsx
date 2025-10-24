import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { portifolio } from '@data/portifolio';
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Mic,
  Users,
  Award,
  ExternalLink,
  Calendar,
} from 'lucide-react';

/**
 * Página de portfólio pessoal
 */
export default function Sobre() {
  return (
    <>
      <SEO
        title="Sobre"
        description={`${portifolio.hero.nome} - ${portifolio.hero.cargo}`}
        type="profile"
      />

      {/* Hero Section */}
      <div className="gradient-hero border-b">
        <Container className="py-16">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] items-start">
            {/* Foto */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-orange-600 p-1">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-6xl font-bold text-muted-foreground">
                {portifolio.hero.nome.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{portifolio.hero.nome}</h1>
                <p className="text-xl text-muted-foreground mb-3">{portifolio.hero.cargo}</p>
                <p className="text-base leading-relaxed max-w-3xl">{portifolio.hero.bio}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {portifolio.hero.localizacao}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {portifolio.hero.email}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={portifolio.hero.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={portifolio.hero.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={portifolio.hero.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="space-y-16">
          {/* Experiência Profissional */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Experiência Profissional</h2>
            </div>

            <div className="space-y-8">
              {portifolio.experiencias.map((exp) => (
                <Card key={exp.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">{exp.cargo}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {exp.empresa} • {exp.local}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {exp.periodo}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{exp.descricao}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Principais Realizações:</h4>
                      <ul className="space-y-1.5 ml-4">
                        {exp.realizacoes.map((realizacao, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span className="flex-1">{realizacao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tecnologias.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Formação Acadêmica */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Formação Acadêmica</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portifolio.formacao.map((form) => (
                <Card key={form.id}>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {form.periodo}
                    </Badge>
                    <CardTitle className="text-lg">{form.grau}</CardTitle>
                    <CardDescription>{form.instituicao}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Área:</strong> {form.area}</p>
                    {form.tese && <p><strong>Tese:</strong> {form.tese}</p>}
                    {form.dissertacao && <p><strong>Dissertação:</strong> {form.dissertacao}</p>}
                    {form.honras && (
                      <Badge variant="outline" className="mt-2">
                        {form.honras}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Projetos */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Projetos Realizados</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {portifolio.projetos.map((projeto) => (
                <Card key={projeto.id} className={projeto.destaque ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                      {projeto.destaque && <Badge variant="default">Destaque</Badge>}
                    </div>
                    <CardDescription>{projeto.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {projeto.tecnologias.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{projeto.status}</Badge>
                      {projeto.link && (
                        <Button asChild size="sm" variant="ghost">
                          <a href={projeto.link} target="_blank" rel="noopener noreferrer">
                            Ver projeto
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Palestras */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Mic className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Palestras Ministradas</h2>
            </div>

            <div className="space-y-4">
              {portifolio.palestras.map((palestra) => (
                <Card key={palestra.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{palestra.titulo}</CardTitle>
                        <CardDescription className="mt-2">
                          {palestra.evento} • {palestra.local}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-start md:items-end">
                        <Badge variant="secondary">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(palestra.data).toLocaleDateString('pt-BR')}
                        </Badge>
                        <Badge variant="outline">{palestra.tipo}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{palestra.audiencia}</span>
                    {palestra.link && (
                      <Button asChild size="sm" variant="ghost">
                        <a href={palestra.link} target="_blank" rel="noopener noreferrer">
                          Ver gravação
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Consultorias */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Consultorias Prestadas</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portifolio.consultorias.map((consultoria) => (
                <Card key={consultoria.id}>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {consultoria.periodo}
                    </Badge>
                    <CardTitle className="text-lg">{consultoria.cliente}</CardTitle>
                    <CardDescription>{consultoria.projeto}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{consultoria.descricao}</p>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Resultados:</h4>
                      <ul className="space-y-1">
                        {consultoria.resultados.map((resultado, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span className="flex-1">{resultado}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Habilidades Técnicas */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Habilidades Técnicas</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(portifolio.habilidades).map(([categoria, habilidades]) => (
                <Card key={categoria}>
                  <CardHeader>
                    <CardTitle className="text-lg">{categoria}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {habilidades.map((hab) => (
                        <Badge key={hab} variant="secondary" className="text-xs">
                          {hab}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certificações */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Certificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {portifolio.certificacoes.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{cert.nome}</p>
                        <p className="text-xs text-muted-foreground">{cert.instituicao}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {cert.ano}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Container>
    </>
  );
}


