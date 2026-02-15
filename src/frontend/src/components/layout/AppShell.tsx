import { Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiFacebook, SiX, SiLinkedin } from 'react-icons/si';

interface AppShellProps {
  children: React.ReactNode;
  onSettingsClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function AppShell({ 
  children, 
  onSettingsClick,
  showBackButton = false,
  onBackClick
}: AppShellProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'tutor-lms-app'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {showBackButton && onBackClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackClick}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <img 
              src="/assets/generated/app-icon.dim_512x512.png" 
              alt="App Icon"
              className="h-10 w-10 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Course Library</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Explore and learn</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="shrink-0"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome to Your Learning Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover engaging video courses designed to help you grow your skills and achieve your goals.
              </p>
            </div>
            <div className="w-full md:w-auto md:flex-shrink-0">
              <img 
                src="/assets/generated/hero-illustration.dim_1200x400.png"
                alt="Learning illustration"
                className="w-full max-w-md md:max-w-sm rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Course Library. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Built with ❤️ using{' '}
                <a 
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground transition-colors underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
