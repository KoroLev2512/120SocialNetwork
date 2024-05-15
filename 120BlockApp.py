import SQLiteUtils
from flask import Flask, request, jsonify

app = Flask("120BlockApp")
db = SQLiteUtils.Database('your_database.db')

@app.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    db.add_user(data['telegram_id'], data['wallet'], data['username'], data['profile_photo'], data['time_registration'])
    return jsonify({"message": "User added successfully"}), 201

@app.route('/user_telegram_data', methods=['POST'])
def add_user_telegram_data():
    data = request.get_json()
    db.add_user_telegram_data(data['user_id'], data['telegram_id'], data['username'], data['first_name'], data['second_name'], data['language'])
    return jsonify({"message": "User telegram data added successfully"}), 201

@app.route('/language', methods=['POST'])
def add_language():
    data = request.get_json()
    db.add_language(data['language'])
    return jsonify({"message": "Language added successfully"}), 201

@app.route('/sitting', methods=['POST'])
def add_sitting():
    data = request.get_json()
    db.add_sitting(data['user_id'], data['language_id'], data['dark_mode'])
    return jsonify({"message": "Sitting added successfully"}), 201

@app.route('/post', methods=['POST'])
def add_post():
    data = request.get_json()
    db.add_post(data['user_id'], data['control'], data['balance_sheet_id'], data['link'], data['time_creation'])
    return jsonify({"message": "Post added successfully"}), 201

@app.route('/tag', methods=['POST'])
def add_tag():
    data = request.get_json()
    db.add_tag(data['post_id'], data['title'])
    return jsonify({"message": "Tag added successfully"}), 201

@app.route('/photo', methods=['POST'])
def add_photo():
    data = request.get_json()
    db.add_photo(data['post_id'], data['photo_load'])
    return jsonify({"message": "Photo added successfully"}), 201

@app.route('/referral', methods=['POST'])
def add_referral():
    data = request.get_json()
    db.add_referral(data['user_id'], data['referral_link'], data['use'])
    return jsonify({"message": "Referral added successfully"}), 201