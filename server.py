from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dados_meditacao = {}  # Simula um "banco" em memória

@app.route('/meditacao', methods=['GET'])
def listar_meditacao():
    # Retorna dados no formato dia -> minutos
    resposta = [
        {"dia": k[-2:], "minutos": round(v / 60)}  # exibe apenas dia e minutos
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

if __name__ == '__main__':
    app.run(debug=True)