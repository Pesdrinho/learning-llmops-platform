import SEO from '@components/SEO';
import Container from '@components/layout/Container';

/**
 * Página de Política de Cookies
 */
export default function Cookies() {
  return (
    <>
      <SEO title="Política de Cookies" description="Como usamos cookies na plataforma" />
      <Container size="sm" className="py-12">
        <div className="mdx-content">
          <h1>Política de Cookies</h1>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <h2>1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você
            visita um site. Eles ajudam o site a lembrar informações sobre sua visita, tornando
            sua experiência mais conveniente e o site mais útil.
          </p>

          <h2>2. Como Usamos Cookies</h2>
          <p>Utilizamos cookies para:</p>
          <ul>
            <li>Manter você conectado à sua conta</li>
            <li>Lembrar suas preferências (tema, idioma, etc.)</li>
            <li>Analisar como você usa a plataforma</li>
            <li>Melhorar a performance e segurança</li>
          </ul>

          <h2>3. Tipos de Cookies que Utilizamos</h2>

          <h3>3.1 Cookies Essenciais (Sempre Ativos)</h3>
          <p>
            Necessários para o funcionamento básico do site. Sem eles, você não conseguiria fazer
            login ou navegar adequadamente.
          </p>
          <ul>
            <li>
              <strong>Autenticação:</strong> Mantém você conectado
            </li>
            <li>
              <strong>Segurança:</strong> Protege contra ataques
            </li>
            <li>
              <strong>Preferências:</strong> Lembra suas configurações
            </li>
          </ul>

          <h3>3.2 Cookies de Analytics (Opcional)</h3>
          <p>
            Nos ajudam a entender como os visitantes interagem com a plataforma, permitindo
            melhorias.
          </p>
          <ul>
            <li>
              <strong>Plausible Analytics:</strong> Analytics respeitando privacidade (sem
              rastreamento individual)
            </li>
            <li>
              <strong>PostHog:</strong> Análise de eventos e funis (opcional)
            </li>
          </ul>

          <h2>4. Cookies de Terceiros</h2>
          <p>Alguns cookies são definidos por serviços terceiros que utilizamos:</p>
          <ul>
            <li>
              <strong>Firebase (Google):</strong> Autenticação e armazenamento
            </li>
            <li>
              <strong>Google Fonts:</strong> Carregamento de fontes
            </li>
          </ul>

          <h2>5. Gerenciar Cookies</h2>
          <p>Você pode controlar e gerenciar cookies de várias maneiras:</p>

          <h3>5.1 Banner de Consentimento</h3>
          <p>
            Quando você visita pela primeira vez, exibimos um banner permitindo aceitar, rejeitar
            ou gerenciar cookies. Você pode:
          </p>
          <ul>
            <li>
              <strong>Aceitar tudo:</strong> Todos os cookies serão ativados
            </li>
            <li>
              <strong>Rejeitar tudo:</strong> Apenas cookies essenciais serão usados
            </li>
            <li>
              <strong>Gerenciar:</strong> Escolher categorias específicas
            </li>
          </ul>

          <h3>5.2 Configurações do Navegador</h3>
          <p>
            A maioria dos navegadores permite bloquear ou deletar cookies. Consulte a ajuda do seu
            navegador:
          </p>
          <ul>
            <li>Google Chrome</li>
            <li>Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Nota: Bloquear todos os cookies pode afetar a funcionalidade da plataforma.
          </p>

          <h2>6. Retenção de Cookies</h2>
          <p>Diferentes cookies têm diferentes períodos de validade:</p>
          <ul>
            <li>
              <strong>Cookies de Sessão:</strong> Deletados ao fechar o navegador
            </li>
            <li>
              <strong>Cookies Persistentes:</strong> Permanecem por até 1 ano (ou até você
              deletá-los)
            </li>
          </ul>

          <h2>7. Atualizações desta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. A data da última atualização está no
            topo desta página.
          </p>

          <h2>8. Contato</h2>
          <p>
            Dúvidas sobre cookies? Entre em contato:
            <br />
            E-mail: <strong>[seu-email@example.com]</strong>
          </p>
        </div>
      </Container>
    </>
  );
}



