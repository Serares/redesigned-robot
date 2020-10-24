import React from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component{


    render(){

    const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey =>{
        return <li key={ingKey}>
            <span style={{textTransform:'capitalize'}}>{ingKey}</span> : {this.props.ingredients[ingKey]}
            </li>
    });

    return (
        <React.Fragment>

        <h3>Your order</h3>
        <p>A delish burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p style={{fontWeight:'bold'}}>Price : {this.props.price.toFixed(2)} </p>
        <p>Continue to checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.cancelPurchase}>CANCEL</Button>
        <Button btnType={'Success'} clicked={this.props.continuePurchase}>Submit Order</Button>
        
        </React.Fragment>
    )

    }
}


export default OrderSummary;