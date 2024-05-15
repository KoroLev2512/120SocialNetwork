import sqlite3

conn = sqlite3.connect('userdata.db')
c = conn.cursor()

# Создание таблиц
c.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    telegram_id INTEGER,
    wallet TEXT,
    username TEXT,
    profile_photo INTEGER,
    time_registration TIMESTAMP
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS user_telegram_data (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    telegram_id INTEGER,
    username TEXT,
    first_name TEXT,
    second_name TEXT,
    language TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY,
    language TEXT
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    language_id INTEGER,
    dark_mode BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(language_id) REFERENCES languages(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    control BOOLEAN,
    balance_sheet_id INTEGER,
    link TEXT,
    time_creation INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(balance_sheet_id) REFERENCES balance_sheet(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY,
    post_id INTEGER,
    title TEXT,
    FOREIGN KEY(post_id) REFERENCES posts(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS photo (
    id INTEGER PRIMARY KEY,
    post_id INTEGER,
    photo_load INTEGER,
    FOREIGN KEY(post_id) REFERENCES posts(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS referrals (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    referral_link TEXT,
    use BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS balance_sheet (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    transaction_id INTEGER,
    photo_id INTEGER,
    amount INTEGER,
    time TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(photo_id) REFERENCES photo(id)
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS transaction_type (
    id INTEGER PRIMARY KEY,
    title TEXT
)
''')

conn.commit()
conn.close()