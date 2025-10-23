import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportarDiagrama } from '@/lib/reactflow/exportImage';

export default function ExportButton({ arquitetura, onExport }) {
  const [exportando, setExportando] = useState(false);

  const handleExport = async () => {
    setExportando(true);
    try {
      await exportarDiagrama('react-flow-diagram', arquitetura.id);
      if (onExport) {
        onExport();
      }
    } catch (error) {
      console.error('Erro ao exportar diagrama:', error);
    } finally {
      setExportando(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={exportando}
      size="sm"
      variant="outline"
      className="gap-2 bg-background/90 backdrop-blur-sm"
    >
      <Download className="h-4 w-4" />
      {exportando ? 'Exportando...' : 'Exportar PNG'}
    </Button>
  );
}

