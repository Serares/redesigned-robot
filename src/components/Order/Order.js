import React from 'react';

import classes from './Order.module.css';

const order = (props) =>{

    const ingredientsArr =[];
    for(let ingredientName in props.ingredients){
        ingredientsArr.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingOut=ingredientsArr.map(ing =>{
        return(
            <span 
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                padding:'2px',
                border:'1px solid #eee',
                margin: '0 3px'
            }}
            key={ing.name}>
                {ing.name}({ing.amount})
            </span>
        )
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients:{ingOut}</p>
            <p>Price <strong>{props.price}</strong></p>
        </div>
    )
}


export default order;