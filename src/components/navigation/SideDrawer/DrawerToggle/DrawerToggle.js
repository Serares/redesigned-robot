import React from 'react';

import classes from './DrawerToggle.module.css';


const drawerToggle = (props) => {
    return (
        <div onClick={props.toggleDrawer} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
        
        </div>
    )
}

export default drawerToggle;