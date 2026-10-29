'use client';

import React, { useState } from 'react';
import { Button } from '../frontend/components/ui/Button';
import { Badge } from '../frontend/components/ui/Badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../frontend/components/ui/Card';

export default function HomePage() {
  const [isScraping, setIsScraping] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'components' | 'scrapers'>('tokens');

  const triggerMockScraper = () => {
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
    }, 2000);
  };

  const colorTokens = [
    {
      name: 'Primary',
      token: '--color-primary',
      hex: '#0B1F3A',
      desc: 'Azul Marinho: Identidade, Ação Principal e Títulos',
      textColor: 'text-white',
      bgClass: 'bg-[#0B1F3A]',
      contrast: '17.5:1 (AAA)',
    },
    {
      name: 'Secondary',
      token: '--color-secondary',
      hex: '#10B981',
      desc: 'Verde Esmeralda: Sucesso, Confirmações e Radar Ativo',
      textColor: 'text-[#0B1F3A]',
      bgClass: 'bg-[#10B981]',
      contrast: '7.1:1 (AAA)',
    },
    {
      name: 'Alert',
      token: '--color-alert',
      hex: '#F59E0B',
      desc: 'Âmbar / Laranja: Avisos, Scrapers em Execução',
      textColor: 'text-[#0B1F3A]',
      bgClass: 'bg-[#F59E0B]',
      contrast: '7.8:1 (AAA)',
    },
    {
      name: 'Background',
      token: '--color-background',
      hex: '#F8FAFC',
      desc: 'Slate 50: Fundo Geral da Aplicação',
      textColor: 'text-[#0B1F3A]',
      bgClass: 'bg-[#F8FAFC] border border-border',
      contrast: 'Base Canvas',
    },
    {
      name: 'Surface',
      token: '--color-surface',
      hex: '#FFFFFF',
      desc: 'Branco Puro: Cards, Modais, Tabelas',
      textColor: 'text-[#0B1F3A]',
      bgClass: 'bg-[#FFFFFF] border border-border',
      contrast: 'Elevação 1',
    },
    {
      name: 'Text',
      token: '--color-text',
      hex: '#0B1F3A',
      desc: 'Azul Marinho Escuro: Texto de Máxima Legibilidade',
      textColor: 'text-white',
      bgClass: 'bg-[#0B1F3A]',
      contrast: '16.5:1 (AAA)',
    },
    {
      name: 'Text Muted',
      token: '--color-text-muted',
      hex: '#334155',
      desc: 'Slate 700: Subtítulos, Metadados e Legendas',
      textColor: 'text-white',
      bgClass: 'bg-[#334155]',
      contrast: '8.9:1 (AAA)',
    },
    {
      name: 'Border',
      token: '--color-border',
      hex: '#E2E8F0',
      desc: 'Slate 200: Divisões Estruturais e Contornos',
      textColor: 'text-[#0B1F3A]',
      bgClass: 'bg-[#E2E8F0]',
      contrast: '3:1 UI Element',
    },
  ];

  return (
    <div className="space-y-10">
      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <section className="bg-surface border border-border rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="primary">Design System Oficial</Badge>
            <Badge variant="success" withDot pulsing>
              Radar Online
            </Badge>
            <span className="text-xs font-mono text-text-muted">
              Next.js 14 + TS + Python
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary leading-tight font-heading">
            PATA RADAR
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Plataforma de inteligência e monitoramento animal com arquitetura orientada
            a especificações (SDD), interface de alta fidelidade e pipeline de web scraping automatizado em Python.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              isLoading={isScraping}
              onClick={triggerMockScraper}
            >
              {isScraping ? 'Executando Scraper Python...' : 'Disparar Scraper Radar'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setActiveTab('components')}
            >
              Explorar Componentes
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveTab('tokens')}
            >
              Ver Tokens de Cores
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          NAVIGATION TABS
          ==================================================================== */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'tokens'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text hover:bg-surface'
          }`}
        >
          🎨 Tokens de Cores Oficial
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'typography'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text hover:bg-surface'
          }`}
        >
          ✍️ Hierarquia Tipográfica
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'components'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text hover:bg-surface'
          }`}
        >
          🧩 Componentes & Botões
        </button>
        <button
          onClick={() => setActiveTab('scrapers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'scrapers'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text hover:bg-surface'
          }`}
        >
          🐍 Scrapers Python & Pipeline
        </button>
      </div>

      {/* ====================================================================
          TAB 1: COLOR TOKENS
          ==================================================================== */}
      {activeTab === 'tokens' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary font-heading">
              Paleta de Cores Padrão PATA RADAR
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Todos os tokens foram testados e validados segundo as diretrizes de acessibilidade WCAG 2.1 AA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorTokens.map((item) => (
              <Card key={item.token} hoverable>
                <div
                  className={`h-28 w-full p-4 flex flex-col justify-between ${item.bgClass}`}
                >
                  <span
                    className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 w-fit ${item.textColor}`}
                  >
                    {item.contrast}
                  </span>
                  <span className={`text-lg font-mono font-bold ${item.textColor}`}>
                    {item.hex}
                  </span>
                </div>
                <CardContent className="space-y-1.5 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-primary text-sm">{item.name}</h3>
                    <code className="text-[11px] font-mono text-text-muted bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.token}
                    </code>
                  </div>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CSS Definition Snippet */}
          <Card>
            <CardHeader>
              <CardTitle>Configuração CSS (:root)</CardTitle>
              <CardDescription>
                Código injetado em <code>src/frontend/styles/tokens.css</code> e refletido em <code>tailwind.config.ts</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-[#0B1F3A] text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`:root {
  --color-primary: #0B1F3A;    /* Azul Marinho Profundo */
  --color-secondary: #10B981;  /* Verde Esmeralda (Sucesso / Ativo) */
  --color-alert: #F59E0B;      /* Âmbar / Laranja (Alerta / Scrapers) */

  --color-background: #F8FAFC; /* Slate 50 (Fundo Geral) */
  --color-surface: #FFFFFF;    /* Branco Puro (Cards / Superfícies) */
  --color-text: #0B1F3A;       /* Texto Primário */
  --color-text-muted: #334155; /* Slate 700 (Texto Secundário) */
  --color-border: #E2E8F0;     /* Slate 200 (Bordas e Divisórias) */
}`}
              </pre>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================================
          TAB 2: TYPOGRAPHY HIERARCHY
          ==================================================================== */}
      {activeTab === 'typography' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary font-heading">
              Padronização da Hierarquia Tipográfica
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Fonte Primária: <strong>Plus Jakarta Sans</strong> (Moderna, Geométrica) | Monospaçada: <strong>JetBrains Mono</strong>
            </p>
          </div>

          <Card>
            <CardContent className="divide-y divide-border p-0">
              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Display / Hero</span>
                  <p className="text-xs text-text-subtle">40px / 2.5rem · ExtraBold 800</p>
                </div>
                <div className="md:w-2/3">
                  <span className="text-4xl font-extrabold text-primary font-heading tracking-tight">
                    PATA RADAR Telemetria
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Heading 1 (H1)</span>
                  <p className="text-xs text-text-subtle">30px / 1.875rem · Bold 700</p>
                </div>
                <div className="md:w-2/3">
                  <h1 className="text-3xl font-bold text-primary font-heading tracking-tight">
                    Monitoramento em Tempo Real de Animais
                  </h1>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Heading 2 (H2)</span>
                  <p className="text-xs text-text-subtle">24px / 1.5rem · SemiBold 600</p>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-semibold text-primary font-heading">
                    Execução dos Scrapers Python por Região
                  </h2>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Heading 3 (H3)</span>
                  <p className="text-xs text-text-subtle">20px / 1.25rem · SemiBold 600</p>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold text-primary font-heading">
                    Detecção e Triagem Automatizada
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Body Large</span>
                  <p className="text-xs text-text-subtle">18px / 1.125rem · Regular 400</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg text-text leading-relaxed">
                    O sistema PATA RADAR centraliza a ingestão de registros e feeds de animais perdidos e encontrados.
                  </p>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Body Base</span>
                  <p className="text-xs text-text-subtle">16px / 1rem · Regular 400</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-base text-text leading-relaxed">
                    Texto padrão para formulários, descrições detalhadas e conteúdo informacional com contraste superior a 16:1 contra o fundo.
                  </p>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Body Muted / Small</span>
                  <p className="text-xs text-text-subtle">14px / 0.875rem · Medium 500</p>
                </div>
                <div className="md:w-2/3">
                  <p className="text-sm text-text-muted">
                    Última sincronização do worker Python: há 2 minutos · Origem: Scraper ONG Cão Sem Dono
                  </p>
                </div>
              </div>

              <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="md:w-1/3">
                  <span className="text-xs font-mono text-text-muted uppercase">Monospace / Code</span>
                  <p className="text-xs text-text-subtle">JetBrains Mono · 13px</p>
                </div>
                <div className="md:w-2/3">
                  <code className="text-xs font-mono bg-slate-100 text-primary px-2.5 py-1 rounded border border-border">
                    {`{"event": "PATA_DETECTED", "confidence": 0.98, "status": "ACTIVE"}`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================================
          TAB 3: COMPONENTS & BUTTONS
          ==================================================================== */}
      {activeTab === 'components' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary font-heading">
              Componentes & Acessibilidade
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Botões respeitando a Lei de Fitts (alvo mínimo de toque 44px), foco visível e estados visuais completos.
            </p>
          </div>

          {/* Buttons Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Variações de Botões (Button Variants)</CardTitle>
              <CardDescription>
                Mapeamento das classes semânticas com suporte a loading e ícones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Ação Primária (#0B1F3A)</Button>
                <Button variant="secondary">Sucesso / Radar (#10B981)</Button>
                <Button variant="alert">Alerta / Atenção (#F59E0B)</Button>
                <Button variant="danger">Ação Destrutiva (#EF4444)</Button>
                <Button variant="outline">Borda / Outline</Button>
                <Button variant="ghost">Fantasma / Ghost</Button>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-mono uppercase text-text-muted mb-3">
                  Estados: Carregamento & Desabilitado
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" isLoading>
                    Salvando dados...
                  </Button>
                  <Button variant="secondary" isLoading>
                    Processando...
                  </Button>
                  <Button variant="primary" disabled>
                    Desabilitado
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Badges & Indicadores de Status</CardTitle>
              <CardDescription>
                Tags visuais contextuais para telemetria de scrapers e saúde do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Badge variant="success" withDot pulsing>
                Radar Online (Pulso)
              </Badge>
              <Badge variant="alert" withDot>
                Scraper em Execução
              </Badge>
              <Badge variant="danger" withDot>
                Scraper Offline (Timeout)
              </Badge>
              <Badge variant="neutral">
                Fila de Espera: 14 itens
              </Badge>
              <Badge variant="primary">
                PATA RADAR AI
              </Badge>
            </CardContent>
          </Card>
        </section>
      )}

      {/* ====================================================================
          TAB 4: PYTHON SCRAPERS & ARCHITECTURE
          ==================================================================== */}
      {activeTab === 'scrapers' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary font-heading">
              Arquitetura de Web Scraping em Python
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Integração entre o pipeline de coleta em Python e a apresentação em Next.js + TypeScript.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">1. Coleta (Python)</CardTitle>
                  <Badge variant="alert">Scrapers</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-text-muted space-y-2">
                <p>
                  Scripts Python utilizam <strong>BeautifulSoup</strong>, <strong>Playwright</strong> ou <strong>Scrapy</strong> para extrair anúncios e publicações de ONGs e redes.
                </p>
                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-primary">
                  src/scrapers/ong_scraper.py
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">2. Ingestão & API</CardTitle>
                  <Badge variant="success">FastAPI / Next API</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-text-muted space-y-2">
                <p>
                  Os dados normalizados são enviados via DTOs validados para o banco de dados (PostgreSQL/SQLite) com deduplicação de imagens.
                </p>
                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-primary">
                  POST /api/animals/intake
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">3. Radar UI (Next.js)</CardTitle>
                  <Badge variant="primary">Frontend</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-text-muted space-y-2">
                <p>
                  O painel Next.js renderiza em tempo real os alertas de animais encontrados com mapa de calor e filtros avançados.
                </p>
                <div className="font-mono text-xs bg-slate-100 p-2 rounded text-primary">
                  src/app/page.tsx
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estrutura do Módulo de Scraping Python</CardTitle>
              <CardDescription>
                Localização recomendada dos scripts Python em <code>src/scrapers/</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-[#0B1F3A] text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`src/scrapers/
├── requirements.txt      # Dependências (beautifulsoup4, requests, pydantic, playwright)
├── README.md             # Guia de execução dos robôs de scraping
├── pipelines/            # Pipeline de limpeza e normalização de dados
│   ├── image_cleaner.py  # Deduplicação e hashing de fotos
│   └── geocoding.py      # Resolução de latitude/longitude
└── targets/              # Coletores por fonte
    ├── facebook_groups.py
    └── ong_portals.py`}
              </pre>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
