import sqlite3

from regex import F, U

def add_recipe(conn, recipe: dict):
    curs = conn.cursor()

    curs.execute(
        """
        INSERT INTO recipes (title, cost, description) VALUES (?, ?, ?)
        """
    , [recipe['title'], recipe['cost'], recipe['description']])

    recipe_id = curs.lastrowid

    for ingredient in recipe['ingredients']:
        curs.execute(
            """
            INSERT OR IGNORE INTO ingredients VALUES (?)
            """
        , [ingredient])

        curs.execute(
            """
            SELECT ROWID FROM ingredients where name=?
            """,
            [ingredient],
        )

        ingredient_id = curs.fetchone()[0]

        curs.execute(
            """
            INSERT INTO ingredient_to_recipe VALUES (?, ?)
            """,
            [ingredient_id, recipe_id],
        )
    curs.execute('commit')
    curs.close()

def get_all_recipes(conn, user_id: str) -> list:
    curs = conn.cursor()

    curs.execute(
        """
        SELECT ingredient_to_recipe.recipe_id, title, cost, description, user_id, GROUP_CONCAT(name, ',') AS ingredient_name
        from recipes 
        JOIN ingredient_to_recipe ON ingredient_to_recipe.recipe_id=recipes.ROWID 
        join ingredients on ingredients.ROWID=ingredient_to_recipe.ingredient_id
        left join (select * from user_preferences where user_id=?) as users on users.recipe_id=recipes.ROWID
        GROUP BY ingredient_to_recipe.recipe_id HAVING COUNT(*) > 1;
        """
    , [user_id])

    query = curs.fetchall()
    query = [dict(zip(['id', 'title', 'cost', 'description', 'user_id', 'ingredient_name'], r)) for r in query]
    for recipe in query:
        recipe['ingredients'] = recipe['ingredient_name'].split(',')
        del recipe['ingredient_name']
        recipe['isPrefered'] = True if recipe['user_id'] is not None else False
        del recipe['user_id']
    
    curs.close()
    return query
    


def get_preferences(conn, user_id: str) -> list:
    curs = conn.cursor()

    curs.execute(
        """
        SELECT ingredient_to_recipe.recipe_id, title, cost, description, GROUP_CONCAT(name, ',') AS ingredient_name
        from recipes 
        JOIN ingredient_to_recipe ON ingredient_to_recipe.recipe_id=recipes.ROWID 
        join ingredients on ingredients.ROWID=ingredient_to_recipe.ingredient_id
        join (select * from user_preferences where user_id=?) as users on users.recipe_id=recipes.ROWID
        GROUP BY ingredient_to_recipe.recipe_id HAVING COUNT(*) > 1;
        """
    , [user_id])

    query = curs.fetchall()
    query = [dict(zip(['id', 'title', 'cost', 'description', 'ingredient_name'], r)) for r in query]
    for recipe in query:
        recipe['ingredients'] = recipe['ingredient_name'].split(',')
        del recipe['ingredient_name']

    curs.close()
    return query

def set_preference(conn, user_id: str, recipe_id: int, isPrefered: bool):
    curs = conn.cursor()
    if isPrefered:
        curs.execute(
            """
            INSERT OR IGNORE INTO user_preferences VALUES (?, ?)
            """
        , [user_id, recipe_id])
    else:
        curs.execute(
            """
            DELETE FROM user_preferences WHERE user_id=? AND recipe_id=?
            """
        , [user_id, recipe_id])

    curs.execute('commit')
    curs.close()


# ------------------------------ for tests ------------------------------

# borstch_placeholder = """Борщ — горячий заправочный суп на основе свёклы, которая придаёт ему характерный красный цвет.
# В словаре В. И. Даля — род щей, похлёбка из квашеной свёклы, на говядине и свинине, или со свиным салом. 
# Традиционное блюдо восточных славян, основное первое блюдо украинской кухни."""

# def borstch_dump():
#     return {
#         'recipes': [
#             {'title': 'Борщ', 
#             'cost': 500,
#             'ingredients': ['Вода', 'Свекла', 'Мясо', 'Капуста', 'Морковь', 'Любовь'],
#             'description': borstch_placeholder,
#             'isPrefered': False}
#             ] * 10
#     }

# conn = sqlite3.connect('recipes.db')

# for borstch in borstch_dump()['recipes']:
#     add_recipe(conn, borstch)

# set_preference(conn,'Ilya', 2, True)

# print(len(get_all_recipes(conn, 'Ilya')))
# print(len(get_preferences(conn,'Ilya')))

# set_preference(conn, 'Ilya', 2, False)

# conn.close()