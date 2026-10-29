---
inclusion: always
---

# Boas Práticas de Programação com IA (Kiro IDE AI Guidelines)

Este documento estabelece as diretrizes de qualidade, segurança e previsibilidade para o trabalho conjunto entre desenvolvedores e Agentes de IA neste repositório.

---

## 1. Princípios de Engenharia com IA

### 1.1 Verificação Determinística vs Suposição
- **Nunca assuma que o código funciona:** Todo código gerado deve ser acompanhado por testes automatizados executáveis.
- **Evite alucinações de bibliotecas:** Utilize somente dependências consagradas, documentadas e compatíveis com a versão da linguagem definida.
- **Inspeção de contexto:** Antes de sugerir modificações em módulos existentes, inspecione a estrutura e o código atual para manter o estilo idiomático.

### 1.2 Passos Atômicos e Foco Único
- Resolva uma tarefa por vez do arquivo `tasks.md`.
- Evite refatorações massivas ou alterações em arquivos não relacionados à tarefa ativa ("scope creep").
- Commits atômicos: Cada tarefa concluída deve gerar um commit limpo e descritivo seguindo o padrão Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`).

### 1.3 Economia de Contexto e Modularidade
- Mantenha funções e módulos pequenos, com responsabilidade única (Single Responsibility Principle).
- Arquivos de código não devem exceder 250 a 300 linhas sempre que possível. Divida em submódulos coesos.
- Escreva código legível e autoexplicativo. Comentários devem explicar o **porquê**, não o óbvio **o quê**.

---

## 2. Padrões de Segurança e Integridade

### 2.1 Gestão Estrita de Segredos
- **Zero tolerância para credenciais no código:** Chaves de API, senhas de banco, tokens JWT e segredos NUNCA devem estar em arquivos commitados.
- Utilize variáveis de ambiente gerenciadas via arquivos `.env.example` e carregadas via bibliotecas de configuração validadas com schemas (ex: Zod, Pydantic, Dotenv).

### 2.2 Programação Defensiva e Validação de Entrada
- Todo ponto de entrada externo (HTTP, WebSocket, Mensageria, CLI) deve validar schemas rigorosamente antes de repassar dados para o domínio de negócio.
- Tratamento explícito de erros: Proibido silenciar exceções com blocos `catch` ou `except` vazios.
- Mensagens de erro de produção não devem expor stack traces sensíveis ou detalhes internos do banco de dados ao cliente final.

---

## 3. Comportamento Esperado do Agente Kiro

1. **Consulta prévia às Skills:** Ao atuar em áreas especializadas (Banco, Frontend, Testes, UI/UX, Segurança, DBA), o agente deve acionar e seguir as diretrizes da respectiva skill em `.kiro/skills/`.
2. **Respostas em Português:** Documentação, comentários de código e mensagens de commit devem seguir o idioma padrão do projeto (Português do Brasil), preservando os termos técnicos internacionais consagrados.
3. **Contratos Primeiro (Contract-First):** Antes de codificar controllers ou repositórios, defina tipos, interfaces e DTOs que representam o contrato dos dados.
