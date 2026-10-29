import React from 'react';
import { Badge } from '../ui/Badge';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm ring-2 ring-primary/10">
            {/* Radar / Paw icon SVG */}
            <svg
              className="w-6 h-6 text-secondary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Radar concentric rings with paw shape */}
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 1 0 6 6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M20 12h2" />
              <path d="M2 12h2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-xl text-primary font-heading">
                PATA RADAR
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary text-white">
                v1.0
              </span>
            </div>
            <p className="text-xs text-text-muted hidden sm:block">
              Inteligência de Monitoramento & Web Scraping
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <Badge variant="success" withDot pulsing>
            Radar Ativo
          </Badge>

          <Badge variant="alert" withDot>
            Python Scrapers: Idle
          </Badge>
        </div>
      </div>
    </header>
  );
};
