from db_setup import app, db
from user_routes import user_bp
from post_routes import post_bp

app.register_blueprint(user_bp)
app.register_blueprint(post_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
