# Plano de Execução: 003 - Regras de Negócio do PATA RADAR

- **ID do Spec:** `SPEC-003`
- **Spec Relacionada:** `requirements.md`, `design.md`
- **Status:** Proposta / Em Planejamento

---

## Módulo 1: Denúncia de Abandono & Resgate (M1)
- [ ] **Task 1.1:** Criar entidades de domínio `AbandonmentReport` e value objects (GeoLocation, UrgencyLevel).
- [ ] **Task 1.2:** Implementar casos de uso `CreateReportUseCase` e `SupportReportUseCase`.
- [ ] **Task 1.3:** Criar endpoints REST `POST /api/v1/reports` e `GET /api/v1/reports`.
- [ ] **Task 1.4:** Desenvolver tela mobile-first de registro de denúncia com upload e geolocalização.

## Módulo 2: Encontre seu Pet (M2)
- [ ] **Task 2.1:** Implementar entidades `PetListing` (perdido/encontrado) e algoritmo de match geográfico.
- [ ] **Task 2.2:** Implementar endpoints `/api/v1/pets` e busca por raio.
- [ ] **Task 2.3:** Criar interface de busca e cadastro de pet com filtros de cor, espécie e porte.

## Módulo 3: Diretório & Mapa de Serviços (M3)
- [ ] **Task 3.1:** Implementar entidades `Place` (abrigos, clínicas 24h, pet shops, CCZ).
- [ ] **Task 3.2:** Desenvolver componente de mapa interativo com marcadores customizados na paleta PATA RADAR.

## Módulo 4: Acionar Zoonoses (M4)
- [ ] **Task 4.1:** Implementar integração com órgãos municipais de zoonoses e geração de protocolo único.

## Módulo 5: Pipeline de Web Scraping Python (M5)
- [ ] **Task 5.1:** Implementar coletores Python para estabelecimentos pet e abrigos com Pydantic.
- [ ] **Task 5.2:** Integrar endpoint interno de ingestão autenticada `POST /api/v1/internal/ingest`.
