import React from 'react';


import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';

// const ingredients = {
//     salad: 0,
//     bacon: "1",
// }

class checkoutSummary extends React.Component{
    // console.log(props.ingredients)
    componentWillMount(){
        console.log(this.props)
    }
    render(){
        
        return (

        <div className={classes.CheckoutSummary} >
            <h1>Yumm burger</h1>

            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={this.props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={this.props.cancelOrder}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.continueOrder}>Continue</Button>
        </div>

    )
    }

}


export default checkoutSummary;