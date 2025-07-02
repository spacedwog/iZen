from pydub.generators import Sine
from pydub import AudioSegment

def gerar_audio_relaxante(frequencia=432, duracao=300, caminho_saida="relaxamento.mp3"):
    """
    Gera áudio relaxante com frequência e duração especificadas, salva em MP3.
    """
    audio = Sine(frequencia).to_audio_segment(duration=duracao * 1000)
    audio = audio - 5  # reduzir volume
    audio.export(caminho_saida, format="mp3")

if __name__ == "__main__":
    gerar_audio_relaxante()