import Header from './Header';
import Footer from './Footer';
import LoadingBar from '../LoadingBar';
import CookieBanner from '../CookieBanner';

/**
 * Layout principal da aplicação
 * Envolve todas as páginas com Header, Footer e utilitários
 */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip to content para acessibilidade */}
      <a href="#main-content" className="skip-to-content">
        Pular para o conteúdo principal
      </a>

      <LoadingBar />
      <Header />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}





