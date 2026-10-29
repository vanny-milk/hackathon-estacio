# Estrutura de Testes Automatizados

A organização segue a pirâmide de testes:

- **`unit/`**: Testes unitários para lógica de domínio pura e casos de uso isolados. Execução ultrarrápida com mocks mínimos.
- **`integration/`**: Testes de comunicação entre camadas, endpoints de API e repositórios com banco de dados real ou em memória.
- **`e2e/`**: Testes ponta a ponta simulando as jornadas essenciais do usuário pela interface gráfica.
