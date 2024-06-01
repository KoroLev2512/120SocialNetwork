import json
import os
import random
import sqlite3
import sys
import threading
from datetime import datetime
from io import BytesIO
from pytoniq_core import Address
import qrcode as qrcode
from pytonconnect import TonConnect
from telebot.async_telebot import AsyncTeleBot
from telebot.asyncio_handler_backends import State, StatesGroup
from telebot.asyncio_storage import StateMemoryStorage
from telebot import types, asyncio_filters
import logging
import urllib.request
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
from connector import get_connector
import asyncio
import SQLiteUtils
from dotenv import load_dotenv
import pandas as pd


logger = logging.getLogger(__file__)

load_dotenv('boot.env')
API_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
bot = AsyncTeleBot(API_TOKEN, state_storage=StateMemoryStorage())
db = SQLiteUtils.Database('userdata.db')
db.create_tables()

kb = types.InlineKeyboardMarkup(row_width=1)
btn1 = types.InlineKeyboardButton(text='Регистрация', callback_data='register')
btn2 = types.InlineKeyboardButton(text='Наш канал', url='https://t.me/block_120')
btn3 = types.InlineKeyboardButton(text='Ton street boys', url='https://t.me/tonstreetboys')
btn4 = types.InlineKeyboardButton(text='Школа скейтбординга', url='https://t.me/skateshop041')
kb.add(btn3)
kb.add(btn4)
kb.add(btn2)
kb.add(btn1)

g_keys = types.InlineKeyboardMarkup(row_width=1)
grp1 = types.InlineKeyboardButton(text='Зритель', callback_data='grp_1')
grp2 = types.InlineKeyboardButton(text='Скейтер', callback_data='grp_2')
grp3 = types.InlineKeyboardButton(text='Самокатер/BMX', callback_data='grp_3')
g_keys.add(grp1)
g_keys.add(grp2)
g_keys.add(grp3)

menu = types.ReplyKeyboardMarkup(row_width=2)
button1 = types.KeyboardButton(text="Твой баланс 💵")
button2 = types.KeyboardButton(text="Рейтинг 📈")
button3 = types.KeyboardButton(text="Подключи кошелек и получи NFT🖼️")
button4 = types.KeyboardButton(text="Что такое 120 BLOCK ?")
menu.add(button1, button2, button3, button4)

wallets = types.InlineKeyboardMarkup(row_width=1)


master = "BjfilqzRkMTh"

users = {}

whitelist = []
CHANNEL_ID_1 = '@block_120'
CHANNEL_ID_2 = '@tonstreetboys'
CHANNEL_ID_3 = '@skateshop041'


def create_users_table():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            telegram_id INTEGER,
            wallet TEXT,
            username TEXT,
            time_registration TIMESTAMP,
            coins INTEGER,
            usergroup TEXT,
            about TEXT,
            number TEXT
        )
    ''')
    conn.commit()
    conn.close()

def update_wallet(telegram_id, new_wallet):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        sql_update_query = """UPDATE users SET wallet = ? WHERE telegram_id = ?"""

        cursor.execute(sql_update_query, (new_wallet, telegram_id))

        conn.commit()

        conn.close()

    except sqlite3.Error as error:
        print(f"Ошибка при работе с SQLite: {error}")


def delete_user_by_id(user_id):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))

        conn.commit()

        cursor.close()
        conn.close()

        print(f"User with id {user_id} has been deleted successfully.")
    except sqlite3.Error as error:
        print(f"Error while deleting user: {error}")
def get_user_by_telegram_id(telegram_id, db_name='database.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT telegram_id, wallet, username, time_registration, coins, usergroup, about, number
        FROM users WHERE telegram_id = ?
    ''', (telegram_id,))

    row = cursor.fetchone()
    conn.close()

    if row:
        user = User(
            telegram_id=row[0],
            wallet=row[1],
            username=row[2],
            time_registration="01.01.01",
            coins=row[4],
            usergroup=row[5],
            about=row[6],
            number=row[7]
        )
        return user
    else:
        return None
create_users_table()

def add_user_to_db(user):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO users (telegram_id, wallet, username, time_registration, coins, usergroup, about, number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user.telegram_id, user.wallet, user.username, user.time_registration, user.coins, user.usergroup, user.about, user.number))
    conn.commit()
    conn.close()


def user_exists(telegram_id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 1 FROM users WHERE telegram_id = ?
    ''', (telegram_id,))

    user = cursor.fetchone()
    conn.close()

    return user is not None
def user_exists_by_num(num):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute('''
        SELECT 1 FROM users WHERE id = ?
    ''', (num,))

    user = cursor.fetchone()
    conn.close()

    return user is not None

def get_all_users_sorted_by_coins(db_name='database.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT telegram_id, username, coins
        FROM users
        ORDER BY coins DESC
    ''')

    users = cursor.fetchall()
    conn.close()

    return users


def get_top_10_and_user_rank(telegram_id, db_name='database.db'):
    users = get_all_users_sorted_by_coins(db_name)

    top_10 = users[:10]

    user_rank = None
    for rank, (db_telegram_id, username, coins) in enumerate(users, start=1):
        if db_telegram_id == telegram_id:
            user_rank = (rank, username, coins)
            break

    rating_string = "Рейтинг:\n"
    for i, (db_telegram_id, username, coins) in enumerate(top_10, start=1):
        rating_string += f"{i}. {username} - {coins} block\n"

    if user_rank:
        rating_string += f"\nТвое место в рейтинге - {user_rank[0]} ({user_rank[2]} block)"
    else:
        rating_string += "\nПользователь не найден в рейтинге."

    return rating_string

def add_user_to_json(telegram_id, json_file='users.json'):
    if not os.path.exists(json_file):
        with open(json_file, 'w') as file:
            json.dump([], file)

    with open(json_file, 'r') as file:
        data = json.load(file)

    if telegram_id not in data:
        data.append(telegram_id)

    with open(json_file, 'w') as file:
        json.dump(data, file)


def get_telegram_ids_from_json(json_file='users.json'):
    if not os.path.exists(json_file):
        return []

    with open(json_file, 'r') as file:
        data = json.load(file)

    return data

def isAdmin(telegram_id):
    if telegram_id not in get_telegram_ids_from_json():
        return False
    else:
        return True

@bot.message_handler(commands=['super'])
async def root_filler(message):
    string = message.text.split(" ")
    if len(string) < 1:
        return
    if string[1] == master:
        add_user_to_json(message.from_user.id)
        await bot.send_message(message.chat.id, text="Вы успешно добавлены, как администратор")
    else:
        await bot.send_message(message.chat.id, text="Что-то пошло не так")

@bot.message_handler(commands=['clearediteddatabase'])
async def root_filler(message):
    if isAdmin(message.from_user.id):
        clear_database("database.db")
        await bot.send_message(message.chat.id, text="База очищена")

async def is_user_subscribed(user_id):
    try:
        chat_member1 = await bot.get_chat_member(CHANNEL_ID_1, user_id)

        chat_member2 = await bot.get_chat_member(CHANNEL_ID_2, user_id)

        chat_member3 = await bot.get_chat_member(CHANNEL_ID_3, user_id)
        if chat_member1.status in ['member', 'administrator', 'creator'] \
                and chat_member2.status in ['member', 'administrator', 'creator']\
                and chat_member3.status in ['member', 'administrator', 'creator']:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

class Stages(StatesGroup):
    register = State()
    group = State()
    start = State()
    about = State()
    wallet = State()
    connected = State()

    add_id = State()
    add_coins = State()

class User:
    def __init__(self, telegram_id=None, wallet=None, username=None, time_registration=None,
                 coins=None, usergroup=None, about=None, number=None):
        self.telegram_id = telegram_id
        self.wallet = wallet
        self.username = username
        self.time_registration = time_registration
        self.coins = coins
        self.usergroup = usergroup
        self.about = about
        self.number = number

    def set_about(self, about):
        self.about = about

    def set_number(self,number):
        self.number = number

    def set_usergroup(self, usergroup):
        self.usergroup = usergroup

    def set_telegram_id(self, telegram_id):
        self.telegram_id = telegram_id

    def set_wallet(self, wallet):
        self.wallet = wallet

    def set_username(self, username):
        self.username = username

    def set_time_registration(self, time_registration):
        self.time_registration = time_registration

    def set_coins(self, coins):
        self.coins = coins

async def setAsyncStageFromUserMessage(message, stages, text: str, uid = 0):
    if uid == 0:
        await bot.set_state(message.from_user.id, stages, message.chat.id)
        await bot.send_message(message.chat.id, text=text)
    else:
        await bot.set_state(uid, stages, message.chat.id)
        await bot.send_message(message.chat.id, text=text)
async def setAsyncStageFromUserMessageKeyboard(message, stages, text: str, keyboard, uid = 0):
    if uid == 0:

        await bot.set_state(message.from_user.id, stages, message.chat.id)
        await bot.send_message(message.chat.id, text=text, reply_markup=keyboard)
    else:
        await bot.set_state(uid, stages, message.chat.id)
        await bot.send_message(message.chat.id, text=text)
async def setAsyncStageFromUserAnswer(chatid, stages, text: str, uid = 0):
        await bot.set_state(uid, stages, chatid)
        await bot.send_message(chatid, text=text)
async def getAsyncData(message, key: str):
    async with bot.retrieve_data(message.from_user.id, message.chat.id) as data:
        result = data[key]
    return result
async def setAsyncData(message, key: str):
    async with bot.retrieve_data(message.from_user.id, message.chat.id) as data:
        data[key] = message.text
#Установка асинк данных
async def changeDataValue(message, key: str, elements):
    async with bot.retrieve_data(message.from_user.id, message.chat.id) as data:
        data[key] = elements
async def beginner(message):
    await setAsyncStageFromUserMessageKeyboard(
        message=message,
        stages=Stages.register,
        text="Йооооо! Тебя приветствует команда 120 Блока, мы собираем вокруг себя огромное сообщество безбашенных людей. Совсем скоро мы выпустим приложение в телеге, где ты сможешь заработать наши токены🫶\n\n"
        "Мы решили собраться со своими bros и организовать наш первый скейт-контест! Даже если ты не катаешь, ты сможешь получить свою награду💎\n\n"
        "Но перед знакомством и регистрацией надо подписаться на наших партнеров👇\n\n",
        keyboard=kb)

@bot.message_handler(commands=['start'])
async def send_welcome(message):
    userId = message.from_user.id
    if user_exists(userId):
        await bot.send_message(message.chat.id, text="Йооооо! Тебя приветствует команда 120 Блока, мы собираем вокруг себя огромное сообщество безбашенных людей. Совсем скоро мы выпустим приложение в телеге, где ты сможешь заработать наши токены🫶\n\n"
        "Мы решили собраться со своими bros и организовать наш первый скейт-контест! Даже если ты не катаешь, ты сможешь получить свою награду💎\n\n"
        "Но перед знакомством и регистрацией надо подписаться на наших партнеров👇\n\n")
        return
    await beginner(message=message)


def clear_database(db_name='database.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    # Получаем список всех таблиц в базе данных
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    # Очищаем каждую таблицу
    for table in tables:
        cursor.execute(f"DELETE FROM {table[0]};")

    conn.commit()
    conn.close()

    # Освобождаем неиспользуемое пространство вне транзакции
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("VACUUM;")
    conn.close()
@bot.callback_query_handler(state=Stages.register,func=lambda call: True)
async def answer(call):
    if user_exists(call.from_user.id):
        return
    if call.data == 'register':

        if not (await is_user_subscribed(call.from_user.id)):
            await bot.answer_callback_query(call.id, "Сперва нужно подписаться на всех!",show_alert=True)
        else:
            await setAsyncStageFromUserAnswer(chatid=call.message.chat.id,
                                              stages=Stages.register,
                                              text="Как тебя зовут?", uid=call.from_user.id)
last_part = {}
@bot.message_handler(state=Stages.register)
async def edit_name(message):
    user_id = message.from_user.id
    username = message.text
    if user_id not in users:
        users[user_id] = User()
    user = users[user_id]
    user.set_username(username)
    user.set_telegram_id(user_id)
    await setAsyncStageFromUserMessageKeyboard(
        message=message,
        stages=Stages.group,
        text='К какой группе ты относишься?',
        keyboard=g_keys)
    last_part[user_id] = message
    await changeDataValue(message, 'groups', [message.text, user])


# Группа 1 -> Зритель
# Группа 2 -> Скейтер
# Группа 3 -> Самокатер/BMX
#
@bot.callback_query_handler(state=Stages.group, func=lambda call: call.data.startswith('grp_'))
async def handle_group_selection(call):
    user_id = call.from_user.id
    messages = last_part[user_id]
    user = (await getAsyncData(messages, 'groups'))[1]
    group_id = call.data.split("_")[1]
    if group_id == '1':
        user.set_usergroup("Зритель")
    if group_id == '2':
        user.set_usergroup("Скейтер")
    if group_id == '3':
        user.set_usergroup("Самокатер/BMX")
    await setAsyncStageFromUserMessage(
        message=messages,
        stages=Stages.about,
        text='Что в жизни умеешь делать лучше всего, кроме катания? (Напиши немного о себе)\n\n'
             'Мы активно развиваем комьюнити, будем рады делать это вместе ✌️')
    await changeDataValue(messages, 'about', [messages.text, user])

wallet_part = {}

user_cache = {}
CALLBACK_URL = 'http://95.163.231.244:5000/callback'
@bot.message_handler(state=Stages.about)
async def about(message):
    user_id = message.from_user.id
    user = (await getAsyncData(message, 'about'))[1]
    about_txt = message.text
    user.set_about(about_txt)
    await connwallet(message=message, usr=user)


async def nftconnect(message):
    user_id = message.from_user.id
    if not(user_exists(user_id)):
        return
    user = get_user_by_telegram_id(user_id)

    wallet_part[user_id] = message

    wallets_list = TonConnect.get_wallets()
    for wallet in wallets_list:
        wls = types.InlineKeyboardButton(text=wallet['name'], callback_data=f'connect:{wallet["name"]}')
        wallets.add(wls)
    await bot.send_message(message.chat.id, "Мы активно работаем над приложением, там будет еще интереснее!\n\n"
"А коллекция NFT, которую ты можешь сейчас получить даст тебе доступ к бета тесту! 🐉\n"
"Лучше всего подключать [Tonkeeper](https://ru.ton-telegram.network/tonkeeper-wallet/#download)",parse_mode='Markdown',reply_markup=wallets)
    wallets.keyboard.clear()
    user_cache[user_id] = user

@bot.callback_query_handler(func=lambda call: call.data.startswith('connect:'))
async def wallet_handler(call):
    answer = call.data.split(":")
    user_id = call.from_user.id
    message = wallet_part[user_id]
    user = user_cache[user_id]
    await connect_wallet(message=message,usr=user,wallet_name=answer[1])
def generate_random():
    return random.randint(1000000000, 9999999999)

def create_qr_code(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    return img

async def connect_wallet(message,usr,wallet_name: str):
    connector = get_connector(message.chat.id)

    wallets_list = connector.get_wallets()
    wallet = None
    for w in wallets_list:
        if w['name'] == wallet_name:
            wallet = w

    if wallet is None:
        raise Exception(f'Unknown wallet: {wallet_name}')

    generated_url = await connector.connect(wallet)

    mk_b = types.InlineKeyboardMarkup(row_width=1)
    mkk = types.InlineKeyboardButton(text='Подключить кошелёк', url=generated_url)
    mk_b.add(mkk)
    img = create_qr_code(generated_url)
    bio = BytesIO()
    bio.name = 'qrcode.png'
    img.save(bio, 'PNG')
    bio.seek(0)
    await bot.send_photo(message.chat.id, photo=bio, caption="Пожалуйста просканнируйте QRCode и "
                                                                    "привяжите свой кошелёк, чтобы получать вознаграждение.",
                             reply_markup=mk_b)
    for i in range(1, 1800):
        await asyncio.sleep(1)
        if connector.connected:
            if connector.account.address:
                wallet_address = connector.account.address
                wallet_address = Address(wallet_address).to_str(is_bounceable=False)
                await bot.send_message(message.chat.id, f"<b>Поздравляем!</b>\n\n"
                f"Ты успешно привязал свой кошелек: <b>{wallet_address}</b>",parse_mode='HTML')

                #await bot.send_message(message.chat.id, f"Вы успешно привязали ваш кошелёк: <code>{wallet_address}</code> это адрес вашего кошелька, "
                                                        #f"на него вы сможете получить награды.",parse_mode='HTML')
                update_wallet(message.from_user.id,wallet_address)

                #await message.answer(f'You are connected with address <code>{wallet_address}</code>', reply_markup=mk_b.as_markup())
                logger.info(f'Connected with address: {wallet_address}')
                #await connwallet(message=message, usr=usr)
            return

    await bot.send_message(message.chat.id, f"Время вышло!")


def get_user_id_by_telegram_id(telegram_id, db_name='database.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('SELECT id FROM users WHERE telegram_id = ?', (telegram_id,))
    result = cursor.fetchone()

    conn.close()

    if result is None:
        return None  # Пользователь не найден
    return result[0]

async def connwallet(message,usr):
    user_id = message.from_user.id
    user = usr
    user.set_coins(30)
    user.set_time_registration(datetime.now())
    user.set_number(generate_random())
    add_user_to_db(user)
    userGlobalId = get_user_id_by_telegram_id(user_id)
    await bot.delete_state(message.from_user.id, message.chat.id)
    await bot.send_message(message.chat.id, text='Поздравляю, ты зарегистрировался, жди наград! 🎉  \n\n'
f'Чтобы получить токены, скажи организатору свой уникальный номер «{userGlobalId}» \n\n'
'В течение скейт контеста ты сможешь заработать токен $BLOCK. Райдеры из топ 5 получат от нас ценные призы🏆\n\n'
'А пока мы уже отправили тебе 30 $BLOCK, теперь ты в 120’ке💙\n\n'
'Так же не забывай подключать свой кошелек, на него ты сможешь получить уникальную NFT, приуроченную к мероприятию и нашей коллаборации с Ton Street Boys\n\n'
'Все владельцы этой коллекции получат доступ к бета-тестированию нашего приложения! 🦅',reply_markup=menu)


def export_users_to_excel(db_name='database.db', excel_file='users.xlsx'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT id, username, coins, wallet, usergroup, about
        FROM users
    ''')

    users = cursor.fetchall()
    conn.close()

    df = pd.DataFrame(users, columns=['id', 'Имя', 'Количество коинов', 'Кошелёк', 'Скилы', 'Об участнике'])

    df.to_excel(excel_file, index=False)


def add_coins(user_number, amount, db_name='database.db'):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute('SELECT coins FROM users WHERE id = ?', (user_number,))
    result = cursor.fetchone()

    if result is None:
        conn.close()
        raise ValueError("Пользователь с указанным номером не найден")

    current_coins = int(result[0])
    new_coins = current_coins + amount
    cursor.execute('UPDATE users SET coins = ? WHERE id = ?', (new_coins, user_number))
    conn.commit()
    conn.close()

@bot.message_handler(commands=['participants'])
async def participants(message):
    userId = message.from_user.id
    if isAdmin(userId):
        await bot.send_message(message.chat.id, text=f"Формируем для вас users.xlsx...")
        export_users_to_excel()
        f = open("users.xlsx", "rb")
        await bot.send_document(message.chat.id,f)
@bot.message_handler(commands=['add'])
async def add(message):
    userId = message.from_user.id
    if isAdmin(userId):
        await setAsyncStageFromUserMessage(
            message=message,
            stages=Stages.add_id,
            text='Введи ID участника.')

@bot.message_handler(state=Stages.add_id)
async def add_by_id(message):
    userId = message.text
    if(not user_exists_by_num(userId)):
        await bot.delete_state(message.from_user.id, message.chat.id)
        return
    await setAsyncStageFromUserMessage(
        message=message,
        stages=Stages.add_coins,
        text='Какой суммой вы хотите вознаградить участника?')
    await changeDataValue(message, 'add_coins', [message.text, userId])
def is_integer(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

@bot.message_handler(state=Stages.add_coins)
async def add_coins_id(message):
    coins = message.text
    userNumber = (await getAsyncData(message, 'add_coins'))[1]
    if(not is_integer(coins)):
        await bot.delete_state(message.from_user.id, message.chat.id)
        return
    add_coins(userNumber,int(coins))
    await bot.delete_state(message.from_user.id, message.chat.id)
    await bot.send_message(message.chat.id, text=f"Токены начислены")

async def balance(message):
    userId = message.from_user.id
    if user_exists(userId):
        user = get_user_by_telegram_id(userId)
        userGlobalId = get_user_id_by_telegram_id(userId)
        await bot.send_message(message.chat.id, text=f"Твой уникальный номер = {userGlobalId}\n\nВаш баланс: {user.coins}")

async def rating(message):
    userId = message.from_user.id
    if user_exists(userId):
        rating = get_top_10_and_user_rank(userId)
        await bot.send_message(message.chat.id, text=rating)
@bot.message_handler(func=lambda message: True)
async def handle_message(message):

    if message.text == "Твой баланс 💵":
        await balance(message)
    elif message.text == "Рейтинг 📈":
        await rating(message)
    elif message.text == "Подключи кошелек и получи NFT🖼️":
        await nftconnect(message)
    elif message.text == "Что такое 120 BLOCK ?":
        await bot.send_message(message.chat.id, "120 это номер автобуса, который соединяет метро «Проспект Вернадского и скейтпарк LSD. А блок это наше комьюнити\n\n"
    "Так мы кратко можем описать себя, но мы готовы открыть все свои карты в этой [статье](https://telegra.ph/CHto-takoe-120-05-31)",parse_mode='Markdown')
    #if message.text == "/add":
        #await add(message)
    #if message.text == "/participants":
       # await participants(message)


bot.add_custom_filter(asyncio_filters.StateFilter(bot))
if __name__ == '__main__':
    #flask_thread = threading.Thread(target=lambda: CallbackService.app.run(host='0.0.0.0', port=5000))
    #flask_thread.start()
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(bot.polling(non_stop=True,timeout=300))