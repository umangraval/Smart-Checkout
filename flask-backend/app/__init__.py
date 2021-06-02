from flask import Flask
from flask_caching import Cache

cache = Cache()

app = Flask(__name__)
app.config["CACHE_TYPE"] = "simple"
cache.init_app(app)

from app import predictions
