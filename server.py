from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições do React Native

# Simula uma lista de áudios relaxantes
audio_data = [
    {"id": 1, "title": "Chuva Suave", "url": "https://example.com/audio/chuva.mp3"},
    {"id": 2, "title": "Floresta Zen", "url": "https://example.com/audio/floresta.mp3"},
    {"id": 3, "title": "Oceano Pacífico", "url": "https://example.com/audio/oceano.mp3"},
]

@app.route('/audios', methods=['GET'])
def get_audios():
    return jsonify(audio_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)