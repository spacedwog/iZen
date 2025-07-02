# gerar_audio.py
from pydub.generators import Sine
from pydub import AudioSegment

def gerar_audio_relaxante(frequencia=432, duracao=300):  # segundos
    audio = Sine(frequencia).to_audio_segment(duration=duracao * 1000)
    audio.export("relaxamento.wav", format="wav")

if __name__ == "__main__":
    gerar_audio_relaxante()