---
description: Diretrizes obrigatórias para criação e manutenção de documentação técnica no projeto Proskë.
globs: ai/docs/**/*.md, docs/**/*.md
alwaysApply: true
---

# Documentation Policy (Governança de Documentação)

Toda documentação técnica deve ser legível para humanos e IAs, alinhada com as 5 Regras de Ouro de Governança (`SSOT_Docs_Governanca-v3.4.16.md`).

## 📜 As 5 Regras Obrigatórias de Nomenclatura e Governança

1. **Documentos SSOT (Single Source of Truth):**
   - Docs que são fontes únicas da verdade devem obrigatoriamente iniciar com `SSOT_[Função]` em CamelCase.
   - *Exemplos:* `SSOT_LFS_ChordsLyrics-v3.4.16.md`, `SSOT_Design_Icones-v3.4.16.md`, `SSOT_Design_PopUps-v3.4.16.md`.

2. **Estrutura de Elaboração e Hierarquia Obrigatória:**
   - **Nome:** `[SSOT_][Função]_[NomeDescritivo]-v[Versão].md` (CamelCase).
   - **Cabeçalho com Metadata de Escopo:**
     ```markdown
     # [SSOT_][Função] — [Nome do Recurso]

     > **[SSOT_] Documento Oficial**  
     > **Escopo / Função:** `[Escopo]` (ex: Repertório, LFS, Metrônomo, Studio, DevTools, Auth, Agenda, etc.)  
     > **Tipo:** `[SSOT | Feature / Arquitetura | Manual]`  
     > **Versão do App:** `v3.4.16`  
     > **Última Atualização:** `YYYY-MM-DD`  

     ---

     ### 🗺️ Hierarquia & Navegação

     - 📍 **Documento Pai:** [`[Pai - Nome]`](file:///d:/apps/app-proske/path/to/parent.md)
     - 👥 **Documentos Irmãos:** [`[Irmão 1]`](file:///...), [`[Irmão 2]`](file:///...)
     - 👶 **Documentos Filhos:** [`[Filho 1]`](file:///...) *(ou Nenhum)*

     ---
     ```
   - **Seções obrigatórias:** `🎯 Objetivo`, `🧩 Componentes e Arquivos Relacionados`, `📏 Regras de Negócio`, `🗄️ Modelo de Dados / Supabase`, `🔗 Dependências e Referências Cruzadas`, `📝 Histórico de Atualizações`.
   - **Atualização:** Ao modificar um doc, atualizar a versão no nome e cabeçalho, incluir histórico de atualizações e atualizar o `ai/docs/index.md`.

3. **Indexação Obrigatória:**
   - 100% dos arquivos de documentação técnica (SSOTs, especificações de features, manuais, arquitetura, APIs, provedores, modelo de dados, operações, segurança, compliance, roadmap, testes e legados) devem ser obrigatoriamente catalogados no `ai/docs/index.md`. Nenhum documento técnico órfão é permitido.
   - *Exceção:* Relatórios individuais de bugs salvos em `ai/docs/bugs/` (`to-do/`, `doing/`, `done/`) são rastreados pelo Backloger e resumidos na seção de Bug Tracking do `index.md`, não devendo ser listados um a um.

4. **Organização em Subpastas por Função de Módulo:**
   - Todos os arquivos de documentação técnica em `ai/docs/` devem ser salvos dentro de subpastas por função/módulo (ex: `ai/docs/lfs/`, `ai/docs/repertorio/`, `ai/docs/metronome/`, `ai/docs/studio/`, `ai/docs/auth/`, `ai/docs/agenda/`, `ai/docs/devtools/`, `ai/docs/design/`, `ai/docs/produtos/`, `ai/docs/cifras/`, `ai/docs/live-mode/`, `ai/docs/busca/`, `ai/docs/pdf/`, `ai/docs/crm/`, `ai/docs/playlists/`, `ai/docs/navegacao/`, `ai/docs/cursos/`, `ai/docs/diagnostico/`, `ai/docs/linktree/`).

5. **Prefixo de Função Específica em CamelCase:**
   - Se o documento refere-se a uma função específica do app, o nome dessa função deve estar na frente em CamelCase (ex: `LFS`, `Repertorio`, `Metronome`, `Escala`, `Studio`, `Auth`, `Agenda`, `DevTools`, `Produtos`, `Diagnostico`, `Cursos`, `Crm`, `Paywall`, `Pdf`, `Design`, `Docs`).

6. **Sufixo de Versão do App:**
   - O final do nome do arquivo deve obrigatoriamente conter a versão do aplicativo (`-vX.Y.Z.md`) sincronizada com o `package.json` (ex: `-v3.4.16.md`).
