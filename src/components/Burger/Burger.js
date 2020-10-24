import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


// il fac class ca sa fac validarea cu propTypes 

const burger =(props) =>{
 
    // Obj keys returneaza un array cu numele proprietatilor din obiect si apoi mapez prin el.
    let transformedIngredients = Object.keys(props.ingredients).map((ingKey) =>{
        //console.log(Array(this.props.ingredients[ingKey]))
    return [...Array(props.ingredients[ingKey])].map((_,index)=>{
        
        return <BurgerIngredient key={ingKey + index } type={ingKey} />
    } );
} ).reduce((arr,el)=>{
    
    return arr.concat(el)
},[])
;
// la final dupa ce face un array cu arrayrui ,pentru a le verifica length in functie de care vei returna respectivul numar de ingrediente, ii faci reduce ca sa ai un array cu react elements.
// console.log(transformedIngredients);

if(transformedIngredients.length === 0){
    transformedIngredients = <p>Please insert ingredients</p>
}

    return (
        <div className={classes.Burger}>

            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
            
        </div>
    )

    
}




export default burger;