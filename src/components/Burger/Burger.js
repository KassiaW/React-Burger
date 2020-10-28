import React from 'react';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant';

import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //here we hav an array of 2 elements. The Value doesnt matter
            return [...Array(props.ingredients[igKey])].map( ( _, i ) => {
                return <BurgerIngrediant key={igKey + i} type={igKey} />;
            }); 
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []); 
        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top" />
            {transformedIngredients}
            <BurgerIngrediant type="bread-bottom" />
        </div>
    );
}; 

export default burger;