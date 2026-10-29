# 🚀 Hackathon Estácio - Spec-Driven Development (SDD) com Kiro IDE

Projeto estruturado profissionalmente segundo a metodologia de **Desenvolvimento Orientado a Especificações (Spec-Driven Development - SDD)** e as melhores práticas de programação assistida por Inteligência Artificial no **Kiro IDE**.

---

## 🎯 Por que Spec-Driven Development (SDD)?

Ao contrário do desenvolvimento tradicional com IA ("*vibe coding*"), onde instruções livres geram código fragmentado, dívida técnica e decisões perdidas em chats temporários, o **SDD no Kiro IDE** garante:

1. **Rastreabilidade Total:** Todo requisito nasce formalizado em `.kiro/specs/`, com critérios de aceite determinísticos e mensuráveis.
2. **Arquitetura Antes do Código:** Diagramas de sequência, contratos de dados (DTOs) e estratégias de persistência são desenhados e validados na fase de design.
3. **Execução Autônoma e Segura:** Agentes de IA executam tarefas atômicas sequenciais mapeadas em `tasks.md`, guiados por regras de governança e *skills* especializadas.

---

## 🏛️ Estrutura do Projeto (.kiro e Arquitetura Limpa)

```text
hackathon-estacio/
├── .github/
│   ├── workflows/ci.yml         # Pipeline CI para validação de integridade SDD
│   └── pull_request_template.md # Template rastreável de PR
├── .kiro/
│   ├── steering/                # Regras de governança globais da IA (Sempre ativas)
│   │   ├── sdd-methodology.md
│   │   ├── ai-programming-best-practices.md
│   │   ├── tech-agnostic-architecture.md
│   │   └── git-workflow-conventions.md
│   ├── specs/                   # Especificações em 3 fases (Requirements -> Design -> Tasks)
│   │   ├── _template/           # Modelo para criação de novas specs durante o evento
│   │   └── 001-core-architecture/ # Spec fundacional de arquitetura e healthcheck
│   ├── skills/                  # Procedimentos especializados sob demanda (agentskills.io)
│   │   ├── banco/               # Persistência, ORM, Migrações e ACID
│   │   ├── front/               # Arquitetura frontend, estado e ciclo assíncrono
│   │   ├── test/                # Pirâmide de testes, TDD e Property-Based Testing
│   │   ├── uiux/                # Design de experiência, WCAG 2.1 AA e Design Tokens
│   │   ├── seguranca/           # OWASP Top 10, AuthN/AuthZ e proteção de segredos
│   │   └── dba/                 # Indexação, EXPLAIN ANALYZE, concorrência e pooling
│   └── hooks/                   # Gatilhos automáticos de workspace (PostFileSave, PreTask)
├── src/
│   ├── backend/                 # Clean Architecture (domain, application, infrastructure, presentation)
│   ├── frontend/                # Feature-Driven (components, features, layouts, services)
│   ├── database/                # Migrações versionadas, schemas e seeds
│   └── shared/                  # Tipagens e utilitários universais
├── tests/                       # Testes automatizados (unit, integration, e2e)
├── docs/                        # Documentações adicionais e manuais do time
├── .editorconfig                # Padronização de formatação
├── .env.example                 # Modelo seguro de variáveis de ambiente
└── .gitignore                   # Proteção de segredos e filtros poliglotas
```

---

## 🧠 As 6 Skills Especializadas do Kiro IDE

| Skill | Localização | Propósito Principal |
|---|---|---|
| **`banco`** | [`.kiro/skills/banco/SKILL.md`](.kiro/skills/banco/SKILL.md) | Inversão de dependência em persistência, transações atômicas e migrações reversíveis. |
| **`front`** | [`.kiro/skills/front/SKILL.md`](.kiro/skills/front/SKILL.md) | Componentização limpa, estados de interface obrigatórios (Idle, Loading, Error, Empty, Success). |
| **`test`** | [`.kiro/skills/test/SKILL.md`](.kiro/skills/test/SKILL.md) | Padrão AAA (Arrange-Act-Assert), cobertura de cenários de borda e Property-Based Testing. |
| **`uiux`** | [`.kiro/skills/uiux/SKILL.md`](.kiro/skills/uiux/SKILL.md) | WCAG 2.1 AA (contraste, foco por teclado), microinterações e redução de carga cognitiva. |
| **`seguranca`** | [`.kiro/skills/seguranca/SKILL.md`](.kiro/skills/seguranca/SKILL.md) | Proteção OWASP Top 10, hash com Argon2id/bcrypt, cookies HttpOnly e mitigação IDOR/BOLA. |
| **`dba`** | [`.kiro/skills/dba/SKILL.md`](.kiro/skills/dba/SKILL.md) | Estratégia de indexação cirúrgica, análise de `EXPLAIN ANALYZE`, locking otimista e pooling. |

---

## 🔄 Fluxo de Trabalho com SDD no Kiro IDE

Quando o time for iniciar uma nova funcionalidade durante o hackathon:

1. **Criar a pasta da funcionalidade:**
   Copie a pasta `.kiro/specs/_template/` para `.kiro/specs/<numero>-<nome-da-feature>/`.
2. **Preencher a Fase 1 (`requirements.md`):**
   Defina as histórias de usuário e os critérios de aceite em sintaxe EARS.
3. **Preencher a Fase 2 (`design.md`):**
   Desenhe o diagrama de sequência em Mermaid, especifique contratos JSON de entrada/saída e modelo de dados.
4. **Planejar a Fase 3 (`tasks.md`):**
   Quebre a implementação em tarefas atômicas numeradas com checkboxes `- [ ]`.
5. **Executar via Agente Kiro:**
   O agente lê o spec e executa tarefa por tarefa, gerando os testes, implementando o código e marcando `- [x]`.

---

## 🛠️ Como Conectar a Stack Tecnológica Escolhida

Como o repositório é agnóstico, você pode inicializar a stack de sua preferência com apenas 1 comando na pasta correspondente:

### Opção A: TypeScript / Node.js (Fullstack ou API)
```bash
# Na raiz ou em src/backend:
npm init -y
npm install typescript @types/node tsx -D
npx tsc --init
```

### Opção B: Python / FastAPI
```bash
# Na raiz ou em src/backend:
python -m venv .venv
# Ativar venv e instalar:
pip install fastapi uvicorn pydantic sqlalchemy pytest
```

### Opção C: Go
```bash
go mod init hackathon-estacio
```

---

## 🔒 Boas Práticas e Segurança

- **Segredos:** Copie `.env.example` para `.env`. O arquivo `.env` está explicitamente ignorado no `.gitignore`.
- **Commits:** Siga o padrão Conventional Commits (`feat:`, `fix:`, `spec:`, `test:`, `docs:`, `chore:`).
