import React from 'react';
import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [

    {label: 'Salad',type:'salad'},
    {label: 'Bacon',type:'bacon'},
    {label: 'Cheese',type:'cheese'},
    {label: 'Meat',type:'meat'}

];

const buildControls = (props) =>{
    // mapezi prin Controls si returnezi fiecare element BuildControl cu handlers si props in functie de ce ingredient este.
    return (

        <div className={classes.BuildControls}>
         <p>Price is : {props.price.toFixed(2)}</p>
            {controls.map(elem =>{
               
               return <BuildControl 
                        key={elem.label} 
                        label={elem.label} 
                        add={()=>{props.addIngredient(elem.type)}} 
                        remove={()=>{props.removeIngredient(elem.type)}} 
                        disabledHandler={props.disabled[elem.type]} />
            })}
            <button className={classes.OrderButton}
             disabled={!(props.purchaseble)}
             onClick={props.ordered}>{props.isAuth ?'Order':'Sign up to order'}</button>
        </div>

    )

}


export default buildControls;