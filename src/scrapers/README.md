# 🐍 PATA RADAR - Módulo de Web Scraping em Python

Este diretório contém os robôs de coleta automatizada de dados para alimentar a plataforma **PATA RADAR**.

---

## 🎯 Objetivo dos Scrapers

1. **Rastreamento de Fontes:** Portais de adoção, grupos de resgate e redes sociais com relatos de animais perdidos/encontrados.
2. **Normalização de Dados:** Extração estruturada de raça, porte, pelagem, localização geográfica e fotos.
3. **Alimentação da Plataforma:** Envio para a API Next.js/Backend com deduplicação de imagens.

---

## 🚀 Como Executar Localmente

### 1. Criar ambiente virtual Python
```bash
cd src/scrapers
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
playwright install chromium # Se utilizar Playwright para páginas com SPA/JS
```

### 3. Rodar scraper de exemplo
```bash
python sample_scraper.py
```
