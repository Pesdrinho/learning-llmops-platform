import { toPng } from 'html-to-image';

/**
 * Exporta diagrama React Flow como PNG
 * Usando versão específica html-to-image@1.11.11 para estabilidade
 */
export async function exportarDiagrama(elementId, nomeArquitetura) {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('Elemento do diagrama não encontrado');
  }

  try {
    // Configurações para melhor qualidade
    const dataUrl = await toPng(element, {
      backgroundColor: '#ffffff',
      quality: 0.95,
      pixelRatio: 2, // Higher quality for retina displays
      cacheBust: true,
      filter: (node) => {
        // Remove controles do React Flow da exportação
        if (node.classList) {
          return (
            !node.classList.contains('react-flow__controls') &&
            !node.classList.contains('react-flow__minimap') &&
            !node.classList.contains('react-flow__panel')
          );
        }
        return true;
      },
    });

    // Download automático
    const link = document.createElement('a');
    link.download = `arquitetura-${nomeArquitetura}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    return dataUrl;
  } catch (error) {
    console.error('Erro ao exportar diagrama:', error);
    throw new Error('Não foi possível exportar o diagrama. Tente novamente.');
  }
}

/**
 * Retorna data URL do diagrama sem fazer download
 */
export async function capturarDiagrama(elementId) {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('Elemento do diagrama não encontrado');
  }

  try {
    const dataUrl = await toPng(element, {
      backgroundColor: '#ffffff',
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
    });

    return dataUrl;
  } catch (error) {
    console.error('Erro ao capturar diagrama:', error);
    throw error;
  }
}

