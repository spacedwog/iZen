from fastapi import FastAPI
from fastapi.responses import FileResponse
from backend.gerar_audio import gerar_audio_relaxante
import os

app = FastAPI()

AUDIO_PATH = "relaxamento.mp3"

@app.get("/")
async def root():
    return {"message": "API iZen - Áudio relaxante"}

@app.get("/gerar-audio")
async def gerar_audio(frequencia: int = 432, duracao: int = 300):
    gerar_audio_relaxante(frequencia=frequencia, duracao=duracao, caminho_saida=AUDIO_PATH)
    return {"message": f"Áudio gerado com frequência {frequencia}Hz e duração {duracao}s"}

@app.get("/baixar-audio")
async def baixar_audio():
    if os.path.exists(AUDIO_PATH):
        return FileResponse(AUDIO_PATH, media_type="audio/mpeg", filename=AUDIO_PATH)
    return {"error": "Áudio não encontrado, gere primeiro"}