from flask import Blueprint, request, jsonify
from db_setup import db
from models import Post

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/api/post/add', methods=['POST'])
def add_post():
    data = request.get_json()
    new_post = Post(
        id=data['post_id'],
        user_id=data['user_id'],
        control=data['control_id'],
        balance_sheet_id=data['balance_sheet_id'],
        tag_id=data['tag_id'],
        link=data['link'],
        time_creation=data['time_creation'],
        description=data['description'],
        image=data['image']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post added"}), 200

@post_bp.route('/api/post/get/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)
    if post:
        return jsonify(post.serialize()), 200
    return jsonify({"message": "Post not found"}), 400

@post_bp.route('/api/post/get_all', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify([post.serialize() for post in posts]), 200

@post_bp.route('/api/post/update', methods=['POST'])
def update_post():
    data = request.get_json()
    post = Post.query.get(data['post_id'])
    if not post:
        return jsonify({"message": "Post not found"}), 400
    post.user_id = data.get('user_id', post.user_id)
    post.control = data.get('control_id', post.control)
    post.balance_sheet_id = data.get('balance_sheet_id', post.balance_sheet_id)
    post.tag_id = data.get('tag_id', post.tag_id)
    post.link = data.get('link', post.link)
    post.time_creation = data.get('time_creation', post.time_creation)
    post.description = data.get('description', post.description)
    post.image = data.get('image', post.image)
    db.session.commit()
    return jsonify({"message": "Post updated"}), 200

@post_bp.route('/api/post/delete/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"message": "Post not found"}), 400
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
