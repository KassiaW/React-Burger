import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false, 
        loading: false, 
        error: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then (response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1; 
        const upgradeIngredients = {
            ...this.state.ingredients
        };
        upgradeIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: upgradeIngredients});
        this.updatePurchaseState(upgradeIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1; 
        const upgradeIngredients = {
            ...this.state.ingredients
        };
        upgradeIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: upgradeIngredients});
        this.updatePurchaseState(upgradeIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandelr = () => {

        this.setState({loading: true});
        
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, 
            customer: {
                name: 'Kassia White',
                address: {
                    street: 'testStreet', 
                    postcode: '123',
                    country: 'Scotland'
                }, 
                email: 'test@test.com' 
            },
            deliveryMethod: 'shipping'
        }

        // alert('You Continue!');

        axios.post('/orders.json', orders)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render (){

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>;
        let orderSummary = null;
        if (this.state.ingredients){
            burger = ( 
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disableInfo} 
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux> 
            );
            orderSummary = (
                <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandelr}/>
            );
        };
        if (this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);