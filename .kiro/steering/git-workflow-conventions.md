---
inclusion: always
---

# Convenções de Git e Versionamento para o Hackathon

Este documento padroniza os commits, ramificações (branches) e pull requests para manter o repositório organizado e auditável por avaliadores do hackathon e agentes de IA.

---

## 1. Padrão de Commits (Conventional Commits)

Os commits devem ser atômicos e seguir a estrutura:

```text
<tipo>(<escopo>): <descrição no imperativo e concisa>

[corpo opcional explicando motivação e decisões]

[rodapé opcional referenciando spec ou issue, ex: Closes #12, Spec: 001]
```

### Tipos Válidos:
- `feat`: Nova funcionalidade implementada a partir de uma tarefa da spec.
- `fix`: Correção de bug referenciado em spec de bugfix ou teste quebrado.
- `spec`: Criação ou atualização de especificações em `.kiro/specs/`.
- `test`: Criação ou ajuste de suites de testes (unitários, integração, e2e).
- `docs`: Documentação, README, manuais ou diagramas.
- `refactor`: Alteração de código que não corrige bug nem adiciona funcionalidade.
- `chore`: Atualização de dependências, scripts de automação, configuração de CI/CD.
- `style`: Ajustes visuais, formatação de código ou linting.

---

## 2. Estratégia de Branches

- `main` (ou `master`): Código estável, testado e pronto para apresentação/deploy do hackathon.
- `feat/<nome-da-feature>`: Desenvolvimento de uma funcionalidade mapeada em spec.
- `fix/<nome-do-bug>`: Correções urgentes.
- `spec/<nome-da-spec>`: Trabalho exclusivo na criação das 3 fases de especificação.

---

## 3. Checklist Pré-Merge / Pré-Push

Antes de enviar alterações para a branch principal:
- [ ] O arquivo `tasks.md` da spec correspondente foi atualizado com as caixas marcadas.
- [ ] Todos os testes automatizados estão passando localmente.
- [ ] Nenhum segredo, senha ou chave privada está contida nas alterações.
- [ ] A formatação e o linter foram executados.
