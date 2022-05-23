import React, { useState } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import TopBar from "./components/TopBar.jsx";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
// import PreferencesPage from "./components/pages/Preferences.jsx";
// import AddRecipePage from "./components/pages/AddRecipe.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);

  function addRecipe(title, description) {
    let id = Date.now();
    let newRecipe = {
      id: id,
      isPrefered: false,
      title,
      description,
    };
    setRecipes([...recipes, newRecipe]);
  }

  function deleteRecipe(id) {
    setRecipes(recipes.filter((el) => el.id != id));
  }

  function addPreference(id) {
    let pref_copy = recipes.map((el) =>
      el.id != id ? el : { ...el, isPrefered: true }
    );
    setRecipes(pref_copy);
  }

  function removePreference(id) {
    let pref_copy = recipes.map((el) =>
      el.id != id ? el : { ...el, isPrefered: false }
    );
    setRecipes(pref_copy);
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
        {/* <Route href="/preferences" element={<PreferencesPage />} />
        <Route href="/new_recipe" element={<AddRecipePage />} /> */}
      </Routes>
      </div>
    </div>
  );
}

export default App;
