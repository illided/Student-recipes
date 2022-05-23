from flask import Flask, g, request
import sqlite3
import os
from create_db import create_database
from requests import get_all_recipes, set_preference, get_preferences, add_recipe

app = Flask(__name__)

def get_db() -> sqlite3.Connection:
    db = getattr(g, '_database', None)
    db_path = os.path.join(os.getcwd(), 'recipes.db')
    if not os.path.exists(db_path):
        db = g._database = sqlite3.connect(db_path)
        create_database()
    if db is None:
        db = g._database = sqlite3.connect(db_path)
    return db

@app.route('/api/v1/recipes', methods=['POST'])
def all_recipes_route():
    user_id = request.get_json()['user_id']
    return {'recipes': get_all_recipes(get_db(), user_id)}

@app.route('/api/v1/set_preference', methods=['POST'])
def set_preference_route():
    body = request.get_json()
    print(body)
    user_id = body['user_id']
    isPrefered = body['isPrefered']
    recipe_id = body['recipe_id']
    
    set_preference(get_db(), user_id, recipe_id, isPrefered)
    return {'status': 'OK'}

@app.route('/api/v1/preferences', methods=['POST'])
def preferences_route():
    user_id = request.get_json()['user_id']
    return {'recipes' : get_preferences(get_db(), user_id) }

@app.route('/api/v1/add_recipe', methods=['POST'])
def add_recipe_route():
    body = request.get_json()
    add_recipe(get_db(), body['recipe'])
    return {'status': 'OK'}

if __name__ == '__main__':
    app.run(debug=True)