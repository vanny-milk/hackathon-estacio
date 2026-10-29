# Camada Backend (Clean Architecture)

Esta pasta está organizada segundo os princípios da Clean Architecture / Portas e Adaptadores:

- **`domain/`**: Entidades puras, regras de negócio invariantes, exceções de domínio. Nenhuma dependência externa.
- **`application/`**: Casos de uso (Use Cases), DTOs (Data Transfer Objects), interfaces/portas para repositórios e serviços externos.
- **`infrastructure/`**: Adaptadores secundários concretos (implementações de repositório via ORM, clientes de API HTTP externa, drivers de cache).
- **`presentation/`**: Controladores HTTP/gRPC/CLI, rotas, middlewares de autenticação e validação de schemas de entrada.

### Como plugar sua stack:
- **Node.js / TypeScript**: Crie os arquivos `.ts` mantendo a separação de interfaces. Ex: `domain/User.ts`, `application/CreateUserUseCase.ts`, `presentation/UserController.ts`.
- **Python / FastAPI**: Mantenha pacotes com `__init__.py`. Ex: `domain/models.py`, `application/services.py`, `presentation/routes.py`.
- **Go**: Pacotes idiomáticos `package domain`, `package usecase`, `package handler`.
