# Requisitos: 003 - Regras de Negócio do PATA RADAR ("Encontre seu Pet")

- **ID do Spec:** `SPEC-003`
- **Status:** Proposta
- **Data de Criação:** 2026-10-29
- **Autor/Equipe:** PATA RADAR Team - Hackathon Estácio
- **Versão do App:** `v1.0.1`
- **Specs Relacionadas:** `SPEC-001` (Fundação), `SPEC-002` (Design System - cores já definidas)

---

## 1. Visão Geral e Contexto de Negócio

O **PATA RADAR** é um webapp *mobile-first* (PWA) que conecta cidadãos, tutores, abrigos e o poder público em torno do bem-estar animal. O produto resolve três dores principais:

1. **Abandono e maus-tratos sem canal simples de denúncia:** o cidadão vê um animal abandonado na rua e não sabe a quem recorrer.
2. **Pets perdidos sem visibilidade:** tutores dependem de posts dispersos em redes sociais para reencontrar seus animais.
3. **Falta de um mapa confiável de serviços pet:** endereços de abrigos/casas de adoção, veterinários (incluindo 24h), casas de ração/pet shops e Centros de Controle de Zoonoses (CCZ) estão espalhados e desatualizados.

Para alimentar o diretório de serviços, o sistema possui um **módulo de coleta de dados (scraping/ingestão)** em Python que agrega, normaliza, geocodifica e deduplica endereços de fontes públicas e permitidas.

### 1.1 Módulos Funcionais

| Código | Módulo | Descrição |
|---|---|---|
| `M1` | Denúncia de Abandono | Registrar animal abandonado/em situação de risco com foto e localização |
| `M2` | Encontre seu Pet | Publicar e buscar pets perdidos e encontrados, com match por proximidade |
| `M3` | Diretório & Mapa | Buscar abrigos/casas de adoção, veterinários, casas de ração/pet shops e CCZ próximos |
| `M4` | Acionar Zoonoses | Encaminhar ocorrência ao órgão de zoonoses do município com protocolo |
| `M5` | Coleta de Dados (Scraping) | Pipeline Python de ingestão de estabelecimentos |
| `M6` | Moderação & Confiança | Revisão de conteúdo, denúncias falsas, reputação |
| `M7` | Experiência Mobile (PWA) | Instalação, geolocalização, câmera, uso com rede instável |

---

## 2. Personas e Histórias de Usuário

| Persona | Descrição |
|---|---|
| **Cidadão Anônimo** | Visitante sem conta. Pode consultar mapa, buscar pets e iniciar denúncia |
| **Usuário Cadastrado** | Cidadão autenticado. Publica pets perdidos/encontrados, acompanha denúncias |
| **Tutor** | Usuário que perdeu seu animal |
| **Parceiro (ONG/Abrigo/Clínica)** | Estabelecimento que reivindicou o próprio perfil no diretório |
| **Moderador** | Membro da equipe que revisa conteúdo e valida dados coletados |
| **Órgão de Zoonoses (externo)** | CCZ/Vigilância Ambiental que recebe o encaminhamento (não opera o app no MVP) |

### Histórias

- **US-01:** Como cidadão, eu quero denunciar um animal abandonado em poucos toques, com foto e localização automática, para que ele receba ajuda rapidamente.
- **US-02:** Como tutor, eu quero publicar que meu pet está perdido e receber alertas de pets encontrados parecidos perto de mim, para aumentar a chance de reencontrá-lo.
- **US-03:** Como cidadão que encontrou um animal, eu quero registrar o achado para que o tutor possa localizá-lo.
- **US-04:** Como usuário, eu quero ver no mapa os abrigos, veterinários, casas de ração e CCZ mais próximos, filtrando por tipo e por "aberto agora", para decidir para onde ir.
- **US-05:** Como cidadão, eu quero acionar a zoonoses do meu município (animal agressivo, suspeita de raiva, animal morto em via pública, infestação), recebendo o canal oficial correto e um protocolo interno.
- **US-06:** Como moderador, eu quero revisar denúncias, posts e estabelecimentos coletados antes de ficarem públicos quando houver sinal de risco, para garantir confiabilidade.
- **US-07:** Como parceiro, eu quero reivindicar e corrigir os dados do meu estabelecimento, para que o público receba informações corretas.

---

## 3. Regras de Negócio (RN)

> As RNs abaixo são a fonte da verdade do domínio. Cada RN deve ter ao menos um teste unitário correspondente na camada `domain/` ou `application/`.

### 3.1 Regras Gerais e de Conta (RN-GER)

- **RN-GER-01:** Consulta de mapa, diretório e pets publicados é pública e não exige conta.
- **RN-GER-02:** Publicar pet perdido/encontrado, acompanhar denúncia e reivindicar estabelecimento exige conta verificada (e-mail ou telefone confirmado).
- **RN-GER-03:** Denúncia de abandono pode ser feita **anonimamente**. Nesse caso, o sistema não armazena nome, e-mail ou telefone do denunciante, e o acompanhamento é feito apenas por código de protocolo.
- **RN-GER-04:** Toda localização exibida publicamente de um usuário pessoa física (ex.: endereço do tutor) deve ser **ofuscada** para um raio aproximado de 300 m. A localização exata do *animal avistado* pode ser exibida.
- **RN-GER-05:** Contato entre usuários ocorre por canal mediado (botão de contato/WhatsApp com consentimento explícito). Telefone e e-mail nunca são exibidos sem opt-in do dono do anúncio.
- **RN-GER-06 (LGPD):** O usuário pode excluir sua conta e seus dados pessoais a qualquer momento. Denúncias já encaminhadas a órgãos públicos são mantidas de forma anonimizada.
- **RN-GER-07:** Fotos enviadas devem ter metadados EXIF removidos antes de serem armazenadas (evita vazamento de localização residencial).

### 3.2 Denúncia de Abandono / Animal em Risco (RN-DEN) — Módulo M1

- **RN-DEN-01:** Campos obrigatórios: **localização** (GPS ou ponto no mapa), **espécie** (cão, gato, outro) e **tipo de situação**. Foto é fortemente recomendada, mas opcional (o cidadão pode estar sem condição de fotografar).
- **RN-DEN-02:** Tipos de situação: `abandonado`, `ferido`, `maus_tratos`, `filhotes_desamparados`, `preso_ou_acorrentado`, `atropelado`, `outro`.
- **RN-DEN-03 (Prioridade):** A prioridade é calculada automaticamente:
  - `CRITICA`: `ferido`, `atropelado` ou `maus_tratos` em andamento.
  - `ALTA`: `filhotes_desamparados`, `preso_ou_acorrentado`.
  - `MEDIA`: `abandonado`, `outro`.
- **RN-DEN-04 (Maus-tratos em flagrante):** QUANDO o tipo for `maus_tratos` e o usuário indicar que está ocorrendo agora, o sistema deve exibir **antes do envio** a orientação para acionar a Polícia Militar (190) e informar que maus-tratos a animais é crime (Lei nº 9.605/1998, art. 32, com pena agravada para cães e gatos pela Lei nº 14.064/2020). O registro no app não substitui o acionamento policial.
- **RN-DEN-05 (Ciclo de vida):** Estados permitidos e transições válidas:
  `ABERTA → EM_ANALISE → ENCAMINHADA → RESOLVIDA` ; `ABERTA|EM_ANALISE → DESCARTADA` ; `ENCAMINHADA → REABERTA → EM_ANALISE`. Qualquer outra transição deve ser rejeitada pelo domínio.
- **RN-DEN-06 (Duplicidade):** SE houver denúncia ativa da mesma espécie e tipo a até **150 m** e criada nas últimas **24 h**, ENTÃO o sistema deve sugerir "apoiar denúncia existente" (incrementa contador de confirmações) em vez de criar nova. O usuário pode ignorar a sugestão.
- **RN-DEN-07 (Confirmações):** Cada confirmação de outro usuário aumenta a credibilidade da denúncia. Com **3 confirmações** distintas, a denúncia `MEDIA` sobe para `ALTA`.
- **RN-DEN-08 (Rate limit):** Máximo de **5 denúncias por hora** por dispositivo/IP e **20 por dia**. Excedido o limite, o sistema bloqueia temporariamente e registra o evento para moderação.
- **RN-DEN-09 (Encaminhamento sugerido):** Ao registrar, o sistema exibe os **3 abrigos/ONGs** e o **CCZ** mais próximos do ponto da denúncia (usa M3).
- **RN-DEN-10:** Denúncias `RESOLVIDA` ou `DESCARTADA` saem do mapa público após **7 dias**, permanecendo no histórico.
- **RN-DEN-11:** Endereço exato de denúncias de `maus_tratos` dentro de residência **não** é exibido publicamente; fica visível apenas para moderadores e no encaminhamento oficial.

### 3.3 Encontre seu Pet — Perdidos & Encontrados (RN-PET) — Módulo M2

- **RN-PET-01:** Tipos de anúncio: `PERDIDO` (publicado pelo tutor) e `ENCONTRADO` (publicado por quem achou/está abrigando o animal).
- **RN-PET-02:** Campos obrigatórios: tipo, espécie, **ao menos 1 foto**, porte (`pequeno`, `medio`, `grande`), cor predominante, data/hora aproximada e local (último visto / onde foi encontrado). Opcionais: nome, raça (ou SRD), sexo, sinais particulares, coleira, microchip.
- **RN-PET-03 (Limite):** Máximo de **5 fotos** por anúncio, até 5 MB cada, formatos JPEG/PNG/WebP.
- **RN-PET-04 (Validade):** Anúncios expiram em **30 dias**. O dono recebe lembrete 3 dias antes e pode renovar por mais 30 dias (até 3 renovações). Após expirar, o anúncio sai da busca, mas permanece no perfil do dono.
- **RN-PET-05 (Match automático):** QUANDO um anúncio é criado, o sistema busca anúncios do tipo oposto com: mesma espécie, mesmo porte, raio de **5 km** e janela de **±15 dias**. O score de compatibilidade considera: distância (40%), cor (30%), raça/SRD (15%), sexo (10%), proximidade de datas (5%). Matches com score ≥ **60** geram notificação para os dois anunciantes.
- **RN-PET-06 (Reencontro):** O dono pode marcar o anúncio como `REENCONTRADO` (perdido) ou `DEVOLVIDO` (encontrado). O anúncio é encerrado e exibido como "caso de sucesso" se o dono autorizar.
- **RN-PET-07 (Antifraude/golpe):** O sistema deve exibir aviso fixo: "Nunca pague para reaver seu pet". Anúncios ou mensagens com pedido de recompensa antecipada/PIX denunciados por usuários vão para moderação imediata.
- **RN-PET-08 (Microchip):** O número do microchip nunca é exibido publicamente; serve apenas como critério de match exato (match exato = score 100).
- **RN-PET-09:** Um usuário pode ter no máximo **10 anúncios ativos** simultaneamente (parceiros/ONGs verificados: sem limite).
- **RN-PET-10 (Encontrado sem lar temporário):** QUANDO um anúncio `ENCONTRADO` indicar que o animal não tem onde ficar, o sistema deve sugerir abrigos próximos (M3) e oferecer a conversão em denúncia (M1).

### 3.4 Diretório & Mapa de Serviços (RN-DIR) — Módulo M3

- **RN-DIR-01 (Categorias):** `ABRIGO_ADOCAO` (abrigos, ONGs e casas de adoção), `VETERINARIO`, `VETERINARIO_24H`, `CASA_RACAO_PETSHOP`, `CCZ_ZOONOSES`, `HOSPITAL_VET_PUBLICO`, `CASTRACAO_GRATUITA`. Um estabelecimento pode ter múltiplas categorias.
- **RN-DIR-02 (Busca):** A busca padrão usa a localização do usuário (com permissão) ou o centro da cidade escolhida, raio padrão de **5 km**, ajustável entre 1 e 50 km, ordenada por distância.
- **RN-DIR-03 (Filtros):** categoria, "aberto agora" (quando houver horário cadastrado), atendimento 24h, gratuito/popular, e "verificado".
- **RN-DIR-04 (Origem e confiança):** Todo estabelecimento possui `origem` (`SCRAPING`, `PARCEIRO`, `USUARIO`, `MODERADOR`) e `nivel_confianca`:
  - `VERIFICADO`: confirmado pelo próprio estabelecimento ou por moderador.
  - `COLETADO`: vindo de fonte pública, não confirmado.
  - `SUGERIDO`: indicado por usuário, aguardando revisão (não aparece publicamente até aprovação).
- **RN-DIR-05 (Atualidade):** Dados `COLETADO` não revalidados há mais de **90 dias** exibem selo "pode estar desatualizado". Acima de **180 dias** sem revalidação e sem confirmação, saem do mapa até nova coleta.
- **RN-DIR-06 (Correção colaborativa):** Qualquer usuário pode reportar "fechou", "endereço errado" ou "telefone errado". Com **3 reports** distintos do mesmo tipo, o registro é ocultado e enviado para moderação.
- **RN-DIR-07 (Reivindicação):** O responsável pelo estabelecimento pode reivindicar o perfil mediante comprovação (e-mail no domínio do site, CNPJ ou validação manual). Após aprovação, passa a `VERIFICADO` e pode editar dados; os campos editados pelo parceiro têm precedência sobre o scraping.
- **RN-DIR-08 (Rota):** Cada estabelecimento oferece ações "Traçar rota" (deep link para app de mapas do celular), "Ligar" e "WhatsApp" (quando disponível).

### 3.5 Acionar Zoonoses (RN-ZOO) — Módulo M4

- **RN-ZOO-01 (Situações de zoonoses):** `animal_agressivo`, `suspeita_raiva` (incluindo morcego caído/em local incomum), `animal_morto_via_publica`, `infestacao` (pombos, ratos, escorpiões, mosquito), `acumulador_animais`, `animal_peconhento`, `outro`.
- **RN-ZOO-02 (Roteamento por município):** O sistema identifica o município pela localização (geocodificação reversa) e retorna o **canal oficial** cadastrado na tabela `canais_oficiais` (telefone, site/formulário, e-mail, endereço do CCZ). Ex.: no Rio de Janeiro, a Central 1746. Os canais devem ser cadastrados e validados por moderador, com fonte e data de verificação.
- **RN-ZOO-03 (Sem canal cadastrado):** SE o município não tiver canal cadastrado, ENTÃO o sistema exibe o CCZ mais próximo do diretório (M3) e orienta procurar a Secretaria Municipal de Saúde/Vigilância em Saúde, registrando o município como "pendente de cadastro".
- **RN-ZOO-04 (Urgência sanitária):** QUANDO a situação for `suspeita_raiva` ou houver relato de **mordida/arranhão em pessoa**, o sistema deve exibir alerta destacado orientando: lavar o ferimento com água e sabão e procurar imediatamente uma unidade de saúde. O alerta é informativo e não constitui orientação médica.
- **RN-ZOO-05 (Protocolo interno):** Todo acionamento gera um **protocolo PATA RADAR** no formato `PR-AAAAMMDD-XXXXX` e um **resumo pronto para compartilhar** (texto com tipo, endereço, ponto de referência, data/hora e link das fotos) para o usuário colar no canal oficial ou enviar por WhatsApp/e-mail.
- **RN-ZOO-06 (Protocolo oficial):** O usuário pode informar o número de protocolo recebido do órgão oficial; a ocorrência passa para `ENCAMINHADA`.
- **RN-ZOO-07:** No MVP, o sistema **não envia** a ocorrência automaticamente ao órgão público (não há integração oficial). Qualquer envio automático futuro dependerá de convênio/API oficial.
- **RN-ZOO-08:** Uma denúncia M1 pode ser convertida em acionamento M4 (e vice-versa) preservando fotos, localização e histórico.

### 3.6 Coleta de Dados / Scraping (RN-SCR) — Módulo M5

- **RN-SCR-01 (Fontes permitidas):** Apenas fontes públicas cuja licença ou termos permitam coleta e reuso. Prioridade:
  1. **OpenStreetMap via Overpass API** (licença ODbL, exige atribuição): `amenity=veterinary`, `amenity=animal_shelter`, `shop=pet`, `amenity=animal_boarding`, `shop=agrarian` com tag de ração.
  2. **Portais de dados abertos e sites de prefeituras/governos** (lista de CCZ, castração gratuita, hospitais veterinários públicos).
  3. **Sites próprios de ONGs/abrigos** e diretórios públicos que não proíbam coleta em `robots.txt`/termos.
  4. **Cadastro manual** de parceiros e moderadores.
- **RN-SCR-02 (Fontes proibidas):** É proibido raspar Google Maps/Google Places, Instagram, Facebook, iFood ou qualquer serviço cujos termos de uso proíbam coleta automatizada. Para esses, só via API oficial com chave e respeitando os termos.
- **RN-SCR-03 (Boas práticas de coleta):** Respeitar `robots.txt`; identificar o User-Agent do PATA RADAR com contato; limite padrão de **1 requisição/segundo por domínio**; backoff exponencial em 429/5xx; cache de páginas já coletadas.
- **RN-SCR-04 (Geocodificação):** Endereços sem coordenada devem ser geocodificados. Ao usar Nominatim público, respeitar a política de uso (máx. 1 req/s, User-Agent identificado, cache obrigatório). Registros sem coordenada válida dentro do Brasil são rejeitados.
- **RN-SCR-05 (Normalização):** Telefones no formato E.164 (`+55DDNNNNNNNNN`); CEP com 8 dígitos; UF com 2 letras; nome em *Title Case* sem emojis; horário de funcionamento no formato OSM `opening_hours` quando possível.
- **RN-SCR-06 (Deduplicação):** Dois registros são o mesmo estabelecimento QUANDO: (a) mesmo telefone normalizado, OU (b) distância ≤ **50 m** E similaridade de nome ≥ **0,85** (Jaro-Winkler ou trigram). Na fusão, prevalece: `PARCEIRO` > `MODERADOR` > `SCRAPING (fonte mais recente)` > `USUARIO`.
- **RN-SCR-07 (Rastreabilidade):** Cada registro guarda `fonte`, `url_origem`, `licenca`, `coletado_em` e `hash_conteudo`. A interface exibe a atribuição exigida pela licença (ex.: "© colaboradores do OpenStreetMap").
- **RN-SCR-08 (Upsert idempotente):** Reexecutar o scraper com os mesmos dados não pode criar duplicatas; apenas atualiza `revalidado_em` e campos alterados (detectados via `hash_conteudo`).
- **RN-SCR-09 (Precedência de edição):** Campos editados por `PARCEIRO` ou `MODERADOR` nunca são sobrescritos por uma nova coleta; divergências geram item na fila de moderação.
- **RN-SCR-10 (Agendamento):** Coleta completa por cidade **semanal**; revalidação incremental **diária** dos registros mais antigos. Cada execução registra `scraper_runs` com status, total coletado, inseridos, atualizados, rejeitados e erros.
- **RN-SCR-11 (Falha):** SE uma fonte falhar em **3 execuções consecutivas**, ENTÃO o sistema marca a fonte como `DEGRADADA` e alerta os administradores, sem remover os dados já existentes.
- **RN-SCR-12 (Dados pessoais):** O scraper não coleta dados pessoais de pessoas físicas (ex.: CPF, telefone pessoal de voluntário). Apenas dados de estabelecimentos/organizações.
- **RN-SCR-13 (Escopo geográfico MVP):** Cidade-piloto **Rio de Janeiro/RJ** (região metropolitana), configurável por lista de municípios (código IBGE).

### 3.7 Moderação & Confiança (RN-MOD) — Módulo M6

- **RN-MOD-01:** Conteúdo publicado passa por filtro automático (palavrões, dados pessoais, links suspeitos). Conteúdo sinalizado vai para fila de moderação antes de ficar público.
- **RN-MOD-02:** Qualquer usuário pode denunciar um anúncio, denúncia ou estabelecimento. Com **3 denúncias** distintas, o item é ocultado até revisão.
- **RN-MOD-03:** Usuários com **2 conteúdos removidos** em 30 dias têm publicação suspensa por 7 dias; reincidência leva a bloqueio.
- **RN-MOD-04:** Toda ação de moderação registra autor, motivo e data (trilha de auditoria imutável).
- **RN-MOD-05:** Fotos com conteúdo gráfico (animal ferido) são exibidas com **desfoque e aviso** "conteúdo sensível", com toque para revelar.

### 3.8 Experiência Mobile / PWA (RN-MOB) — Módulo M7

- **RN-MOB-01:** Layout *mobile-first* a partir de 360 px de largura, com navegação inferior (bottom nav) de até 5 itens: **Início, Mapa, Denunciar (botão central de destaque), Pets, Perfil**.
- **RN-MOB-02:** Alvos de toque com no mínimo **44×44 px**; uso exclusivo dos tokens de cor da `SPEC-002` (ex.: Denunciar em `--color-alert`, sucesso/reencontro em `--color-secondary`, erro em `--color-danger`).
- **RN-MOB-03:** O app deve ser instalável (manifest + service worker) e permitir **rascunho offline** de denúncia: QUANDO não houver rede, a denúncia é salva localmente e enviada automaticamente ao reconectar.
- **RN-MOB-04:** A permissão de geolocalização é solicitada apenas no momento de uso (ao abrir Mapa ou Denunciar), com alternativa de escolher o ponto no mapa ou digitar endereço.
- **RN-MOB-05:** Upload de fotos usa a câmera do dispositivo (`capture`), com compressão no cliente para no máximo **1600 px** no maior lado antes do envio.
- **RN-MOB-06:** Fluxo de denúncia concluído em no máximo **3 telas** (Local → Situação/Foto → Confirmar).

---

## 4. Requisitos Estruturados (Sintaxe EARS)

1. **[REQ-01] Ubíquo:** O sistema deve permitir consulta pública ao mapa, ao diretório e aos anúncios ativos sem exigir autenticação. *(RN-GER-01)*
2. **[REQ-02] Baseado em Evento:** QUANDO o cidadão submeter uma denúncia com localização, espécie e tipo de situação válidos, o sistema deve persistir a denúncia com prioridade calculada e retornar um protocolo `PR-AAAAMMDD-XXXXX`. *(RN-DEN-01..03, RN-ZOO-05)*
3. **[REQ-03] Comportamento Indesejado:** SE existir denúncia ativa equivalente a até 150 m nas últimas 24 h, ENTÃO o sistema deve oferecer apoio à denúncia existente antes de criar uma nova. *(RN-DEN-06)*
4. **[REQ-04] Baseado em Evento:** QUANDO o tipo for `maus_tratos` em flagrante, o sistema deve exibir a orientação de acionar o 190 antes de concluir o envio. *(RN-DEN-04)*
5. **[REQ-05] Ubíquo:** O domínio deve rejeitar qualquer transição de status de denúncia não prevista no ciclo de vida. *(RN-DEN-05)*
6. **[REQ-06] Baseado em Evento:** QUANDO um anúncio PERDIDO ou ENCONTRADO for publicado, o sistema deve calcular matches com anúncios opostos e notificar os anunciantes para score ≥ 60. *(RN-PET-05)*
7. **[REQ-07] Baseado em Estado:** ENQUANTO um anúncio estiver ativo há mais de 30 dias sem renovação, o sistema deve removê-lo da busca pública. *(RN-PET-04)*
8. **[REQ-08] Baseado em Evento:** QUANDO o usuário buscar serviços, o sistema deve retornar estabelecimentos da(s) categoria(s) filtrada(s) dentro do raio, ordenados por distância, com paginação. *(RN-DIR-02, RN-DIR-03)*
9. **[REQ-09] Baseado em Evento:** QUANDO o usuário acionar zoonoses, o sistema deve identificar o município e exibir o canal oficial cadastrado e um resumo compartilhável. *(RN-ZOO-02, RN-ZOO-05)*
10. **[REQ-10] Comportamento Indesejado:** SE não houver canal oficial para o município, ENTÃO o sistema deve exibir o CCZ mais próximo e registrar o município como pendente. *(RN-ZOO-03)*
11. **[REQ-11] Baseado em Evento:** QUANDO a situação for `suspeita_raiva` ou houver mordida em pessoa, o sistema deve exibir o alerta de saúde destacado. *(RN-ZOO-04)*
12. **[REQ-12] Ubíquo:** O pipeline de scraping deve coletar apenas de fontes permitidas, respeitando `robots.txt`, rate limit de 1 req/s por domínio e atribuição de licença. *(RN-SCR-01..03, RN-SCR-07)*
13. **[REQ-13] Ubíquo:** O pipeline deve normalizar, geocodificar e deduplicar registros, sendo idempotente em reexecuções. *(RN-SCR-04..06, RN-SCR-08)*
14. **[REQ-14] Comportamento Indesejado:** SE uma fonte falhar 3 vezes consecutivas, ENTÃO o sistema deve marcá-la como `DEGRADADA` e preservar os dados existentes. *(RN-SCR-11)*
15. **[REQ-15] Baseado em Estado:** ENQUANTO o dispositivo estiver offline, o sistema deve manter rascunhos de denúncia localmente e sincronizar ao reconectar. *(RN-MOB-03)*
16. **[REQ-16] Ubíquo:** O sistema deve remover EXIF das fotos e ofuscar a localização de pessoas físicas em 300 m. *(RN-GER-04, RN-GER-07)*
17. **[REQ-17] Comportamento Indesejado:** SE um item receber 3 reports/denúncias distintos, ENTÃO o sistema deve ocultá-lo e enviá-lo à moderação. *(RN-DIR-06, RN-MOD-02)*
18. **[REQ-18] Comportamento Indesejado:** SE o limite de 5 denúncias/hora ou 20/dia for excedido, ENTÃO o sistema deve bloquear novos envios temporariamente com HTTP 429. *(RN-DEN-08)*

---

## 5. Critérios de Aceite Verificáveis

- [ ] **AC-01:** Denúncia anônima com local + espécie + tipo é criada e retorna protocolo no formato `PR-\d{8}-[A-Z0-9]{5}`, sem armazenar dados pessoais.
- [ ] **AC-02:** Denúncia `ferido` recebe prioridade `CRITICA`; `abandonado` com 3 confirmações distintas passa a `ALTA`.
- [ ] **AC-03:** Tentativa de transição `ABERTA → RESOLVIDA` é rejeitada com erro de domínio `InvalidStatusTransition`.
- [ ] **AC-04:** Nova denúncia a 100 m de outra igual criada há 2 h dispara sugestão de apoio; a 200 m não dispara.
- [ ] **AC-05:** Anúncio PERDIDO (cão, médio, caramelo) a 2 km de anúncio ENCONTRADO equivalente com 3 dias de diferença gera match com score ≥ 60 e notificação para ambos.
- [ ] **AC-06:** Anúncio com 31 dias sem renovação não aparece em `GET /api/v1/pets`.
- [ ] **AC-07:** Busca por `VETERINARIO_24H` num raio de 5 km retorna somente resultados dessa categoria, ordenados por distância crescente, paginados (máx. 50 por página).
- [ ] **AC-08:** Acionamento de zoonoses com coordenada no Rio de Janeiro retorna o canal oficial cadastrado; em município sem cadastro retorna o CCZ mais próximo e grava pendência.
- [ ] **AC-09:** Executar o scraper OSM duas vezes seguidas para a mesma cidade não altera a contagem total de estabelecimentos.
- [ ] **AC-10:** Dois registros com mesmo telefone (formatos diferentes) são fundidos em um.
- [ ] **AC-11:** O scraper não faz mais de 1 requisição/segundo por domínio (verificado por teste com relógio simulado) e aborta coleta em URLs bloqueadas por `robots.txt`.
- [ ] **AC-12:** Fotos armazenadas não contêm metadados EXIF de GPS.
- [ ] **AC-13:** Em modo offline, uma denúncia salva como rascunho é enviada automaticamente ao reconectar, sem duplicar (chave de idempotência).
- [ ] **AC-14:** Fluxo de denúncia completo em até 3 telas em viewport de 360×640, com alvos de toque ≥ 44 px e contraste WCAG 2.1 AA.
- [ ] **AC-15:** A atribuição "© colaboradores do OpenStreetMap" aparece no mapa e nos detalhes de estabelecimentos de origem OSM.

---

## 6. Fora de Escopo (MVP Hackathon)

- Integração automática com sistemas de prefeituras/CCZ (envio direto de ocorrências).
- Reconhecimento facial/visual de pets por IA (match por imagem). Planejado para v2.
- Chat interno em tempo real (no MVP, contato por WhatsApp com consentimento).
- Fluxo completo de adoção (formulário, entrevista, termo de responsabilidade) dentro do app; no MVP o app direciona para o abrigo.
- Pagamentos, doações e campanhas de arrecadação.
- App nativo (iOS/Android); o MVP é webapp PWA.
- Cobertura nacional; o MVP cobre a cidade-piloto configurada.

---

## 7. Premissas e Pontos a Validar com o Time

- Os canais oficiais de zoonoses por município precisam ser levantados e validados manualmente (fonte + data) antes da demo.
- A cobertura do OpenStreetMap para pet shops e abrigos no Rio pode ser incompleta; o cadastro manual de parceiros complementa a base.
- Os percentuais do score de match (RN-PET-05) são iniciais e devem ser calibrados com dados reais.
