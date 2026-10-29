---
inclusion: always
---

# Convenções de Git, Versionamento e Políticas de Commit (Local & Nuvem)

Este documento padroniza os commits, ramificações (branches), pull requests e releases para manter o repositório auditável por avaliadores do hackathon e executável com precisão pelos Agentes do Kiro IDE.

> 📚 **Políticas Canônicas Canônicas de Governança:**
> - Central Hub: [`docs/commit-policy.md`](file:///d:/apps/hackathon-estacio/docs/commit-policy.md)
> - Desenvolvimento Local & Staging: [`docs/commit-policy-local.md`](file:///d:/apps/hackathon-estacio/docs/commit-policy-local.md)
> - Release Nuvem & Deploy Oficial: [`docs/commit-policy-cloud.md`](file:///d:/apps/hackathon-estacio/docs/commit-policy-cloud.md)

---

## 1. Padrão de Mensagem de Commit

Os commits devem ser atômicos e seguir o formato canônico do projeto:

```text
vX.Y.Z [SPEC-ID / modulo] tipo: descrição clara da alteração no imperativo
```

### Tipos Válidos (Conventional Commits):
- `feat`: Nova funcionalidade implementada a partir de uma tarefa da spec.
- `improvement`: Melhoria de UX, performance ou ergonomia existente.
- `fix`: Correção de bug referenciado em spec de bugfix ou teste quebrado.
- `spec`: Criação ou atualização de especificações em `.kiro/specs/`.
- `test`: Criação ou ajuste de suítes de testes (unitários, integração, e2e).
- `docs`: Documentação, README, manuais ou diagramas.
- `refactor`: Alteração estrutural de código sem mudança de comportamento.
- `chore`: Atualização de dependências, scripts de automação, configuração de CI/CD.
- `style`: Ajustes visuais, formatação de código ou linting.

---

## 2. Regra Fundamental de Desenvolvimento Local (Commit-Local)

1. **Incremento SemVer Contínuo:** A cada commit local executado sob a política local, a versão sobe automaticamente por **PATCH** (ex: `1.0.0` ➔ `1.0.1`), a menos que o usuário solicite explicitamente `MINOR` ou `MAJOR`.
2. **Sincronização SSOT de Versão:** Mantenha os 4 locais sincronizados (`package.json`, `version.ts`, changelog index e changelog detalhado).
3. **Staging Seletivo Anti-ENOENT:** Nunca use `git add .` indiscriminado. Todo novo arquivo criado (`??` no `git status`) e importado por outro módulo DEVE ser adicionado ao Git para evitar falhas `ENOENT` em servidores Linux.
4. **Push Retido:** Não realizar `git push origin main` durante o ciclo de desenvolvimento local; reter alterações até a homologação da release.

---

## 3. Regra Fundamental de Release Nuvem (Commit-Cloud)

1. **Gatekeeper Pré-Push em 5 Fases:**
   - Auditoria de arquivos `??` no `git status -s`.
   - Paridade e integridade do lockfile.
   - Build de produção limpo com exit code 0.
   - Auditoria de Case-Sensitivity Linux nos `import`.
   - Rastreabilidade SDD com `tasks.md` atualizadas.
2. **Incremento Condicional Pós-Deploy Verde:** A versão de produção só é promovida após o deploy em nuvem (Vercel/GitHub CI) finalizar com status de sucesso. Se o deploy falhar, o número de versão é preservado e o fix é aplicado.

