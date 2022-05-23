import sqlite3

def create_database():
    conn = sqlite3.connect('recipes.db')
    curs = conn.cursor()

    curs.execute(
        """
        CREATE TABLE recipes (
            title VARCHAR,
            cost VARCHAR,
            description VARCHAR
        )
        """
    )

    curs.execute(
        """
        CREATE TABLE ingredients (
            name VARCHAR UNIQUE
        )
        """
    )

    curs.execute(
        """
        CREATE TABLE ingredient_to_recipe(
            ingredient_id INTEGER,
            recipe_id INTEGER,
            CONSTRAINT unq UNIQUE (ingredient_id, recipe_id)
        )
        """
    )

    curs.execute(
        """
        CREATE TABLE user_preferences (
            user_id VARCHAR,
            recipe_id INTEGER,
            CONSTRAINT unq UNIQUE (user_id, recipe_id)
        )
        """
    )

    conn.commit()
    curs.close()
    conn.close()

if __name__ == '__main__':
    create_database()



