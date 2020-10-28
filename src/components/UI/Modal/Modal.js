import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    //this is to not unnecessarily update the modal when it is not showing. 
    //it is more efficient 

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate (){
        console.log('[Modal] componentDidUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;