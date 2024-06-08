from db_setup import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer)
    username = db.Column(db.String(50))
    first_name = db.Column(db.String(50))
    second_name = db.Column(db.String(50))
    wallet = db.Column(db.Integer)
    profile_photo = db.Column(db.String(255))
    language = db.Column(db.String(50))
    time_registration = db.Column(db.DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'telegram_id': self.telegram_id,
            'username': self.username,
            'first_name': self.first_name,
            'second_name': self.second_name,
            'wallet': self.wallet,
            'profile_photo': self.profile_photo,
            'language': self.language,
            'time_registration': self.time_registration
        }

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    control = db.Column(db.Boolean)
    balance_sheet_id = db.Column(db.Integer)
    tag_id = db.Column(db.Integer)
    link = db.Column(db.String(255))
    time_creation = db.Column(db.DateTime)
    description = db.Column(db.String(255))
    image = db.Column(db.String(255))

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'control': self.control,
            'balance_sheet_id': self.balance_sheet_id,
            'tag_id': self.tag_id,
            'link': self.link,
            'time_creation': self.time_creation,
            'description': self.description,
            'image': self.image
        }
