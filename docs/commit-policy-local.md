---
description: Política canônica de desenvolvimento local, criação de branches/PRs, agrupamento atômico de diffs, staging seletivo inteligente (inclusão mandatória de arquivos untracked), rastreabilidade com SDD (tasks.md), incremento SemVer e testes pré-commit para o Hackathon Estácio.
alwaysApply: true
---

# 🛠️ Política de Commits Locais, Versionamento e Rastreabilidade SDD

Esta política define os padrões obrigatórios para o fluxo de desenvolvimento local, versionamento semântico contínuo a cada commit, empacotamento cirúrgico de arquivos e prevenção de erros que impeçam o deploy em ambientes de nuvem (Vercel, AWS, Linux/Containers).

---

## 1. 🔢 Regra de Versionamento Contínuo (Incremento por Commit Local)

> [!IMPORTANT]
> ### 🚨 REGRA OBRIGATÓRIA DE VERSIONAMENTO LOCAL
> Sempre que o desenvolvedor ou o Agente Kiro executar um commit local seguindo esta política (ex: `"siga politica de commit-local"`, `"commit-local"`, etc.):
> 
> 1. **Incremento Padrão (DEFAULT -> PATCH)**:
>    - **A versão DEVE SEMPRE subir por PATCH** (ex: `1.0.0` ➔ `1.0.1`, `1.0.1` ➔ `1.0.2`).
> 2. **Exceção Explícita (MINOR ou MAJOR)**:
>    - A versão só deve subir para **MINOR** (ex: `1.0.2` ➔ `1.1.0`) ou **MAJOR** (ex: `1.0.2` ➔ `2.0.0`) se o usuário solicitar **EXPLICITAMENTE** no comando (ex: *"suba versão para minor"*, *"versão major"*, *"incremente minor"*).
> 3. **Push Suspenso (Modo Retenção Local)**:
>    - Não realizar `git push origin main` enquanto a etapa de desenvolvimento local estiver em andamento. O push é reservado para releases homologados pela [Política de Release Nuvem](./commit-policy-cloud.md).

---

## 2. 🔄 Sincronização Obrigatória do Quarteto SSOT de Versão

A cada incremento de versão local, os seguintes **4 locais DEVEM ser atualizados e sincronizados** antes do commit:

| # | Arquivo | Propriedade | Exemplo |
|---|---|---|---|
| 1 | `package.json` (ou manifesto da stack) | `"version"` | `"1.0.1"` |
| 2 | `src/shared/version.ts` (ou equivalente) | `APP_VERSION` | `"v.1.0.1 - Hackathon Estácio"` |
| 3 | `public/changelogs/index.json` (ou `docs/changelogs/index.json`) | Topo do array | `["1.0.1", "1.0.0"]` |
| 4 | `public/changelogs/{nova_versao}.json` | Arquivo do changelog | `{"version": "1.0.1", ...}` |

---

## 3. 🎯 Rastreabilidade com Spec-Driven Development (SDD)

No Kiro IDE, todo commit local deve estar diretamente associado a um Spec e uma tarefa:

1. **Atualização Atômica de `tasks.md`:**
   - Antes de fechar o commit da funcionalidade, altere o checkbox da tarefa ativa em `.kiro/specs/<id>/tasks.md` de `- [ ]` para `- [x]`.
2. **Inclusão do ID do Spec na Mensagem de Commit:**
   - O commit deve referenciar o ID do Spec ou o módulo correspondente entre colchetes.

---

## 4. 🛡️ Staging Seletivo Inteligente & Prevenção de Arquivos Órfãos

> [!CAUTION]
> ### 🚨 A REGRA DE OURO ANTI-FALHA DE DEPLOY (ENOENT / UNTRACKED FILES)
> O erro mais comum e grave de deploy na nuvem ocorre quando um arquivo novo (`.tsx`, `.ts`, `.py`, migração `.sql`, etc.) é criado localmente e importado por outro módulo, mas **não é adicionado ao Git** (`??` no `git status`).
> 
> Como o arquivo existe no seu disco local, o build local funciona. Porém, ao subir para o Git, o servidor remoto ou runner de CI clona apenas os arquivos rastreados e **o build na nuvem quebra fatalmente** com:
> `Could not load ... : ENOENT: no such file or directory` ou `ModuleNotFoundError`.

### Protocolo Obrigatório de Staging:
1. **Auditar arquivos modificados e não rastreados**:
   ```bash
   git status -s
   ```
2. **Adicionar arquivos modificados E novos arquivos criados (Frontend + Backend + Banco)**:
   - **PROIBIDO `git add .` indiscriminado** (para não incluir arquivos temporários indesejados, logs, dumps ou segredos `.env`).
   - **OBRIGATÓRIO incluir explicitamente todos os novos arquivos criados que fazem parte do escopo**:
   ```bash
   # Exemplo correto de staging de arquivos modificados e novos arquivos criados
   git add src/backend/domain/User.ts src/frontend/features/auth/LoginForm.tsx src/database/migrations/002_create_users.sql
   ```
3. **Verificar dependências de imports e migrações SQL**:
   - Antes de fechar o commit, conferir se nenhum `import ... from './NovoComponente'` aponta para um arquivo que permaneceu como `??` no `git status`.
   - Se houver novas migrações SQL, certificar-se de que são idempotentes e foram adicionadas ao staging.

---

## 5. 🔤 Verificação Crítica de Case-Sensitivity (Windows vs Linux)

- **O ambiente Windows é case-insensitive** (ignora maiúsculas e minúsculas).
- **A Nuvem e os servidores de CI (Linux) são case-sensitive** (diferenciam rigorosamente `Button.tsx` de `button.tsx`).
- **Regra:** Todos os caminhos em `import ... from '...'` devem respeitar com exatidão o casing com que o arquivo foi registrado no Git (`git ls-files`).

---

## 6. 🔒 Paridade de Dependências e Lockfile

1. Se qualquer dependência for adicionada, removida ou atualizada:
   - O arquivo de lock (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`, etc.) **DEVE** ser atualizado na mesma operação.
   - O arquivo de lock **DEVE** ser adicionado ao mesmo commit que alterou as dependências.
2. Nunca subir alterações de dependência sem o respectivo lockfile sincronizado.

---

## 7. 📝 Padrão de Mensagem de Commit Local

Formato obrigatório:
```text
vX.Y.Z [SPEC-ID / modulo] tipo: descrição clara da alteração no imperativo
```

### Tipos Válidos (Conventional Commits):
- `feat`: Nova funcionalidade implementada a partir do spec.
- `improvement`: Melhoria de UX, performance ou ergonomia existente.
- `fix`: Correção de bug referenciado em spec ou falha de teste.
- `refactor`: Alteração estrutural de código sem mudança de comportamento.
- `spec`: Criação ou atualização de especificações em `.kiro/specs/`.
- `test`: Adição ou refatoração de testes automatizados.
- `style`: Ajustes puramente visuais, CSS ou formatação de código.
- `docs`: Documentação técnica ou governança.
- `chore`: Atualização de configurações, builds ou dependências.

### Exemplos Válidos no Hackathon:
- `v1.0.1 [SPEC-001 / healthcheck] feat: implementar endpoint de diagnostico e teste unitario`
- `v1.0.2 [SPEC-002 / auth] feat: criar validacao de schema com Zod e entidade User`
- `v1.0.3 [SPEC-002 / auth] fix: tratamento de erro 401 para credenciais invalidas`
- `v1.0.4 [SPEC-003 / ui] style: adicionar indicador de status com transicao suave no header`

---

## 8. 📋 Changelog da Nova Versão (`public/changelogs/{nova_versao}.json`)

Ao finalizar a alteração:
1. Criar/atualizar o arquivo da versão atual (`{nova_versao}.json`).
2. Adicionar o resumo no array `highlights`.
3. **Regras de Linguagem**:
   - 🚫 **PROIBIDO**: Termos brutos de código interno (`.tsx`, `useEffect`, `FastAPI Depends`, `SQLAlchemy session`).
   - ✅ **OBRIGATÓRIO**: Linguagem clara de negócio e produto direcionada aos jurados do hackathon (`Autenticação Segura`, `Painel de Monitoramento`, `Diagnóstico de Banco de Dados`).

---

## 9. ✅ Checklist Local Pré-Commit (Execução Obrigatória)

Antes de executar `git commit`:
- [ ] Versão incrementada por **PATCH** (ou **MINOR/MAJOR** se solicitado explicitamente).
- [ ] **Quarteto SSOT sincronizado** com o novo número de versão.
- [ ] `git status -s` executado e analisado.
- [ ] Todos os novos arquivos (`??`) importados foram adicionados ao staging (`git add`).
- [ ] Imports conferidos quanto a maiúsculas/minúsculas (case-sensitivity Linux).
- [ ] Build local de validação testado com sucesso.
- [ ] Tarefa correspondente marcada como concluída em `.kiro/specs/<id>/tasks.md`.
- [ ] Lockfile sincronizado caso novas dependências tenham sido instaladas.
