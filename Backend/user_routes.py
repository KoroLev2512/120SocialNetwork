from flask import Blueprint, request, jsonify
from db_setup import db
from models import User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/api/user/add', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(
        id=data['user_id'],
        telegram_id=data['user_telegram_id'],
        username=data['username'],
        first_name=data['user_first_name'],
        second_name=data['user_second_name'],
        wallet=data['wallet'],
        profile_photo=data['photo'],
        language=data['language'],
        time_registration=data['time_registration']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added"}), 200

@user_bp.route('/api/user/get/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    return jsonify({"message": "User not found"}), 400

@user_bp.route('/api/user/update', methods=['POST'])
def update_user():
    data = request.get_json()
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"message": "User not found"}), 400
    user.telegram_id = data.get('user_telegram_id', user.telegram_id)
    user.username = data.get('username', user.username)
    user.first_name = data.get('user_first_name', user.first_name)
    user.second_name = data.get('user_second_name', user.second_name)
    user.wallet = data.get('wallet', user.wallet)
    user.profile_photo = data.get('photo', user.profile_photo)
    user.language = data.get('language', user.language)
    user.time_registration = data.get('time_registration', user.time_registration)
    db.session.commit()
    return jsonify({"message": "User updated"}), 200

@user_bp.route('/api/user/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 400
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200
