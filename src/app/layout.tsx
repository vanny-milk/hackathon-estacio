import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../frontend/styles/globals.css';
import { Header } from '../frontend/components/layout/Header';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'PATA RADAR - Monitoramento & Inteligência Animal',
  description:
    'Sistema inteligente de monitoramento, coleta automatizada via Web Scraping em Python e gestão centralizada com Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-text antialiased font-sans selection:bg-secondary selection:text-primary">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-border bg-surface py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <p>
              © 2026 <strong>PATA RADAR</strong> — Hackathon Estácio. Desenvolvido com Next.js + TypeScript + Python.
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" /> WCAG 2.1 AA Compliant
              </span>
              <span>Design System v1.0</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
