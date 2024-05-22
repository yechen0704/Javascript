import React, { Component } from "react";
import "./cart.css";

export default class Inventory extends Component {
    render() {
        return (
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                <div className="cart-wrapper">
                    <div className="cart-list">
                        {this.props.cart.map((item) => (
                            <div className="cart_item" key={item.id}>
                                <p>
                                    {item.content} x {item.amount}
                                </p>
                                <span className="bet_space"></span>
                                <button
                                    className="delete_from_cart_btn inventory_btns"
                                    onClick={() =>
                                        this.props.handleDeleteFromCart(item.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => this.props.handleCheckout()}
                    >
                        checkout
                    </button>
                </div>
            </div>
        );
    }
}