import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';

const AddRecipePage = () => {
    const [form, setForm] = useState({})
    const [isAdded, setIsAdded] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        sendRecipe()
        setForm({})
    }

    function sendRecipe() {
        let recipe = {...form}
        recipe.ingredients = recipe.ingredients.toLowerCase().split(',')
        
        fetch('/api/v1/add_recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({recipe})
          }).then((response) => {
            if (response.ok) {
                setIsAdded(true)
            }
          })
    }

    return (
        <div className='addRecipePage'>
            <h1>Добавьте свой рецепт!</h1>
            <Form>
                <Row>
                    <Col>
                    <Form.Group className='mb-4'>
                        <Form.Label>Название</Form.Label>
                        <Form.Control required placeholder='Борщ' onChange={(e) => setForm({...form, title: e.target.value})}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className='mb-4'>
                        <Form.Label>Стоимость</Form.Label>
                        <Form.Control required placeholder='999 руб.' onChange={(e) => setForm({...form, cost: e.target.value})}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Form.Group className='mb-4'>
                    <Form.Label>Ингредиенты (через запятую)</Form.Label>
                    <Form.Control required placeholder='Свекла, морковь, вода' onChange={(e) => setForm({...form, ingredients: e.target.value})}/>
                </Form.Group>
                <Form.Group className='mb-4'> 
                    <Form.Label>Описание</Form.Label>
                    <Form.Control required as='textarea' rows={8} placeholder='Берем сначала укропу...' onChange={(e) => setForm({...form, description: e.target.value})}/>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={handleSubmit} className='mb-4'>
                    Добавить
                </Button>
            </Form>
            {isAdded &&
                <Alert variant='success'>Рецепт добавлен</Alert>
            }
        </div>
    )
}

export default AddRecipePage;