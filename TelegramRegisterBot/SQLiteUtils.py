import sqlite3


class Database:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.c = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        self.c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            telegram_id INTEGER,
            wallet TEXT,
            username TEXT,
            profile_photo INTEGER,
            time_registration TIMESTAMP,
            coins INTEGER
        )
        ''')

        self.c.execute('''
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

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS languages (
            id INTEGER PRIMARY KEY,
            language TEXT
        )
        ''')

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS sittings (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            language_id INTEGER,
            dark_mode BOOLEAN,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(language_id) REFERENCES languages(id)
        )
        ''')

        self.c.execute('''
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

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY,
            post_id INTEGER,
            title TEXT,
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
        ''')

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS photo (
            id INTEGER PRIMARY KEY,
            post_id INTEGER,
            photo_load INTEGER,
            FOREIGN KEY(post_id) REFERENCES posts(id)
        )
        ''')

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS referrals (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            referral_link TEXT,
            use BOOLEAN,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        ''')

        self.c.execute('''
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

        self.c.execute('''
        CREATE TABLE IF NOT EXISTS transaction_type (
            id INTEGER PRIMARY KEY,
            title TEXT
        )
        ''')

        self.conn.commit()

    def add_user(self, telegram_id, wallet, username, profile_photo, time_registration):
        self.c.execute('''
        INSERT INTO users (telegram_id, wallet, username, profile_photo, time_registration)
        VALUES (?, ?, ?, ?, ?)
        ''', (telegram_id, wallet, username, profile_photo, time_registration))
        self.conn.commit()

    def add_user_telegram_data(self, user_id, telegram_id, username, first_name, second_name, language):
        self.c.execute('''
        INSERT INTO user_telegram_data (user_id, telegram_id, username, first_name, second_name, language)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, telegram_id, username, first_name, second_name, language))
        self.conn.commit()

    def add_language(self, language):
        self.c.execute('''
        INSERT INTO languages (language)
        VALUES (?)
        ''', (language,))
        self.conn.commit()

    def add_sitting(self, user_id, language_id, dark_mode):
        self.c.execute('''
        INSERT INTO sittings (user_id, language_id, dark_mode)
        VALUES (?, ?, ?)
        ''', (user_id, language_id, dark_mode))
        self.conn.commit()

    def add_post(self, user_id, control, balance_sheet_id, link, time_creation):
        self.c.execute('''
        INSERT INTO posts (user_id, control, balance_sheet_id, link, time_creation)
        VALUES (?, ?, ?, ?, ?)
        ''', (user_id, control, balance_sheet_id, link, time_creation))
        self.conn.commit()

    def add_tag(self, post_id, title):
        self.c.execute('''
        INSERT INTO tags (post_id, title)
        VALUES (?, ?)
        ''', (post_id, title))
        self.conn.commit()

    def add_photo(self, post_id, photo_load):
        self.c.execute('''
        INSERT INTO photo (post_id, photo_load)
        VALUES (?, ?)
        ''', (post_id, photo_load))
        self.conn.commit()

    def add_referral(self, user_id, referral_link, use):
        self.c.execute('''
        INSERT INTO referrals (user_id, referral_link, use)
        VALUES (?, ?, ?)
        ''', (user_id, referral_link, use))
        self.conn.commit()

    def add_balance_sheet(self, user_id, transaction_id, photo_id, amount, time):
        self.c.execute('''
        INSERT INTO balance_sheet (user_id, transaction_id, photo_id, amount, time)
        VALUES (?, ?, ?, ?, ?)
        ''', (user_id, transaction_id, photo_id, amount, time))
        self.conn.commit()

    def add_transaction_type(self, title):
        self.c.execute('''
        INSERT INTO transaction_type (title)
        VALUES (?)
        ''', (title,))
        self.conn.commit()

    def close(self):
        self.conn.close()