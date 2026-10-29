# Requisitos: 002 - UI/UX Design System & Tokens PATA RADAR

- **ID do Spec:** `SPEC-002`
- **Status:** Aprovada
- **Data de Criação:** 2026-10-29
- **Escopo:** Paleta de Cores Oficial, Tipografia Padronizada, Hierarquia Visual e Componentes Base

---

## 1. Visão Geral
Padronizar a identidade visual, escala tipográfica e sistema de cores para a plataforma **PATA RADAR**, garantindo conformidade com WCAG 2.1 AA, consistência entre o frontend Next.js + TypeScript e o módulo de telemetria de scraping em Python.

---

## 2. Paleta Oficial Obrigatória

```css
:root {
  --color-primary: #0B1F3A;
  --color-secondary: #10B981;
  --color-alert: #F59E0B;

  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #0B1F3A;
  --color-text-muted: #334155;
  --color-border: #E2E8F0;
}
```

---

## 3. Requisitos Estruturados (EARS)

1. **[REQ-01] Ubíquo:** O sistema deve aplicar os tokens de cores oficiais `:root` em todos os componentes de interface via CSS Variables e Tailwind CSS.
2. **[REQ-02] Ubíquo:** O sistema deve padronizar a tipografia através das famílias `Plus Jakarta Sans` (interface geral e títulos) e `JetBrains Mono` (código, métricas e payloads dos scrapers).
3. **[REQ-03] Baseado em Evento:** QUANDO o usuário interagir com botões ou elementos acionáveis, o componente DEVE fornecer feedback visual em menos de 100ms através de transições de cor (hover, active, focus) e anel de foco destacado com `--color-secondary`.
4. **[REQ-04] Baseado em Estado:** ENQUANTO um processo assíncrono (ex: disparo de scraper Python) estiver em andamento, o botão acionador deve desabilitar cliques repetidos e exibir spinner de carregamento.
5. **[REQ-05] Acessibilidade:** Textos e elementos informativos devem manter razão de contraste mínima de 4.5:1 para texto normal e 3:1 para elementos de controle (WCAG 2.1 AA).

---

## 4. Critérios de Aceite Verificáveis

- [x] **AC-01:** Variáveis CSS `:root` declaradas com os valores exatos fornecidos (#0B1F3A, #10B981, #F59E0B, #F8FAFC, #FFFFFF, #334155, #E2E8F0).
- [x] **AC-02:** Configuração do Tailwind (`tailwind.config.ts`) estendendo a paleta de cores mapeada nos tokens.
- [x] **AC-03:** Escala de tipografia definida (Display, H1, H2, H3, H4, Body Large, Body Base, Body Muted, Caption).
- [x] **AC-04:** Componentes primitivos (`Button`, `Badge`, `Card`, `Header`) criados e em conformidade com o Design System.
- [x] **AC-05:** Estrutura para os scrapers Python configurada com contratos de dados validados.
