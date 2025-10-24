import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { motion } from 'framer-motion';
import {
  BookOpen,
  LineChart,
  Blocks,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

/**
 * Página Home
 * Hero + Features + Últimos posts + CTA
 */
export default function Home() {
  const features = [
    {
      icon: LineChart,
      title: 'Diagnóstico Inteligente',
      description:
        'Avalie a maturidade digital da sua organização e receba recomendações personalizadas de arquitetura LLMOps.',
      href: '/diagnostico',
      badge: 'Requer login',
    },
    {
      icon: Blocks,
      title: 'Galeria de Arquiteturas',
      description:
        'Explore arquiteturas de referência (RAG, Fine-tuning, Agentes) com visualizações interativas e métricas detalhadas.',
      href: '/arquiteturas',
      badge: 'Requer login',
    },
    {
      icon: Target,
      title: 'Laboratório Interativo',
      description:
        'Monte sua própria arquitetura LLMOps arrastando blocos e validando decisões com base em boas práticas.',
      href: '/laboratorio',
      badge: 'Em breve',
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Guia Completo',
      description: 'Macro-etapas, níveis organizacionais e framework estratégico',
      href: '/guia',
    },
    {
      icon: Sparkles,
      title: 'Blog',
      description: 'Artigos técnicos e cases sobre LLMOps',
      href: '/blog',
    },
    {
      icon: Zap,
      title: 'Podcast',
      description: 'Conversas com especialistas e líderes da área',
      href: '/podcast',
    },
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Plataforma interativa para aprendizado e implementação de sistemas LLMOps"
      />

      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-4">Plataforma LLMOps</Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transforme seu conhecimento em{' '}
              <span className="text-primary">sistemas LLMOps escaláveis</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Uma plataforma completa para aprender, planejar e implementar arquiteturas de LLM
              com base em frameworks estratégicos e boas práticas da indústria.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/cadastro">
                  Começar agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/guia">Explorar guia</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ferramentas Interativas</h2>
            <p className="text-muted-foreground">
              Recursos práticos para cada etapa da sua jornada LLMOps
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {feature.badge && (
                          <Badge variant="outline" className="text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="ghost" className="w-full">
                        <Link to={feature.href}>
                          Explorar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* O que é LLMOps */}
      <section className="bg-muted/50 py-20">
        <Container size="sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">O que é LLMOps?</h2>
            <div className="mdx-content">
              <p>
                <strong>LLMOps</strong> (Large Language Model Operations) é a prática de
                operacionalizar e gerenciar o ciclo de vida completo de sistemas baseados em
                modelos de linguagem grandes, desde o desenvolvimento até a produção.
              </p>
              <p>
                Assim como MLOps trouxe práticas DevOps para Machine Learning, LLMOps estabelece
                processos, ferramentas e governança específicos para aplicações de LLM,
                considerando desafios únicos como custos de inferência, latência, qualidade de
                respostas e riscos de segurança.
              </p>
              <p>
                Nossa plataforma unifica conhecimento, frameworks estratégicos e ferramentas
                práticas para ajudar você a tomar decisões informadas em cada etapa do seu
                projeto LLM.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Recursos de Aprendizado</h2>
            <p className="text-muted-foreground">
              Conteúdo curado para todos os níveis de experiência
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.title} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="w-full">
                      <Link to={resource.href}>
                        Acessar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="bg-primary py-20 text-primary-foreground">
        <Container size="sm" className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Pronto para começar?</h2>
          <p className="mb-8 text-lg opacity-90">
            Crie sua conta gratuitamente e tenha acesso a todas as ferramentas da plataforma.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/cadastro">Cadastre-se agora</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}



