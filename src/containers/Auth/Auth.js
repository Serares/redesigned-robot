import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {

    state = {

        controls: {
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },

        isSignup:false,

    }

    inputChangedHandler = (event, controlName) =>{

        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid : checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({
            controls:updatedControls
        })

    }


    submitHandler = (event) =>{

        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)

    }

    switchAuthModeHandler = () =>{

        this.setState(prevState =>{
            return{
                isSignup: !prevState.isSignup
            }
        })

    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }




    render(){

        const formElement = [];
        for(let key in this.state.controls){
            formElement.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        let form = formElement.map(indName =>{
            return(
                <Input 
                key={indName.id}
                inputName={indName.id}
                elementType={indName.config.elementType}
                elementConfig={indName.config.elementConfig}
                value={indName.config.value}
                invalid={!indName.config.valid}
                shouldValidate={indName.config.validation}
                touched={indName.config.touched}
                changed={(event) =>{this.inputChangedHandler(event, indName.id)}}
                />
            )
        })

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p style={{color:'red'}}>{this.props.error}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
                Currently {!this.state.isSignup? 'Signing in' : 'Registering new email'}
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">Go to {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>{

    return{
        onAuth:(email,password, isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }

}

const mapStateToProps = state =>{
    return {
        price : state.burgerBuilder.totalPrice,
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth)