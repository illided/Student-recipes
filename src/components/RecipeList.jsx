import { Row, Col } from "react-bootstrap";
import Recipe from "./Recipe";

const RecipeList = (props) => {
  let recipes = props.recipes;
  return (
    <Row xs={2} md={4} className="g-4">
      {recipes.map((recipe) => (
        <Col>
          <Recipe
            recipe={recipe}
            isInPreferences={recipe.isPrefered}
            addPreference={props.addPreference}
            removePreference={props.removePreference}
          ></Recipe>
        </Col>
      ))}
    </Row>
  );
};

export default RecipeList;
