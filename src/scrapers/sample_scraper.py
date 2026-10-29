"""
PATA RADAR - Scraper Base de Demonstração
Coletor exemplo com Pydantic para validação de dados extraídos.
"""

from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class ScrapedPetRecord(BaseModel):
    title: str = Field(..., description="Título ou chamada do post")
    species: str = Field("dog", description="Espécie: dog, cat, other")
    breed: Optional[str] = Field(None, description="Raça detectada ou SRD")
    status: str = Field("lost", description="Status: lost (perdido), found (encontrado), rescued (resgatado)")
    location_city: str = Field(..., description="Cidade do relato")
    location_state: str = Field(..., description="UF")
    neighborhood: Optional[str] = Field(None, description="Bairro")
    image_url: Optional[str] = Field(None, description="URL da foto original")
    source_url: str = Field(..., description="Link da postagem original")
    scraped_at: datetime = Field(default_factory=datetime.utcnow)

def main():
    print("🐾 [PATA RADAR] Inicializando scraper de exemplo...")
    record = ScrapedPetRecord(
        title="Cachorro caramelo dócil encontrado próximo à Estácio",
        species="dog",
        breed="SRD (Vira-lata Caramelo)",
        status="found",
        location_city="Rio de Janeiro",
        location_state="RJ",
        neighborhood="Centro",
        image_url="https://images.unsplash.com/photo-1543466835-00a7907e9de1",
        source_url="https://radar.example.org/pet/123"
    )
    print("✅ Registro coletado e validado com sucesso:")
    print(record.model_dump_json(indent=2))

if __name__ == "__main__":
    main()
