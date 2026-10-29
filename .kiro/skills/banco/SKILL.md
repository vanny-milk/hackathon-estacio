---
name: banco
description: Diretrizes especializadas em modelagem de dados, ORMs, migrações, transações ACID e padrões de persistência para aplicações modernas.
---

# Skill: Banco de Dados & Camada de Persistência

Esta skill orienta o Agente Kiro na concepção, escrita e manutenção da camada de persistência de dados da aplicação, assegurando integridade referencial, desacoplamento e consistência transacional.

---

## 1. Padrões de Projeto e Arquitetura

### 1.1 Repository Pattern & Inversão de Dependência
- A camada de aplicação/casos de uso deve interagir com o banco exclusivamente através de **interfaces de repositório**.
- Nenhuma consulta direta ao banco (SQL bruto ou chamadas diretas de ORM) deve vazar para dentro de serviços ou controladores.

```text
Caso de Uso  -->  [Interface IUserRepository]  <--  [Prisma/SQLAlchemy/TypeORM UserRepository]
```

### 1.2 Transações e Controle ACID
- Operações que alteram mais de uma tabela relacionada DEVEM ser executadas dentro de um bloco transacional (`begin`, `commit`, `rollback`).
- Use o padrão **Unit of Work** ou transações gerenciadas pelo ORM em operações compostas.

---

## 2. Estratégia de Migrações (Database Migrations)

1. **Nunca altere o banco manualmente em produção:** Todas as alterações no schema devem ser versionadas em arquivos de migração numerados e com timestamp.
2. **Migrações Reversíveis:** Sempre que possível, forneça a instrução de reversão (`down` / rollback) para a migração.
3. **Migrações Não-Destrutivas:**
   - Para renomear colunas: adicione a nova coluna, sincronize dados em background e remova a antiga em migração posterior.
   - Sempre forneça valores padrão (`DEFAULT`) para novas colunas `NOT NULL`.

---

## 3. Diretrizes de ORM e Consultas

- **Prevenção contra o problema N+1:** Utilize eager loading explícito (`include`, `join`, `select_related`) sempre que for recuperar listas de entidades com seus relacionamentos.
- **Paginação Obrigatória:** Qualquer endpoint ou consulta que liste registros deve implementar paginação (via cursor ou offset limitado). Nunca retorne consultas irrestritas (`SELECT * FROM table`).
- **Sanitização contra SQL Injection:** Nunca concatene strings de entrada do usuário diretamente em instruções SQL. Utilize queries parametrizadas fornecidas pelo ORM ou driver.

---

## 4. Checklist de Validação para o Agente Kiro

Ao trabalhar em tarefas que envolvam o banco de dados:
- [ ] O schema está em conformidade com a 3ª Forma Normal (3NF) ou justificado tecnicamente.
- [ ] Chaves estrangeiras (`FOREIGN KEY`) possuem regras explícitas de integridade (`ON DELETE RESTRICT` ou `CASCADE` avaliado).
- [ ] Existem migrações geradas e testadas para a alteração.
- [ ] As consultas possuem paginação e proteção contra N+1.
- [ ] Todas as operações críticas utilizam transações com rollback em caso de falha.
