import React from 'react';
import classes from './MobileNavToggle.css';

const MobileNav = (props) => (
    <div className={classes.Burger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default MobileNav;