# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///updateduserdata.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_telegram_id = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(80), nullable=False)
    user_first_name = db.Column(db.String(80), nullable=False)
    user_second_name = db.Column(db.String(80), nullable=False)
    wallet = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    time_registration = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    control_id = db.Column(db.Boolean, nullable=False)
    balance_sheet_id = db.Column(db.Integer, nullable=False)
    tag_id = db.Column(db.Integer, nullable=False)
    link = db.Column(db.String(200), nullable=False)
    time_creation = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image = db.Column(db.String(200), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/user/add', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(
        user_telegram_id=data['user_telegram_id'],
        username=data['username'],
        user_first_name=data['user_first_name'],
        user_second_name=data['user_second_name'],
        wallet=data['wallet'],
        photo=data['photo'],
        language=data['language'],
        time_registration=datetime.strptime(data['time_registration'], '%d.%m.%Y %H:%M')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added'}), 200

@app.route('/api/user/get/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'user_id': user.id,
        'user_telegram_id': user.user_telegram_id,
        'username': user.username,
        'user_first_name': user.user_first_name,
        'user_second_name': user.user_second_name,
        'wallet': user.wallet,
        'photo': user.photo,
        'language': user.language,
        'time_registration': user.time_registration.strftime('%d.%m.%Y %H:%M')
    }), 200

@app.route('/api/user/update', methods=['POST'])
def update_user():
    data = request.get_json()
    user = User.query.get_or_404(data['user_id'])
    user.user_telegram_id = data['user_telegram_id']
    user.username = data['username']
    user.user_first_name = data['user_first_name']
    user.user_second_name = data['user_second_name']
    user.wallet = data['wallet']
    user.photo = data['photo']
    user.language = data['language']
    user.time_registration = datetime.strptime(data['time_registration'], '%d.%m.%Y %H:%M')
    db.session.commit()
    return jsonify({'message': 'User updated'}), 200

@app.route('/api/user/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200

@app.route('/api/post/add', methods=['POST'])
def add_post():
    data = request.get_json()
    new_post = Post(
        user_id=data['user_id'],
        control_id=data['control_id'],
        balance_sheet_id=data['balance_sheet_id'],
        tag_id=data['tag_id'],
        link=data['link'],
        time_creation=datetime.strptime(data['time_creation'], '%d.%m.%Y %H:%M'),
        image=data['image']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post added'}), 200

@app.route('/api/post/get/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify({
        'post_id': post.id,
        'user_id': post.user_id,
        'control_id': post.control_id,
        'balance_sheet_id': post.balance_sheet_id,
        'tag_id': post.tag_id,
        'link': post.link,
        'time_creation': post.time_creation.strftime('%d.%m.%Y %H:%M'),
        'image': post.image
    }), 200

@app.route('/api/post/get_all', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify([{
        'post_id': post.id,
        'user_id': post.user_id,
        'control_id': post.control_id,
        'balance_sheet_id': post.balance_sheet_id,
        'tag_id': post.tag_id,
        'link': post.link,
        'time_creation': post.time_creation.strftime('%d.%m.%Y %H:%M'),
        'image': post.image
    } for post in posts]), 200

@app.route('/api/post/update', methods=['POST'])
def update_post():
    data = request.get_json()
    post = Post.query.get_or_404(data['post_id'])
    post.user_id = data['user_id']
    post.control_id = data['control_id']
    post.balance_sheet_id = data['balance_sheet_id']
    post.tag_id = data['tag_id']
    post.link = data['link']
    post.time_creation = datetime.strptime(data['time_creation'], '%d.%m.%Y %H:%M')
    post.image = data['image']
    db.session.commit()
    return jsonify({'message': 'Post updated'}), 200

@app.route('/api/post/delete/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
