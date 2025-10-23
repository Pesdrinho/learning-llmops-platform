import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Wrench, AlertTriangle, FileCheck } from 'lucide-react';

export default function NodePopup({ nodeData, open, onClose }) {
  if (!nodeData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl">{nodeData.label}</DialogTitle>
            <Badge variant="outline">{nodeData.tipo}</Badge>
          </div>
          <DialogDescription className="text-base pt-2">{nodeData.descricao}</DialogDescription>
        </DialogHeader>

        <Separator />

        <Tabs defaultValue="metricas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
            <TabsTrigger value="riscos">Riscos</TabsTrigger>
            <TabsTrigger value="entregas">Entregas</TabsTrigger>
          </TabsList>

          <TabsContent value="metricas" className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              Principais Métricas
            </div>
            {nodeData.metricas && nodeData.metricas.length > 0 ? (
              <ul className="space-y-2">
                {nodeData.metricas.map((metrica, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{metrica}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma métrica específica definida.</p>
            )}
          </TabsContent>

          <TabsContent value="ferramentas" className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wrench className="h-4 w-4" />
              Ferramentas Recomendadas
            </div>
            {nodeData.ferramentas && nodeData.ferramentas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {nodeData.ferramentas.map((ferramenta, idx) => (
                  <Badge key={idx} variant="secondary">
                    {ferramenta}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma ferramenta específica recomendada.
              </p>
            )}
          </TabsContent>

          <TabsContent value="riscos" className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              Riscos e Considerações
            </div>
            {nodeData.riscos && nodeData.riscos.length > 0 ? (
              <ul className="space-y-2">
                {nodeData.riscos.map((risco, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm p-2 rounded bg-orange-50 dark:bg-orange-950/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{risco}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum risco específico identificado.</p>
            )}
          </TabsContent>

          <TabsContent value="entregas" className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileCheck className="h-4 w-4" />
              Entregas Esperadas
            </div>
            {nodeData.entregas && nodeData.entregas.length > 0 ? (
              <ul className="space-y-2">
                {nodeData.entregas.map((entrega, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{entrega}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma entrega específica definida.</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

