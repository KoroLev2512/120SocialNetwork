from flask import Flask, request, jsonify
import logging
from tonclient.client import TonClient, DEVNET_BASE_URLS
from tonclient.types import ClientConfig

# Инициализация клиента TON
def init_client():
    return TonClient(config=ClientConfig(network=DEVNET_BASE_URLS))

# Инициализация Flask приложения
app = Flask(__name__)


# Логирование
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Обработка callback URL
@app.route('/callback', methods=['POST'])
def callback():
    data = request.json

    if 'address' in data and 'user_id' in data:
        wallet_address = data['address']
        user_id = data['user_id']

        message = f"Successfully connected your wallet. Your wallet address is {wallet_address}."

        print("User walle address ", wallet_address)

        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"error": "Invalid data"}), 400

#if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000)
