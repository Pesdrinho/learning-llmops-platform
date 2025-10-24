import SEO from '@components/SEO';
import Container from '@components/layout/Container';

/**
 * Página de Termos de Uso
 */
export default function Terms() {
  return (
    <>
      <SEO title="Termos de Uso" description="Termos e condições de uso da plataforma" />
      <Container size="sm" className="py-12">
        <div className="mdx-content">
          <h1>Termos de Uso</h1>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar a Learning LLMOps Platform ("Plataforma"), você concorda em cumprir
            estes Termos de Uso. Se você não concorda com algum termo, não utilize a Plataforma.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>A Plataforma oferece:</p>
          <ul>
            <li>Conteúdo educacional sobre LLMOps</li>
            <li>Ferramentas de diagnóstico e planejamento</li>
            <li>Visualizações de arquiteturas de referência</li>
            <li>Laboratório interativo para composição de arquiteturas</li>
          </ul>

          <h2>3. Cadastro e Conta</h2>
          <h3>3.1 Requisitos</h3>
          <ul>
            <li>Você deve ter pelo menos 18 anos ou consentimento dos pais/responsáveis</li>
            <li>Fornecer informações precisas e atualizadas</li>
            <li>Manter a confidencialidade da sua senha</li>
          </ul>

          <h3>3.2 Responsabilidades</h3>
          <ul>
            <li>Você é responsável por todas as atividades em sua conta</li>
            <li>Notifique-nos imediatamente sobre uso não autorizado</li>
            <li>Não compartilhe credenciais com terceiros</li>
          </ul>

          <h2>4. Uso Aceitável</h2>
          <h3>4.1 Você PODE:</h3>
          <ul>
            <li>Usar a Plataforma para fins educacionais e profissionais</li>
            <li>Criar e salvar diagnósticos e arquiteturas</li>
            <li>Exportar conteúdo para uso pessoal ou organizacional</li>
          </ul>

          <h3>4.2 Você NÃO PODE:</h3>
          <ul>
            <li>Violar leis ou regulamentos</li>
            <li>Publicar conteúdo ofensivo, ilegal ou prejudicial</li>
            <li>Tentar acessar áreas restritas ou sistemas da Plataforma</li>
            <li>Fazer engenharia reversa ou copiar código da Plataforma</li>
            <li>Usar bots ou automações não autorizadas</li>
            <li>Revender ou redistribuir acesso à Plataforma</li>
          </ul>

          <h2>5. Propriedade Intelectual</h2>
          <h3>5.1 Conteúdo da Plataforma</h3>
          <p>
            Todo conteúdo (textos, gráficos, código, design) é propriedade da Plataforma e
            protegido por direitos autorais. Você pode visualizar e usar para fins educacionais,
            mas não copiar, modificar ou distribuir sem permissão.
          </p>

          <h3>5.2 Conteúdo do Usuário</h3>
          <p>
            Você mantém direitos sobre diagnósticos e arquiteturas que criar. Ao usar a Plataforma,
            você nos concede licença para armazenar e processar esses dados conforme necessário
            para fornecer o serviço.
          </p>

          <h2>6. Isenção de Garantias</h2>
          <p>
            A Plataforma é fornecida "como está" e "conforme disponível". Não garantimos que:
          </p>
          <ul>
            <li>O serviço será ininterrupto ou livre de erros</li>
            <li>Recomendações serão adequadas para todas as situações</li>
            <li>O conteúdo estará sempre atualizado</li>
          </ul>
          <p>
            As decisões arquiteturais finais são de sua responsabilidade. A Plataforma oferece
            orientação, não consultoria profissional personalizada.
          </p>

          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            Não seremos responsáveis por danos diretos, indiretos, incidentais ou consequenciais
            resultantes do uso ou impossibilidade de uso da Plataforma, incluindo:
          </p>
          <ul>
            <li>Perda de dados ou lucros</li>
            <li>Interrupção de negócios</li>
            <li>Decisões baseadas em informações da Plataforma</li>
          </ul>

          <h2>8. Modificações</h2>
          <p>Reservamos o direito de:</p>
          <ul>
            <li>Modificar ou descontinuar a Plataforma a qualquer momento</li>
            <li>Atualizar estes Termos (notificaremos sobre mudanças significativas)</li>
            <li>Suspender ou encerrar contas que violem os Termos</li>
          </ul>

          <h2>9. Rescisão</h2>
          <p>Você pode encerrar sua conta a qualquer momento. Podemos suspender ou encerrar seu acesso se você violar estes Termos.</p>

          <h2>10. Lei Aplicável</h2>
          <p>
            Estes Termos são regidos pelas leis brasileiras. Disputas serão resolvidas nos
            tribunais de [Sua Cidade/Estado].
          </p>

          <h2>11. Contato</h2>
          <p>
            Dúvidas sobre estes Termos? Entre em contato:
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



