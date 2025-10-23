import { Handle, Position } from 'reactflow';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const tipoColors = {
  entrada: 'bg-blue-100 border-blue-500 dark:bg-blue-950 dark:border-blue-400',
  processamento: 'bg-purple-100 border-purple-500 dark:bg-purple-950 dark:border-purple-400',
  armazenamento: 'bg-green-100 border-green-500 dark:bg-green-950 dark:border-green-400',
  saida: 'bg-orange-100 border-orange-500 dark:bg-orange-950 dark:border-orange-400',
  monitoramento: 'bg-yellow-100 border-yellow-500 dark:bg-yellow-950 dark:border-yellow-400',
};

export default function CustomNode({ data, selected }) {
  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg border-2 min-w-[200px] max-w-[250px] transition-all',
        tipoColors[data.tipo] || tipoColors.processamento,
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />

      <div className="space-y-2">
        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{data.label}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {data.descricao}
        </div>

        {data.metricas && data.metricas.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.metricas.slice(0, 2).map((metrica, idx) => (
              <Badge key={idx} variant="outline" className="text-[10px] px-1 py-0">
                {metrica}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}

