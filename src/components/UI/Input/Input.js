import React from 'react';

import classes from './Input.module.css';

const input = (props) =>{

    let inputElement = null;

    let inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    let validationError = null;
    // to do sa pun style pe error message;
    if (props.invalid && props.touched) {
    validationError = <p>Please enter a valid value for {props.inputName}!</p>;
    }

    switch(props.elementType){
        case('input'):
        inputElement = <input onChange={props.changed} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} />
        break;
        case('textarea'):
        inputElement = <textarea onChange={props.changed} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} />
        break;
        case('select'):
        inputElement = 
            
            <select onChange={props.changed} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')}>
            {props.elementConfig.option.map(op =>(
                <option key={op.value} value={op.value}>
                {op.displayValue}
                </option>
            ))}
            </select>
        
        break;
        default:
        inputElement = <input onChange={props.changed} {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} />
    }

    return(

        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
        </div>

    )

}


export default input;




