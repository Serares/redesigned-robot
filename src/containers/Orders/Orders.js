import React, {Component} from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner'

// asta este pagina care areata comenzile pe care le faci.

class Orders extends Component {
    
    // state = {
    //     loading:true,
    //     orders:[]
    // }
    
    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId);
        // nu mai este nevoie de asta pentru ca foloses codul asta in orders action creators.
        // axios.get('/orders.json')
        // .then(res =>{

        //     let fetchedObj=[];
        //     for(let i in res.data){
        //         fetchedObj.push({
        //             ...res.data[i],
        //             id:i
        //         })
        //     }
        //     console.log(fetchedObj);
        //     this.setState({loading:false,orders:fetchedObj})
        // })
        // .catch(res=>{
        //     this.setState({loading:false})
        // })
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order=>{
                return <Order 
                key={order.id}
                price={+order.price}
                ingredients={order.ingredients}
                />
            })
        }
        return (
            <div>
            {orders}
            </div>
        )
    }

}

const mapStateToProps = state =>{

    return{
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
    
}

const mapDispatchToProps = dispatch=>{
    return{
        fetchOrders: (token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));