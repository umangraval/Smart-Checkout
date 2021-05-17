from app import app
from flask_cors import CORS

CORS(app)
if __name__ == "__main__":
    app.run(debug=True, port=8123)
