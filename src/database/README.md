# Camada de Persistência e Banco de Dados

Esta pasta gerencia as estruturas de dados e versões do banco:

- **`migrations/`**: Arquivos de migração versionados com data/timestamp e instruções reversíveis (up/down).
- **`seeds/`**: Scripts idempotentes para popular o banco de dados com dados iniciais ou massa de teste para os jurados e avaliadores.
- **`schemas/`**: Definições de modelos (ex: `schema.prisma`, arquivos SQL DDL, schemas TypeORM ou SQLAlchemy).
