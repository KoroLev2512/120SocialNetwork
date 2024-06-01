# connector.py

from pytonconnect import TonConnect
import tc_storage


def get_connector(chat_id: int):
    return TonConnect(tc_storage.MANIFEST_URL, storage=tc_storage.TcStorage(chat_id))
