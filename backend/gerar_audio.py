from pydub.generators import Sine
from pydub import AudioSegment
import os

def gerar_audio_relaxante(frequencia=432, duracao=300, caminho_saida="./assets/sounds/natureza1.mp3"):
    """
    Gera um áudio relaxante com frequência especificada (default 432Hz) e duração em segundos.
    Salva como MP3.
    """
    print(f"Gerando áudio relaxante: {frequencia}Hz por {duracao}s...")
    try:
        audio = Sine(frequencia).to_audio_segment(duration=duracao * 1000)
        audio = audio - 5  # reduz volume um pouco
        audio.export(caminho_saida, format="mp3")
        print(f"Áudio gerado com sucesso: {caminho_saida}")
    except Exception as e:
        print(f"Erro ao gerar áudio: {e}")

if __name__ == "__main__":
    gerar_audio_relaxante()