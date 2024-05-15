from pytonconnect.storage import IStorage, DefaultStorage

from pytonconnect import TonConnect

import config

storage = {}
MANIFEST_URL='https://raw.githubusercontent.com/XaBbl4/pytonconnect/main/pytonconnect-manifest.json'

class TcStorage(IStorage):

    def __init__(self, chat_id: int):
        self.chat_id = chat_id

    def _get_key(self, key: str):
        return str(self.chat_id) + key

    async def set_item(self, key: str, value: str):
        storage[self._get_key(key)] = value

    async def get_item(self, key: str, default_value: str = None):
        return storage.get(self._get_key(key), default_value)

    async def remove_item(self, key: str):
        storage.pop(self._get_key(key))

def get_connector(chat_id: int):
    return TonConnect(MANIFEST_URL, storage=TcStorage(chat_id))