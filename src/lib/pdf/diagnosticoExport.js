import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Exporta relatório de diagnóstico em PDF
 */
export async function exportarRelatorioPDF(diagnostico) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let currentY = 20;

  // Configurações de cores
  const primaryColor = [99, 102, 241]; // Indigo
  const textColor = [31, 41, 55]; // Gray-800

  // === PÁGINA 1: RESUMO EXECUTIVO ===
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Relatório de Diagnóstico LLMOps', 20, currentY);

  currentY += 15;
  pdf.setTextColor(...textColor);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  // Data e status
  const dataFormatada = diagnostico.completedAt
    ? new Date(diagnostico.completedAt.seconds * 1000).toLocaleDateString('pt-BR')
    : new Date().toLocaleDateString('pt-BR');

  pdf.text(`Data: ${dataFormatada}`, 20, currentY);
  currentY += 7;
  pdf.text(`Status: ${diagnostico.status === 'concluido' ? 'Concluído' : 'Em andamento'}`, 20, currentY);

  currentY += 15;

  // Score geral
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Score Geral de Maturidade', 20, currentY);

  currentY += 10;
  pdf.setFontSize(36);
  pdf.setTextColor(...primaryColor);
  pdf.text(`${diagnostico.scores.geral.toFixed(1)}/10`, 20, currentY);

  currentY += 15;

  // Arquiteturas recomendadas
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...textColor);
  pdf.text('Arquiteturas Recomendadas', 20, currentY);

  currentY += 10;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  if (diagnostico.recomendacoes.arquiteturas?.length > 0) {
    diagnostico.recomendacoes.arquiteturas.forEach((arq, idx) => {
      if (currentY > pageHeight - 30) {
        pdf.addPage();
        currentY = 20;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.text(`${idx + 1}. ${arq.nome}`, 25, currentY);
      currentY += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const motivoLines = pdf.splitTextToSize(arq.motivo, pageWidth - 50);
      pdf.text(motivoLines, 30, currentY);
      currentY += motivoLines.length * 5 + 5;
      pdf.setFontSize(11);
    });
  } else {
    pdf.text('Nenhuma arquitetura específica recomendada no momento.', 25, currentY);
    currentY += 10;
  }

  // === PÁGINA 2: GRÁFICOS ===
  pdf.addPage();
  currentY = 20;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...primaryColor);
  pdf.text('Visualização de Resultados', 20, currentY);

  currentY += 15;

  // Captura gráficos (se existir elemento)
  try {
    const chartsElement = document.getElementById('charts-container');
    if (chartsElement) {
      const canvas = await html2canvas(chartsElement, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = pageWidth - 40;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 20, currentY, imgWidth, Math.min(imgHeight, 160));
      currentY += Math.min(imgHeight, 160) + 10;
    }
  } catch (error) {
    console.error('Erro ao capturar gráficos:', error);
  }

  // === PÁGINA 3: PRÓXIMOS PASSOS ===
  pdf.addPage();
  currentY = 20;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...primaryColor);
  pdf.text('Próximos Passos Recomendados', 20, currentY);

  currentY += 15;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...textColor);

  if (diagnostico.recomendacoes.proximosPassos?.length > 0) {
    diagnostico.recomendacoes.proximosPassos.forEach((passo, idx) => {
      if (currentY > pageHeight - 30) {
        pdf.addPage();
        currentY = 20;
      }

      // Prioridade
      const corPrioridade = {
        alta: [220, 38, 38],
        media: [251, 146, 60],
        baixa: [34, 197, 94],
      };

      pdf.setFillColor(...(corPrioridade[passo.prioridade] || corPrioridade.media));
      pdf.rect(22, currentY - 3, 3, 5, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.text(`${idx + 1}. ${passo.titulo}`, 30, currentY);
      currentY += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const descLines = pdf.splitTextToSize(passo.descricao, pageWidth - 50);
      pdf.text(descLines, 30, currentY);
      currentY += descLines.length * 5 + 8;
      pdf.setFontSize(11);
    });
  } else {
    pdf.text('Nenhum próximo passo específico no momento.', 25, currentY);
  }

  // === PÁGINA 4: RISCOS E ALERTAS ===
  if (diagnostico.recomendacoes.riscos?.length > 0) {
    pdf.addPage();
    currentY = 20;

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('Riscos e Alertas Identificados', 20, currentY);

    currentY += 15;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...textColor);

    diagnostico.recomendacoes.riscos.forEach((risco, idx) => {
      if (currentY > pageHeight - 30) {
        pdf.addPage();
        currentY = 20;
      }

      // Nível de risco
      const corRisco = {
        alto: [220, 38, 38],
        medio: [251, 146, 60],
        baixo: [34, 197, 94],
      };

      pdf.setFillColor(...(corRisco[risco.nivel] || corRisco.medio));
      pdf.rect(22, currentY - 3, 3, 5, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.text(`${idx + 1}. ${risco.titulo}`, 30, currentY);
      currentY += 6;

      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.text(`Tipo: ${risco.tipo} | Nível: ${risco.nivel}`, 30, currentY);
      currentY += 5;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const descLines = pdf.splitTextToSize(risco.descricao, pageWidth - 50);
      pdf.text(descLines, 30, currentY);
      currentY += descLines.length * 5 + 8;
      pdf.setFontSize(11);
    });
  }

  // === RODAPÉ EM TODAS AS PÁGINAS ===
  const totalPages = pdf.internal.pages.length - 1; // -1 porque primeira página é null
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(9);
    pdf.setTextColor(156, 163, 175); // Gray-400
    pdf.text(
      `Página ${i} de ${totalPages} | Gerado em ${dataFormatada}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Salvar PDF
  const nomeArquivo = `diagnostico-llmops-${Date.now()}.pdf`;
  pdf.save(nomeArquivo);

  return nomeArquivo;
}

