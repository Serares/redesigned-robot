export const updateObject = (oldObject, updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rule) =>{

    let isValid = true;


    if(rule.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rule.minLength){
        isValid = value.length >= rule.minLength && isValid;
    }

    if(rule.maxLength){
        isValid = value.length <= rule.maxLength && isValid;
    }

    return isValid;

}