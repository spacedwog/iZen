from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições do React Native

audio_data = [
    {"id": 1, "title": "Chuva Suave", "url": "http://example.com/audio/chuva.mp3"},
    {"id": 2, "title": "Floresta Zen", "url": "http://example.com/audio/floresta.mp3"},
    {"id": 3, "title": "Oceano Pacífico", "url": "http://example.com/audio/oceano.mp3"},
]

@app.route('/audios', methods=['GET', 'POST'])
def manage_audios():
    if request.method == 'POST':
        data = request.json
        if not data or 'title' not in data or 'url' not in data:
            return jsonify({"error": "Campos obrigatórios faltando"}), 400
        
        new_audio = {
            "id": len(audio_data) + 1,
            "title": data['title'],
            "url": data['url']
        }
        audio_data.append(new_audio)
        return jsonify(new_audio), 201

    return jsonify(audio_data)

if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)