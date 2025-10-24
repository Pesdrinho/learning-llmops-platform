import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Cookie, X } from 'lucide-react';
import { saveData, loadData } from '@lib/storage';

/**
 * Banner de consentimento de cookies (LGPD/ANPD)
 * Exibe opção de rejeitar tudo no primeiro nível
 */
export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = loadData('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    saveData('cookie_consent', {
      necessary: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    });
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    saveData('cookie_consent', {
      necessary: true,
      analytics: false,
      timestamp: new Date().toISOString(),
    });
    setShowBanner(false);
  };

  const handleSaveSettings = (settings) => {
    saveData('cookie_consent', {
      ...settings,
      necessary: true,
      timestamp: new Date().toISOString(),
    });
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <Card className="mx-auto max-w-4xl border-2 p-6 shadow-xl">
            {!showSettings ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <Cookie className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Cookies e Privacidade</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Usamos cookies para melhorar sua experiência. Apenas cookies essenciais são
                      necessários. Você pode aceitar ou rejeitar cookies de analytics.{' '}
                      <a href="/cookies" className="underline hover:text-primary">
                        Saiba mais
                      </a>
                      .
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={handleRejectAll}>
                    Rejeitar tudo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                  >
                    Gerenciar
                  </Button>
                  <Button size="sm" onClick={handleAcceptAll}>
                    Aceitar tudo
                  </Button>
                </div>
              </div>
            ) : (
              <CookieSettings
                onSave={handleSaveSettings}
                onClose={() => setShowSettings(false)}
              />
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieSettings({ onSave, onClose }) {
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Preferências de Cookies</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
          <div>
            <p className="font-medium">Cookies Essenciais</p>
            <p className="text-sm text-muted-foreground">
              Necessários para o funcionamento básico do site
            </p>
          </div>
          <span className="text-sm text-muted-foreground">Sempre ativo</span>
        </div>

        <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
          <div>
            <p className="font-medium">Cookies de Analytics</p>
            <p className="text-sm text-muted-foreground">
              Nos ajudam a entender como você usa o site
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={() => onSave({ analytics })}>Salvar preferências</Button>
      </div>
    </div>
  );
}





