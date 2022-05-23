import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import Cookies from 'universal-cookie';

const HomePage = (props) => {
  const [recipes, setRecipes] = useState([])

  const cookies = new Cookies();

  console.log(JSON.stringify({ 'user_id': cookies.get('user_id') }))

  function fetchRecipes() {
    fetch('/api/v1/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'user_id': cookies.get('user_id') })
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }
  ).then(data => {
    console.log('Updated')
    setRecipes(data.recipes)
  })
  
  }

  useEffect(() => {fetchRecipes()}, []) 

  return (
    <div className="HomePage>">
      <h1 style={{textAlign: "center"}}>Рецепты</h1>
      <RecipeList
        recipes={recipes}
        addPreference={(id) => {
          props.addPreference(id, fetchRecipes)
          // fetchRecipes()
        }}
        removePreference={(id) => {
          props.removePreference(id, fetchRecipes)
          // fetchRecipes()
        }}
      ></RecipeList>
    </div>
  );
};

export default HomePage;
