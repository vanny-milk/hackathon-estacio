---
name: dba
description: Diretrizes avançadas de Administração de Banco de Dados (DBA), modelagem relacional/não-relacional, indexação, otimização de queries e concorrência.
---

# Skill: DBA & Engenharia de Banco de Dados

Esta skill orienta o Agente Kiro na tomada de decisões avançadas de modelagem, performance de banco de dados, tuning de consultas e gestão de concorrência.

---

## 1. Estratégia de Indexação Inteligente

> **Regra de Ouro:** Índices aceleram leituras (`SELECT`), mas penalizam escritas (`INSERT`, `UPDATE`, `DELETE`) e consomem memória RAM. Crie índices cirúrgicos baseados nas consultas reais da aplicação.

### 1.1 Índices Obrigatórios
- **Chaves Primárias (`PRIMARY KEY`):** Criados automaticamente na maioria dos SGBDs (B-Tree).
- **Chaves Estrangeiras (`FOREIGN KEY`):** Crie índices explícitos em todas as colunas de FK para evitar scans completos em operações de `JOIN` e checagens de integridade referencial.
- **Campos de Busca Frequente e Filtros:** Colunas presentes frequentemente em cláusulas `WHERE`, `ORDER BY` ou `GROUP BY` (ex: `status`, `created_at`, `email`).

### 1.2 Índices Compostos e Parciais
- **Índices Compostos (Multi-column):** A ordem das colunas importa! A coluna de maior cardinalidade ou mais frequentemente filtrada deve vir primeiro (Regra do Prefixo Mais à Esquerda).
- **Índices Parciais (Filtered Indexes):** Indexe apenas subconjuntos relevantes. Exemplo: `CREATE INDEX idx_pedidos_pendentes ON pedidos(data_criacao) WHERE status = 'PENDENTE';`.

---

## 2. Diagnóstico e Análise de Planos de Execução (EXPLAIN ANALYZE)

Ao criar consultas complexas ou lentas, o Agente Kiro deve orientar a análise do plano de execução:

```sql
EXPLAIN (ANALYZE, BUFFERS) 
SELECT u.nome, COUNT(p.id) 
FROM usuarios u 
JOIN pedidos p ON p.usuario_id = u.id 
WHERE u.status = 'ATIVO' 
GROUP BY u.nome;
```

### Sinais de Alerta no Plano de Execução:
- **Seq Scan (Sequential Scan) em tabelas grandes:** Indica ausência de índice apropriado para o filtro `WHERE`.
- **Nested Loop com alto número de iterações:** Avalie a conversão para Hash Join ou criação de índice na coluna de junção.
- **Sort em disco (Disk / External Merge):** Aumente a memória de trabalho (`work_mem`) ou crie um índice que já forneça a ordenação necessária.

---

## 3. Gestão de Concorrência e Bloqueios (Locking)

1. **Deadlocks:** Previna impasses ordenando o acesso a múltiplos recursos sempre na mesma ordem determinística em todas as transações da aplicação.
2. **Locking Otimista vs Pessimista:**
   - **Locking Otimista (Recomendado):** Adicione uma coluna `version INT DEFAULT 1` na tabela. Ao atualizar: `UPDATE produtos SET estoque = estoque - 1, version = version + 1 WHERE id = 1 AND version = 1;`. Se nenhuma linha for afetada, ocorreu conflito concorrente; trate no código.
   - **Locking Pessimista:** Use `SELECT ... FOR UPDATE` apenas em fluxos críticos de baixíssima tolerância (ex: reserva imediata de assentos), mantendo a transação o mais curta possível.

---

## 4. Connection Pooling e Resiliência

- Configure pools de conexão adequadamente (ex: HikariCP, PgBouncer, connection pool nativo de ORMs).
- **Fórmula de dimensionamento aproximado de conexões:**  
  $$\text{Pool Size} = (\text{Core Count} \times 2) + \text{Effective Spindle Count}$$
- Defina timeouts rígidos: `connectionTimeout` (ex: 5s), `idleTimeout` (ex: 10m), `maxLifetime` (ex: 30m) para evitar conexões zumbis que travam o banco.

---

## 5. Checklist de Validação DBA para o Agente Kiro

- [ ] Todas as Foreign Keys possuem índice criado.
- [ ] Nenhum tipo genérico ineficiente utilizado (ex: use `VARCHAR(255)` ou `TEXT` com checagem, tipos específicos para datas `TIMESTAMPTZ`, `UUID` para identificadores universais).
- [ ] Queries que listam dados possuem limite (`LIMIT`) e offset ou cursor definidos.
- [ ] Seeds de teste populam o banco de forma determinística e idempotente.
- [ ] Tabelas transacionais críticas possuem estratégia contra condições de corrida (Race Conditions).
