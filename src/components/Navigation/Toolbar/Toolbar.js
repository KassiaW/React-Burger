import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileNav from '../SideDrawer/SideDrawToggle/MobileNavToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MobileNav clicked={props.mobileNavClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;