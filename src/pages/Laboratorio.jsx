import SEO from '@components/SEO';
import Container from '@components/layout/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Alert, AlertDescription } from '@components/ui/alert';
import { Info } from 'lucide-react';

/**
 * Página do Laboratório (Placeholder para Fase 4)
 */
export default function Laboratorio() {
  return (
    <>
      <SEO
        title="Laboratório de Arquiteturas"
        description="Monte sua própria arquitetura LLMOps"
      />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold">Laboratório de Arquiteturas</h1>
            <p className="text-lg text-muted-foreground">
              Componha sua arquitetura LLMOps com blocos drag-and-drop
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Esta funcionalidade será implementada na Fase 4. Por enquanto, explore as
              arquiteturas de referência no guia.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>O que você encontrará aqui (em breve)</CardTitle>
              <CardDescription>
                Funcionalidades planejadas para esta página
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  1
                </div>
                <div>
                  <p className="font-medium">Biblioteca de Blocos</p>
                  <p className="text-sm text-muted-foreground">
                    Ingestão, embeddings, vector DB, retriever, LLM, evals, etc.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  2
                </div>
                <div>
                  <p className="font-medium">Editor Visual Drag-and-Drop</p>
                  <p className="text-sm text-muted-foreground">
                    Arraste blocos e conecte para criar sua arquitetura
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  3
                </div>
                <div>
                  <p className="font-medium">Validação Automática</p>
                  <p className="text-sm text-muted-foreground">
                    Alertas sobre dependências e best practices
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  4
                </div>
                <div>
                  <p className="font-medium">Playbooks Pré-configurados</p>
                  <p className="text-sm text-muted-foreground">
                    Templates para começar rapidamente
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  5
                </div>
                <div>
                  <p className="font-medium">Salvar e Compartilhar</p>
                  <p className="text-sm text-muted-foreground">
                    Exporte como JSON ou imagem
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}





