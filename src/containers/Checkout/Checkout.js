import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {connect} from 'react-redux';

// afiseaza burgerul comandat

class Checkout extends Component {

        // nu este nevoie nici de state cand ai redux

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         ingredients:null,
    //         price: 0
    //     }
    // }

        // nu mai este nevoie de query aparams cand ai redux 
        
    // componentWillMount(){
    //     // ca sa parcurgi query parameters din url poti sa folosesti si keys in loc de entries dar iti returneaza doar cheia fara valoare
    //     // folosesc +i[1] ca sa convertesti de la string la int 
    //     const queryParams = new URLSearchParams(this.props.location.search).entries();
    //     let newIngredients = {};
    //     let price = 0;
    //     // i va arata ['salad','1']
    //     for(let i of queryParams){
    //         if(i[0] === 'price'){
    //             price = i[1]
    //         } else {
    //             newIngredients[i[0]]= +i[1]
    //         }
            
    //     }
    //     console.log(newIngredients)
    //     this.setState({
    //         ingredients: newIngredients,
    //         price: price
    //     })
        
    // }

    componentWillMount() {
        console.log(this.props)
    }

    cancelOrder = () =>{
        this.props.history.goBack();
    }

    continueOrder = () =>{
        this.props.history.replace({pathname:'/checkout/contact-data'})
    }
    
    render(){

        let summary = <Redirect to="/" />

        if(this.props.ing){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = 

            <div>
            {purchasedRedirect}
            <CheckoutSummary 
            cancelOrder={this.cancelOrder}
            continueOrder={this.continueOrder}
            ingredients={this.props.ing} />
            {/* nested route aici apare in componenta asta componenta ContactData */}
            <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            {/* asa trimiti props catre routed component */}
            {/* <Route path={this.props.match.url + '/contact-data'}
             render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} /> */}
            </div>

        }
        
        return summary;
    }
}

const mapStateToProps = state=> {
    return {
        ing: state.burgerBuilder.ingredients,
        purchased : state.orders.purchased
    }
}

// const mapDispatchtoProps = (dispatch) =>{
//     return {

//     }
// }



export default connect(mapStateToProps)(Checkout);