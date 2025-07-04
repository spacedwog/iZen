from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -------------------- "Bancos" em memória --------------------
dados_meditacao = {}  # chave: "YYYY-MM-DD", valor: total em segundos

audio_data = [
    {"id": 1, "title": "Chuva Suave", "url": "https://example.com/audio/chuva.mp3"},
    {"id": 2, "title": "Floresta Zen", "url": "https://example.com/audio/floresta.mp3"},
    {"id": 3, "title": "Oceano Pacífico", "url": "https://example.com/audio/oceano.mp3"},
]

# -------------------- ROTAS DE MEDITAÇÃO --------------------

@app.route('/meditacao', methods=['GET'])
def listar_meditacao():
    resposta = [
        {"dia": k[-2:], "minutos": round(v / 60)}
        for k, v in sorted(dados_meditacao.items())
    ]
    return jsonify(resposta)

@app.route('/meditacao', methods=['POST'])
def receber_meditacao():
    data = request.get_json()
    for entrada in data:
        dia = entrada['date']
        segundos = entrada['seconds']
        if dia in dados_meditacao:
            dados_meditacao[dia] += segundos
        else:
            dados_meditacao[dia] = segundos
    return jsonify({"status": "ok", "totalDias": len(dados_meditacao)})

# -------------------- ROTAS DE ÁUDIOS --------------------

@app.route('/audios', methods=['GET', 'POST'])
def gerenciar_audios():
    if request.method == 'GET':
        return jsonify(audio_data)

    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'title' not in data or 'url' not in data:
            return jsonify({"error": "Campos obrigatórios: 'title' e 'url'"}), 400

        novo_audio = {
            "id": len(audio_data) + 1,
            "title": data['title'],
            "url": data['url']
        }
        audio_data.append(novo_audio)
        return jsonify(novo_audio), 201

# -------------------- EXECUÇÃO --------------------

if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)