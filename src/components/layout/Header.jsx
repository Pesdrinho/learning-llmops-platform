import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, FlaskConical, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Header da aplicação
 * Navegação principal responsiva com menu mobile e dropdown Laboratório
 */
export default function Header() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labDropdownOpen, setLabDropdownOpen] = useState(false);

  // Navegação pública (sempre visível)
  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Guia', href: '/guia' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Stack', href: '/stack-ferramentas' },
    { name: 'Sobre', href: '/sobre' },
  ];

  // Navegação protegida (dentro do dropdown "Laboratório")
  const laboratorioItems = [
    { name: 'Diagnóstico', href: '/diagnostico' },
    { name: 'Arquiteturas', href: '/arquiteturas' },
    { name: 'Playground', href: '/laboratorio' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">L</span>
          </div>
          <span className="hidden font-bold sm:inline-block">LLMOps Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          
          {/* Dropdown Laboratório (apenas se logado) */}
          {user && (
            <DropdownMenu open={labDropdownOpen} onOpenChange={setLabDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  <FlaskConical className="h-4 w-4" />
                  Laboratório
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {laboratorioItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                <User className="mr-1 inline h-4 w-4" />
                {user.displayName || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t md:hidden"
          >
            <div className="container space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Dropdown Laboratório no mobile (expandível) */}
              {user && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground bg-muted/50">
                    <FlaskConical className="h-4 w-4" />
                    Laboratório
                  </div>
                  {laboratorioItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-md px-3 py-2 pl-9 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="border-t pt-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      {user.displayName || user.email}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                    >
                      <LogOut className="mr-2 inline h-4 w-4" />
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}




