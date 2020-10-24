import React from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {checkValidity} from '../../../shared/utility';


class ContactData extends React.Component{

    state = {

        orderForm:{

            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Address'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength: 6
                },
                valid:false,
                touched:false
            },


            country:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    option:[
                        {value:'fastes', displayValue:'Fastes'},
                        {value:'cheapest', displayValue:'Cheapest'},
                    ]
                },
                validation:{
                    required:true,
                },
                value:'',
                touched:false,
                valid: false
            }

        },

        formIsValid:false
    }

    orderHandler = (e) =>{

        e.preventDefault();

        const formData = {};
        for(let formElementIdent in this.state.orderForm){
            formData[formElementIdent] = this.state.orderForm[formElementIdent].value
        }

        // loading at the start of the request;
        // this.setState({loading:true});
        let priceFixed = parseFloat((this.props.price).toFixed(2))
        const orderObj = {
            ingredients : this.props.ingr,
            orderData : formData,
            price: priceFixed,
            userId: this.props.userId
        };

        this.props.burgerStart(orderObj, this.props.token);

    }

    changedInput = (e, formElement) =>{

        // copiezi state 
        const updatedForm = {...this.state.orderForm};

        const updatedElementForm = {
            ...this.state.orderForm[formElement]
        }

        updatedElementForm.value = e.target.value;
        updatedElementForm.valid = checkValidity(updatedElementForm.value, updatedElementForm.validation);
        updatedElementForm.touched = true;
        updatedForm[formElement] = updatedElementForm;

        let formIsValid = true;

        for(let inputIdent in updatedForm){
            formIsValid = updatedForm[inputIdent].valid && formIsValid;
        }

        console.log(formIsValid);

        this.setState({
            orderForm: updatedForm,
            formIsValid : formIsValid
        })

    }


    render() {

        const formElement = [];
        for(let key in this.state.orderForm){
            formElement.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }


        let form = (
        <form onSubmit={this.orderHandler}>
        
        {formElement.map(indName =>
            (
            <Input 
                key={indName.id}
                inputName={indName.id}
                elementType={indName.config.elementType}
                elementConfig={indName.config.elementConfig}
                value={indName.config.value}
                invalid={!indName.config.valid}
                shouldValidate={indName.config.validation}
                touched={indName.config.touched}
                changed={(event) =>{this.changedInput(event, indName.id)}}
            />
            )
        )}

        <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}> Order </Button>

                </form>);

            if(this.props.loading){
                form = <Spinner />
            }


        return(

            <div className={classes.ContactData} >
                {form}
            </div>

        )
    }

}


const mapStateToProps = state =>{
    return {
        price : state.burgerBuilder.totalPrice,
        ingr : state.burgerBuilder.ingredients,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        burgerStart : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));