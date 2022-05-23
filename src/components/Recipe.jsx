import React from "react";
import { Card, Button } from "react-bootstrap";

const Recipe = (props) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://cdnn21.img.ria.ru/images/98039/25/980392579_0:92:2001:1217_1920x0_80_0_0_a9f0c3315654173dff2a2d788439c63f.jpg"
      ></Card.Img>
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
