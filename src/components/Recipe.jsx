import React from "react";
import { Card, Button } from "react-bootstrap";

const Recipe = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">{props.recipe.title}</Card.Title>
        <Card.Subtitle className="text-center mb-2 text-muted">Стоимость: {props.recipe.cost} руб.</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Ингредиенты: {props.recipe.ingredients.join(', ')}</Card.Subtitle>
        <Card.Text>
          {props.recipe.description}
        </Card.Text>
        {props.isInPreferences ? (
          <Button
            variant="danger"
            onClick={() => props.removePreference(props.recipe.id)}
          >
            Удалить из избранного
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => props.addPreference(props.recipe.id)}
          >
            Добавить в избранное
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Recipe;
