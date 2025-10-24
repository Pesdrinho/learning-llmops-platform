import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@components/ui/separator';

/**
 * Footer da aplicação
 * Links de navegação, políticas e redes sociais
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Início', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Guia', href: '/guia' },
      { name: 'Podcast', href: '/podcast' },
    ],
    legal: [
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Política de Cookies', href: '/cookies' },
      { name: 'Termos de Uso', href: '/termos' },
    ],
    social: [
      { name: 'GitHub', href: '#', icon: Github },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Email', href: 'mailto:contato@example.com', icon: Mail },
    ],
  };

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Sobre */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-lg font-bold">L</span>
              </div>
              <span className="font-bold">LLMOps</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma interativa para aprendizado e implementação de sistemas LLMOps.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Plataforma</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Conecte-se</h3>
            <div className="flex gap-3">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-muted"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} Learning LLMOps Platform. Todos os direitos reservados.</p>
          <p>
            Feito com ❤️ para a comunidade de LLMOps
          </p>
        </div>
      </div>
    </footer>
  );
}





