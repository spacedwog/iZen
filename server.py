from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições do React Native

audio_data = [
    {"id": 1, "title": "Koto No Ha", "url": "https://www.letras.mus.br/kokia/koto-no-ha/"},
    {"id": 2, "title": "Nandemonaiya", "url": "https://www.letras.mus.br/radwimps/nandemonaiya/"},
    {"id": 3, "title": "Sparkle", "url": "https://www.letras.mus.br/radwimps/sparkle/"},
]

@app.route('/meditacao')
def meditacao():
    dados = [
        {"dia": "Seg", "minutos": 15},
        {"dia": "Ter", "minutos": 20},
        {"dia": "Qua", "minutos": 10},
        {"dia": "Qui", "minutos": 25},
        {"dia": "Sex", "minutos": 5},
        {"dia": "Sab", "minutos": 30},
        {"dia": "Dom", "minutos": 0},
    ]
    return jsonify(dados)

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