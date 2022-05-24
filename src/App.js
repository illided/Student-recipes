import React, { useState } from "react";
import TopBar from "./components/TopBar.jsx";
import { Routes, Route, Link } from "react-router-dom";
import { v4 as uuid} from 'uuid';
import Cookies from 'universal-cookie';

import HomePage from "./pages/Home.jsx";
import PreferencesPage from "./pages/Preferences.jsx";
import AddRecipePage from "./pages/AddRecipe.jsx";

function App() {
  const cookies = new Cookies();
  if (cookies.get('user_id') === undefined) {
      cookies.set('user_id', uuid());
  }

  const [recipes, setRecipes] = useState([]);

  function addRecipe(recipe) {
    
  }

  function deleteRecipe(id) {
    
  }

  function setPreference(id, isPrefered, callback = (responce) => undefined) {
    fetch('api/v1/set_preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({'user_id': cookies.get('user_id'), 'isPrefered': isPrefered, 'recipe_id': id })
    }).then(callback)
  }

  function addPreference(id, callback = (responce) => undefined) {
    setPreference(id, true, callback)
  }

  function removePreference(id, callback = (responce) => undefined) {
    setPreference(id, false, callback)
  }

  const routes = [
    { title: "Все рецепты", href: "/" },
    { title: "Избранное", href: "/preferences" },
    { title: "Добавить рецепт", href: "/new_recipe" },
  ];

  return (
    <div className="App">
      <TopBar links={routes} />
      <div className="app_content">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              recipes={recipes}
              addPreference={addPreference}
              removePreference={removePreference}
            />
          }
        />
        <Route
          path="/preferences"
          element={
            <PreferencesPage
              recipes={recipes}
              addPreference={addPreference}
              removePreference={removePreference}
            />
          }/>
        <Route path="/new_recipe" element={<AddRecipePage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
