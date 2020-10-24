import React from 'react';
import Aux from '../AuxHoc/auxHoc';

import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

import classes from './Layout.module.css';
// enclosing other components

class Layout extends React.Component {
    
    state = {
        showSideDrawer : false
    }


    sideDrawerToggle = () =>{
        

        this.setState((prevState)=>{
            return({showSideDrawer: !prevState.showSideDrawer})
        })
    }
    
render(){

    return(
        // face drawerToggle display block cand este sub 500px ecranul si display none la navItems 
    <Aux>
    
    <Toolbar 
    isAuth = {this.props.isAuthenticated}
    showDrawer={this.sideDrawerToggle} />

    <SideDrawer 
    isAuth={this.props.isAuthenticated}
    open={this.state.showSideDrawer} 
    closed={this.sideDrawerToggle} />

    <main className={classes.Layout} >
        {this.props.children}
    </main>
    </Aux>

    )
}

}

// verific daca userul este autentificat

const mapStateToProps = state =>{
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);