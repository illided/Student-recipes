from flask import Flask, g, request
import sqlite3
import os
from create_db import create_database
from requests import get_all_recipes, set_preference, get_preferences, add_recipe

app = Flask(__name__)

def get_db() -> sqlite3.Connection:
    db = getattr(g, '_database', None)
    db_path = os.path.join(os.getcwd(), 'api', 'recipes.db')
    if not os.path.exists(db_path):
        db = g._database = sqlite3.connect(db_path)
        create_database()
    if db is None:
        db = g._database = sqlite3.connect(db_path)
    return db

@app.route('/api/v1/recipes', methods=['POST'])
def get_all_recipes():
    user_id = request.get_json()['user_id']
    return get_all_recipes(get_db(), user_id)

@app.route('/api/v1/preference', methods=['POST'])
def set_preference():
    body = request.get_json()
    user_id = body['user_id']
    isPrefered = body['isPrefered']
    return set_preference(get_db(), user_id, isPrefered)

@app.route('/api/v1/recipes', methods=['POST'])
def get_preferences():
    user_id = request.get_json()['user_id']
    return get_preferences(get_db(), user_id)

@app.route('/api/v1/recipes', methods=['POST'])
def add_recipe():
    body = request.get_json()
    add_recipe(get_db(), body['recipe'])
    

if __name__ == '__main__':
    app.run(debug=True)