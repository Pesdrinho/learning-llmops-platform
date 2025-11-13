import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/ProtectedRoute';
import { Skeleton } from '@components/ui/skeleton';

// Lazy loading de páginas para melhor performance
const Home = lazy(() => import('@pages/Home'));
const Blog = lazy(() => import('@pages/Blog'));
const BlogPost = lazy(() => import('@pages/Blog/Post'));
const Guia = lazy(() => import('@pages/Guia'));
const Hub = lazy(() => import('@pages/Guia/Hub'));
const GuideView = lazy(() => import('@pages/Guia/GuideView'));
const MacroEtapa = lazy(() => import('@pages/Guia/MacroEtapa'));
const Podcast = lazy(() => import('@pages/Podcast'));
const Episode = lazy(() => import('@pages/Podcast/Episode'));
const Sobre = lazy(() => import('@pages/Sobre'));
const StackFerramentas = lazy(() => import('@pages/StackFerramentas'));
const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));
const ResetPassword = lazy(() => import('@pages/ResetPassword'));
const Diagnostico = lazy(() => import('@pages/Diagnostico'));
const DiagnosticoFormulario = lazy(() => import('@pages/Diagnostico/Formulario'));
const DiagnosticoResultado = lazy(() => import('@pages/Diagnostico/Resultado'));
const Arquiteturas = lazy(() => import('@pages/Arquiteturas'));
const ArquiteturaDetalhes = lazy(() => import('@pages/Arquiteturas/Detalhes'));
const ArquiteturaComparacao = lazy(() => import('@pages/Arquiteturas/Comparacao'));
const Laboratorio = lazy(() => import('@pages/Laboratorio'));
const Privacy = lazy(() => import('@pages/Privacy'));
const Cookies = lazy(() => import('@pages/Cookies'));
const Terms = lazy(() => import('@pages/Terms'));
const NotFound = lazy(() => import('@pages/NotFound'));

// Loading fallback
function PageLoader() {
  return (
    <div className="container mx-auto py-12">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Rotas de Guias - Novo Hub */}
          <Route path="/guias" element={<Hub />} />
          <Route path="/guias/:guiaSlug" element={<GuideView />} />
          <Route path="/guias/:guiaSlug/:etapa" element={<MacroEtapa />} />
          
          {/* Rotas antigas de guia (mantidas para compatibilidade) */}
          <Route path="/guia" element={<Guia />} />
          <Route path="/guia/:etapa" element={<MacroEtapa />} />
          
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/podcast/:slug" element={<Episode />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/stack-ferramentas" element={<StackFerramentas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/recuperar-senha" element={<ResetPassword />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/termos" element={<Terms />} />

          {/* Rotas protegidas (Fase 2+) */}
          <Route
            path="/diagnostico"
            element={
              <ProtectedRoute>
                <Diagnostico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagnostico/:id/formulario"
            element={
              <ProtectedRoute>
                <DiagnosticoFormulario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagnostico/:id/resultado"
            element={
              <ProtectedRoute>
                <DiagnosticoResultado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arquiteturas"
            element={
              <ProtectedRoute>
                <Arquiteturas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arquiteturas/:id"
            element={
              <ProtectedRoute>
                <ArquiteturaDetalhes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/arquiteturas/comparar"
            element={
              <ProtectedRoute>
                <ArquiteturaComparacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/laboratorio"
            element={
              <ProtectedRoute>
                <Laboratorio />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;




