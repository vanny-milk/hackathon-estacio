---
name: seguranca
description: Diretrizes de Segurança da Informação, OWASP Top 10, Autenticação, Autorização (RBAC), proteção de segredos e conformidade com LGPD.
---

# Skill: Segurança da Informação & DevSecOps

Esta skill orienta o Agente Kiro na implementação de defesas ativas contra vulnerabilidades comuns, garantindo a proteção de dados sensíveis e a integridade da aplicação.

---

## 1. Mitigação das Principais Vulnerabilidades (OWASP Top 10)

### 1.1 Injeção (SQL, NoSQL, Command Injection)
- **Regra:** Nunca utilize interpolação de strings em consultas a banco ou chamadas de sistema.
- **Defesa:** Consultas estritamente parametrizadas, uso de ORM seguro e sanitização rigorosa de entradas de terminal.

### 1.2 Broken Authentication & Gestão de Sessões
- **Senhas:** Armazenamento obrigatório com algoritmos de hash com sal computacionalmente caros (**Argon2id** ou **bcrypt** com custo ≥ 12). Proibido uso de MD5 ou SHA-1/256 para senhas.
- **Tokens JWT:**
  - Armazene tokens de autenticação preferencialmente em cookies `HttpOnly`, `Secure` e `SameSite=Lax/Strict` para mitigar ataques XSS.
  - Implemente tempo de expiração curto para access tokens (ex: 15 a 60 min) e rotação segura de refresh tokens.

### 1.3 Cross-Site Scripting (XSS) e CSRF
- **XSS:** Sempre escape conteúdo dinâmico inserido no DOM. Nunca utilize `dangerouslySetInnerHTML` ou `v-html` com dados não sanitizados (use DOMPurify se estritamente necessário).
- **Cabeçalhos de Segurança (Security Headers):** Configure middlewares de segurança (ex: Helmet) aplicando:
  - `Content-Security-Policy (CSP)`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Strict-Transport-Security (HSTS)`

### 1.4 Broken Object Level Authorization (BOLA / IDOR)
- **Validação de Propriedade:** Em cada requisição que acesse um recurso por ID (`/api/pedidos/{id}`), valide se o recurso pertence ao usuário autenticado ou se ele possui permissão de leitura explícita.
- Nunca confie no ID enviado pelo cliente sem validação no contexto do token da sessão.

---

## 2. Rate Limiting e Prevenção de Abuso

- Endpoints sensíveis (Login, Esqueci minha senha, Envio de SMS/E-mail, Cadastro) devem possuir **Rate Limiting** (ex: máximo de 5 tentativas por minuto por IP/usuário) para impedir ataques de força bruta.
- Limite o tamanho máximo de payloads no servidor (ex: 1MB para JSON comum) para prevenir ataques de negação de serviço (DoS).

---

## 3. Gestão Segura de Configurações e Segredos

1. **Arquivos `.env`:** O arquivo `.env` com valores reais NUNCA deve ser comitado no Git. Mantenha apenas o `.env.example` versionado com descrições das variáveis e valores fictícios.
2. **Auditoria de Dependências:** Execute scanners de vulnerabilidade nas dependências (ex: `npm audit`, `pip-audit`, `trivy` ou GitHub Dependabot).

---

## 4. Checklist de Segurança para o Agente Kiro

- [ ] Senhas com hash Argon2id ou bcrypt; nenhuma senha ou chave em texto plano.
- [ ] Validação de autorização em nível de objeto (IDOR/BOLA mitigado).
- [ ] Cookies protegidos com flags `HttpOnly`, `Secure` e `SameSite`.
- [ ] Rate limiting ativo em rotas públicas críticas de autenticação.
- [ ] Nenhum dado sensível (PII, senhas, tokens) trafegando em logs de produção.
