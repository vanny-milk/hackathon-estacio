---
name: uiux
description: Diretrizes de Design de Interface (UI), Experiência do Usuário (UX), Acessibilidade Web (WCAG 2.1 AA) e Design System.
---

# Skill: UI/UX & Design de Experiência

Esta skill orienta o Agente Kiro na criação de interfaces visuais memoráveis, acessíveis, ergonômicas e profissionais para avaliadores e usuários finais.

---

## 1. Princípios de Experiência do Usuário (UX)

### 1.1 Hierarquia Visual e Redução de Carga Cognitiva
- Cada tela deve possuir **um único objetivo primário** em destaque (Call To Action com cor de destaque).
- Aplique a **Lei de Fitts:** Botões de ações cruciais devem ter tamanho generoso (mínimo de 44x44 pixels em dispositivos touch) e estar em locais de fácil alcance.
- **Lei de Jakob:** Mantenha convenções familiares (ícone de lupa para busca, engrenagem para configurações, carrinho no canto superior direito).

### 1.2 Feedback Visual e Microinterações
- Toda interação do usuário (clique, hover, submissão) DEVE produzir resposta visual imediata (< 100ms):
  - Botões mudam de estado em hover e active.
  - Submissões desabilitam o botão e exibem spinner de progresso para evitar múltiplos cliques acidentais.
  - Ações bem-sucedidas disparam notificações toast contextuais com duração configurada e botão de fechar.

---

## 2. Acessibilidade (WCAG 2.1 Nível AA)

1. **Contraste de Cores:**
   - Textos normais devem ter contraste mínimo de **4.5:1** contra o fundo.
   - Textos grandes (≥ 18pt ou 14pt bold) e elementos gráficos devem ter contraste mínimo de **3:1**.
2. **Navegabilidade por Teclado:**
   - Todos os elementos interativos (links, botões, inputs) devem ser acessíveis via tecla `Tab`.
   - O indicador de foco (`focus-visible`) NUNCA deve ser removido com `outline: none` sem um substituto visual evidente (ex: anel de foco destacado).
3. **Semântica HTML e ARIA:**
   - Use tags HTML nativas (`<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`).
   - Forneça atributos `aria-label` para botões que contenham apenas ícones.
   - Todo input deve possuir um `<label>` explicitamente associado via `htmlFor`/`for`.

---

## 3. Design System & Tokens - PATA RADAR

Padronização obrigatória de identidade visual e tokens para o **PATA RADAR**:

### 3.1 Paleta de Cores Oficial (:root)
```css
:root {
  --color-primary: #0B1F3A;    /* Azul Marinho Profundo (Identidade, Headings, Ação Principal) */
  --color-secondary: #10B981;  /* Verde Esmeralda (Status Ativo, Sucesso, Confirmações) */
  --color-alert: #F59E0B;      /* Âmbar / Laranja (Avisos, Atenção, Scrapers em execução) */

  --color-background: #F8FAFC; /* Slate 50 (Fundo Geral da Aplicação) */
  --color-surface: #FFFFFF;    /* Branco Puro (Cards, Modais, Tabelas, Painéis) */
  --color-text: #0B1F3A;       /* Texto Primário de Alto Contraste */
  --color-text-muted: #334155; /* Slate 700 (Texto Secundário, Legendas, Metadados) */
  --color-border: #E2E8F0;     /* Slate 200 (Divisórias, Bordas Sutis de Cards) */
}
```

### 3.2 Tipografia e Escala Hierárquica
- **Família de Fontes Primária:** `Plus Jakarta Sans` ou `Inter` (sans-serif moderno, legível e geométrico).
- **Família de Fontes Monospaçada:** `JetBrains Mono` ou `Fira Code` (para métricas, payloads e logs dos scrapers Python).
- **Escala de Hierarquia Visual:**
  - **Display / Hero:** 36px-48px (2.25rem - 3rem) | Weight 800 | Leading 1.15 | Color: `--color-primary`
  - **Heading 1 (H1):** 30px (1.875rem) | Weight 700 | Leading 1.25 | Color: `--color-primary`
  - **Heading 2 (H2):** 24px (1.5rem) | Weight 600 | Leading 1.3 | Color: `--color-primary`
  - **Heading 3 (H3):** 20px (1.25rem) | Weight 600 | Leading 1.4 | Color: `--color-primary`
  - **Heading 4 (H4):** 16px (1rem) | Weight 600 | Leading 1.45 | Color: `--color-primary`
  - **Body Large:** 18px (1.125rem) | Weight 400/500 | Leading 1.6 | Color: `--color-text`
  - **Body Base:** 16px (1rem) | Weight 400 | Leading 1.5 | Color: `--color-text`
  - **Body Small / Muted:** 14px (0.875rem) | Weight 400/500 | Leading 1.5 | Color: `--color-text-muted`
  - **Caption / Overline:** 12px (0.75rem) | Weight 600 | Uppercase | Tracking 0.05em | Color: `--color-text-muted`

### 3.3 Regras de Hierarquia Visual & Superfícies
1. **Contraste e Fundo:** O fundo `--color-background` (#F8FAFC) deve ser neutro e suave; componentes principais devem ficar contidos em superfícies `--color-surface` (#FFFFFF) com borda `--color-border` (#E2E8F0) e raio de curvatura padronizado (8px a 12px).
2. **Prioridade de Botões:**
   - *Primário:* Background `--color-primary` com texto branco. Usado para a ação principal da tela.
   - *Secundário / Ação Positiva:* Background `--color-secondary` com texto escuro `#0B1F3A` ou branco com peso bold para máxima legibilidade.
   - *Alerta:* Background `--color-alert` com texto escuro `#0B1F3A` para ações que exigem atenção.
   - *Ghost / Outline:* Fundo transparente com borda `--color-border` e texto `--color-text`.
3. **Indicadores de Radar & Status:** O PATA RADAR utiliza anéis pulsantes ou badges com `--color-secondary` para dados atualizados e ativos, e `--color-alert` para scrapers pendentes ou dados sob verificação.

---

## 4. Checklist de Avaliação para o Agente Kiro

- [ ] A interface é 100% responsiva (Mobile-First, testada em 375px, 768px e 1280px+).
- [ ] Textos e mensagens utilizam micro-copy empático e em bom Português.
- [ ] Elementos de formulário possuem estados de erro inline claros.
- [ ] Há suporte visual agradável com tema moderno (Dark Mode opcional ou cores polidas).
- [ ] Nenhum texto truncado ou sobreposição de layout em resoluções comuns.
