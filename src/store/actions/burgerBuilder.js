import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';



export const addIngredient = (name)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = (name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const stateIngredients = (data) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: data
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () =>{
    return dispatch =>{
        axios.get('/ingredients.json')

        .then(response=>(
            
            dispatch(stateIngredients(response.data))
        ))
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        })
    };
}