import SEO from '@components/SEO';
import Container from '@components/layout/Container';

/**
 * Página de Política de Privacidade (LGPD/ANPD)
 */
export default function Privacy() {
  return (
    <>
      <SEO title="Política de Privacidade" description="Política de privacidade e LGPD" />
      <Container size="sm" className="py-12">
        <div className="mdx-content">
          <h1>Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <h2>1. Introdução</h2>
          <p>
            Esta Política de Privacidade descreve como a Learning LLMOps Platform ("nós", "nosso"
            ou "plataforma") coleta, usa, armazena e protege suas informações pessoais em
            conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>

          <h2>2. Informações que Coletamos</h2>
          <h3>2.1 Dados fornecidos por você</h3>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Informações de perfil (quando aplicável)</li>
            <li>Dados de diagnóstico de maturidade (quando você utiliza a ferramenta)</li>
          </ul>

          <h3>2.2 Dados coletados automaticamente</h3>
          <ul>
            <li>Endereço IP</li>
            <li>Tipo de navegador e dispositivo</li>
            <li>Páginas visitadas e tempo de navegação</li>
            <li>Cookies e tecnologias similares (veja nossa Política de Cookies)</li>
          </ul>

          <h2>3. Base Legal e Finalidade</h2>
          <p>Utilizamos seus dados com base nas seguintes finalidades e bases legais:</p>
          <ul>
            <li>
              <strong>Execução de contrato:</strong> Para fornecer acesso aos serviços da
              plataforma
            </li>
            <li>
              <strong>Consentimento:</strong> Para envio de comunicações de marketing (quando
              autorizado)
            </li>
            <li>
              <strong>Legítimo interesse:</strong> Para análise de uso e melhorias da plataforma
            </li>
            <li>
              <strong>Obrigação legal:</strong> Quando exigido por lei
            </li>
          </ul>

          <h2>4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:
          </p>
          <ul>
            <li>Provedores de serviços (Firebase/Google) para autenticação e armazenamento</li>
            <li>Autoridades legais, quando exigido por lei</li>
          </ul>

          <h2>5. Seus Direitos (LGPD)</h2>
          <p>Você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar anonimização, bloqueio ou eliminação</li>
            <li>Revogar consentimento</li>
            <li>Obter informações sobre compartilhamento</li>
            <li>Opor-se ao tratamento</li>
          </ul>
          <p>
            Para exercer seus direitos, entre em contato: <strong>[seu-email@example.com]</strong>
          </p>

          <h2>6. Segurança</h2>
          <p>
            Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo
            criptografia, controle de acesso e monitoramento de segurança.
          </p>

          <h2>7. Retenção de Dados</h2>
          <p>
            Mantemos seus dados pelo tempo necessário para as finalidades descritas ou conforme
            exigido por lei. Você pode solicitar a exclusão a qualquer momento.
          </p>

          <h2>8. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças
            significativas por e-mail ou aviso na plataforma.
          </p>

          <h2>9. Contato</h2>
          <p>
            Para dúvidas sobre privacidade ou exercício de direitos:
            <br />
            E-mail: <strong>[seu-email@example.com]</strong>
            <br />
            Endereço: <strong>[Seu endereço completo]</strong>
          </p>
        </div>
      </Container>
    </>
  );
}



