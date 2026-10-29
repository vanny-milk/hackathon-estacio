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

## 3. Design Tokens e Design System

Padronize as variáveis visuais fundamentais:
- **Espaçamento:** Escala modular baseada em 4px/8px (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px).
- **Tipografia:** Família de fontes legível (ex: Inter, Roboto, Plus Jakarta Sans), com escala de tamanhos proporcional (text-xs a text-4xl).
- **Paleta de Cores Semântica:**
  - `primary`: Identidade principal da aplicação.
  - `success`: Confirmações e dados positivos (#10B981 ou similar).
  - `warning`: Alertas e atenção (#F59E0B ou similar).
  - `danger` / `error`: Ações destrutivas e erros (#EF4444 ou similar).
  - `neutral`: Escala de cinzas para textos, bordas e fundos.

---

## 4. Checklist de Avaliação para o Agente Kiro

- [ ] A interface é 100% responsiva (Mobile-First, testada em 375px, 768px e 1280px+).
- [ ] Textos e mensagens utilizam micro-copy empático e em bom Português.
- [ ] Elementos de formulário possuem estados de erro inline claros.
- [ ] Há suporte visual agradável com tema moderno (Dark Mode opcional ou cores polidas).
- [ ] Nenhum texto truncado ou sobreposição de layout em resoluções comuns.
