import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";

const HomePage = (props) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('/api/v1/').then((response) => {
      if (response.ok) {
        return response.json()
      }
    }
  ).then(data => {
    console.log(data.recipes)
    setRecipes(data.recipes) 
  })
  }, []) 

  return (
    <div className="HomePage>">
      <RecipeList
        recipes={recipes}
        addPreference={props.addPreference}
        removePreference={props.removePreference}
      ></RecipeList>
    </div>
  );
};

export default HomePage;
