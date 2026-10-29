---
description: Política canônica para promoção para a branch main, consolidação de PRs, gatekeeper rigoroso pré-push (zero untracked, build limpo, paridade lockfile, validação SDD), deploy na nuvem e versionamento SemVer pós-sucesso para o Hackathon Estácio.
alwaysApply: true
---

# 🚀 Política de Release Nuvem, Envio de PRs e Deploy Oficial

Esta política define o processo oficial e inegociável para consolidação de Pull Requests / commits acumulados, envio para a branch principal (`main`), homologação pelo pipeline de CI e execução com sucesso do deploy de produção na nuvem (Vercel, AWS, Render, Docker/Cloud) para a banca examinadora do **Hackathon Estácio**.

---

## 1. 🛡️ Gatekeeper Pré-Push (Checklist de Homologação Obrigatória)

Nenhum push para a branch `main` ou disparo de deploy na nuvem pode ser realizado sem que todas as 5 etapas abaixo sejam satisfeitas com sucesso:

```mermaid
flowchart TD
    A["Início do Release Nuvem"] --> B["Fase 1: Auditoria de Arquivos Não Rastreados\n(git status -s)"]
    B -->|Existem arquivos ?? importados| B1["git add nos arquivos novos necessários"]
    B1 --> C
    B -->|Zero órfãos| C["Fase 2: Validação de Lockfile & Dependências"]
    C --> D["Fase 3: Build Limpo de Produção\n(exit code 0)"]
    D -->|Build com erro| D1["Corrigir erros no código local"]
    D1 --> D
    D -->|Build 100% OK| E["Fase 4: Auditoria de Case-Sensitivity Linux"]
    E --> F["Fase 5: Validação de Integridade SDD & SSOT"]
    F --> G["Push para origin/main"]
    G --> H["Monitoramento Ativo do Deploy Nuvem"]
    H -->|Deploy Verde (Sucesso)| I["Incrementar versão para o próximo ciclo"]
    H -->|Deploy Falhou (Vermelho)| J["Manter mesma versão e aplicar fix"]
    J --> G
```

---

### Fase 1: Auditoria Rigorosa de Arquivos Não Rastreados (`git status -s`)
> [!CAUTION]
> **MOTIVO PRINCIPAL DE QUEBRA EM DEPLOY**: Arquivos criados localmente em `src/`, `components/`, `features/`, `services/` ou `database/migrations/` que são importados pelo sistema mas permanecem como *untracked* (`??`) no Git.

**Ação Obrigatória:**
1. Executar `git status -s`.
2. Se houver arquivos `??` necessários ao funcionamento da aplicação (frontend, backend ou migrações SQL), adicioná-los explicitamente com `git add <caminho>`.
3. Se houver arquivos de rascunho descartáveis ou temporários (`.temp/`, `.cache/`, dumps), adicioná-los ao `.gitignore`.
4. **Garantir que NENHUM import ou dependência ativa no código aponte para um arquivo ausente no Git.**

---

### Fase 1.1: Validação de Migrações e Schemas de Banco de Dados
- Se houver novas migrações em `src/database/migrations/`:
  1. Garantir que as instruções SQL são estritamente idempotentes (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, etc.).
  2. Confirmar que as migrações possuem rollback (`down`) testado.
  3. Todas as migrações devem ser comitadas conjuntamente com o código da aplicação que as consome.

---

### Fase 2: Paridade e Integridade do Lockfile
1. Se `package.json` (ou manifesto de pacotes) sofreu modificações de dependências, certificar-se de que o lockfile correspondente foi atualizado e comitado na mesma operação.
2. Em servidores de build automatizados, qualquer divergência entre manifesto e lockfile bloqueia a instalação com `--frozen-lockfile` ou gera builds inconsistentes.

---

### Fase 3: Build de Produção Limpo Obrigatório
Antes de subir para a `main`, execute o build de produção localmente:
```bash
# Para TypeScript/Node:
npm run build

# Para Python/FastAPI:
pytest --maxfail=1

# Para Go:
go build -v ./...
```
- O comando deve retornar código de saída `0` (`[SUCCESS]`).
- Se houver qualquer falha de tipagem, sintaxe ou import no build local, **o push está estritamente bloqueado**.

---

### Fase 4: Auditoria de Case-Sensitivity Linux
- Conferir se as letras maiúsculas e minúsculas de todos os `import` correspondem exatamente ao nome dos arquivos registrados no repositório (`git ls-files`).
- Os servidores de nuvem (Vercel, AWS, GitHub Runners) rodam sob Linux e falharão imediatamente se houver divergência de capitalização (ex: `UserService.ts` vs `userservice.ts`).

---

### Fase 5: Validação de Integridade SDD & Quarteto de Versão (SSOT)
Antes do release oficial:
1. Certificar-se de que os specs relacionados em `.kiro/specs/` possuem suas tarefas atualizadas em `tasks.md`.
2. Os 4 locais do quarteto SSOT devem conter exatamente a mesma versão:
   - `package.json`
   - `src/shared/version.ts`
   - `public/changelogs/index.json`
   - `public/changelogs/{versao}.json`

---

## 2. 🚀 Processo de Envio e Consolidação de PRs

1. **Mesclar/Rebasear Commits ou PRs Pendentes**:
   - Garantir que todos os commits do lote de entrega estão integrados na branch `main`.
2. **Executar o Push para a Nuvem**:
   ```bash
   git push origin main
   ```
3. **Disparo do Pipeline**: O push para a branch `main` dispara automaticamente o GitHub Actions CI e o deploy na plataforma de hospedagem em nuvem.

---

## 3. 🔍 Monitoramento Ativo e Resolução de Problemas no Deploy

1. **Acompanhar o Log de Deploy da Nuvem e GitHub Checks**:
   - Verificar se o build no GitHub Actions finalizou com status verde (`SUCCESS`).
   - Verificar se o painel da hospedagem (ex: Vercel, Render, Railway) registrou status **Ready / Production**.
2. **Tratamento de Falha de Deploy**:
   - Se o deploy FALHAR:
     - 🛑 **NÃO incrementar o número de versão**. O projeto permanece na versão atual.
     - Inspecionar a mensagem de erro no log (ex: `ENOENT: no such file or directory`, `TS2307: Cannot find module`, etc.).
     - Corrigir a causa raiz localmente (adicionar arquivo faltante ao git, corrigir import ou migração).
     - Criar um commit de correção mantendo a mesma versão:
       ```text
       v1.0.1 [infraestrutura] fix: correcao de importacao e inclusao de modulo faltante
       ```
     - Realizar novo `git push origin main` e validar a aprovação do deploy.

---

## 4. 🏷️ Política de Versionamento Semântico (SemVer)

O projeto adota versionamento semântico estrito `MAJOR.MINOR.PATCH`:

### 1. Patch (`X.Y.Z + 1` -> ex: `1.0.0` ➔ `1.0.1`):
- Correções de bugs (bugfixes).
- Ajustes finos de layout, pequenos refinamentos de UI/UX e micro-otimizações.
- Modificações totalmente retrocompatíveis e sem novas áreas no sistema.

### 2. Minor (`X.Y + 1.0` -> ex: `1.0.1` ➔ `1.1.0`):
- Lançamento de uma nova funcionalidade completa planejada no hackathon (ex: Módulo de Autenticação, Painel Administrativo, Novo Algoritmo de Predição).
- Alterações estruturais que adicionam recursos sem quebrar retrocompatibilidade.

### 3. Major (`X + 1.0.0` -> ex: `1.x` ➔ `2.0.0`):
- Redesign completo da arquitetura da solução.
- Mudanças que quebram contratos públicos de API ou remodelam drasticamente a persistência.

---

## 5. 🔄 Protocolo de Incremento Condicional Pós-Deploy Verde

> [!IMPORTANT]
> **O incremento oficial da versão para o próximo ciclo de desenvolvimento SÓ DEVE OCORRER APÓS O DEPLOY EM NUVEM FINALIZAR COM SUCESSO (STATUS VERDE).**

Após a confirmação de que o deploy em produção está 100% operacional:
1. Atualizar a versão para o próximo número patch (ex: de `1.0.1` para `1.0.2`):
   - Atualizar `"version": "1.0.2"` no manifesto.
   - Atualizar `APP_VERSION` em `src/shared/version.ts`.
   - Inserir `"1.0.2"` no topo de `public/changelogs/index.json`.
   - Criar o arquivo base `public/changelogs/1.0.2.json`.
2. Comitar a transição de versão:
   ```bash
   git commit -m "v1.0.2 [governanca] chore: incrementa versao para v1.0.2 apos deploy com sucesso da v1.0.1"
   ```

---

## 6. 📋 Governança do Changelog e Apresentação para Jurados

Ao preparar uma versão de entrega para os jurados do hackathon:
1. **Linguagem Amigável e Foco em Valor de Negócio**:
   - 🚫 Nunca usar nomes técnicos internos: `AppContainer.tsx`, `useFetchUser`, `SQLAlchemy async_session`.
   - ✅ Sempre usar nomes do domínio da solução: `Módulo de Triagem de Pacientes`, `Dashboard em Tempo Real`, `Autenticação Segura com MFA`.
2. **Destaques da Solução (Highlights)**:
   - Forneça no changelog 2 ou 3 frases de alto impacto resumindo a inovação entregue nesta versão para facilitar o pitch de apresentação.
