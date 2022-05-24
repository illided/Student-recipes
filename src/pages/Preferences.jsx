import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import Cookies from 'universal-cookie';

const PreferencesPage = (props) => {
    const [recipes, setRecipes] = useState([])

    const cookies = new Cookies();

    useEffect(() => {
    fetch('/api/v1/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'user_id': cookies.get('user_id') })
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }
  ).then(data => {
    let fetchedRecipes = data.recipes.map((recipe) => {
        return { ...recipe, isPrefered: true}
    })
    setRecipes(fetchedRecipes)
  })
  }, []) 

    function visualSetPreference(id, isPrefered){
        setRecipes(recipes.map((recipe) => {
            if (recipe.id === id) {
                return { ...recipe, isPrefered}
            }
            return recipe
        }))
    }

  return (
    <div className="PreferencesPage>">
    <h1>Избранное</h1>
      <RecipeList
        recipes={recipes}
        addPreference={(id) => {
            props.addPreference(id)
            visualSetPreference(id, true)
        }}
        removePreference={(id) => {
            props.removePreference(id)
            visualSetPreference(id, false)
        }
        }
      ></RecipeList>
    </div>
  );
};

export default PreferencesPage;
