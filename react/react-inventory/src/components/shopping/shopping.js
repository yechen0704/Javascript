import React, { Component } from "react";
import "./shopping.css";
import Cart from "../cart/cart";
import Inventory from "../inventory/inventory";

import {
    getCart,
    getInventory,
    addToCart,
    updateCart,
    deleteFromCart,
    checkout,
} from "../../APIs/api";

export default class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            cart: [],
        };
    }

    async componentDidMount() {
        const data = await getInventory();
        console.log("getInventory", data);
        let inventory_data = data.map((item) => {
            return {
                id: item.id,
                content: item.content,
                amount: 0,
            };
        });
        this.setState({ inventory: inventory_data });

        const cart_data = await getCart();
        console.log("getCart", cart_data);
        this.setState({ cart: cart_data });
    }

    clearInventoryAmount = (id) => {
        this.setState({
            inventory: this.state.inventory.map((item) =>
                item.id === id ? { ...item, amount: 0 } : item
            ),
        });
    };

    handleAddToCart = async (id) => {
        const inv_item = this.state.inventory.find((item) => item.id === id);
        if (inv_item === undefined) {
            return;
        }
        if (inv_item.amount === 0) {
            return;
        }
        const cart_item = this.state.cart.find((item) => item.id === id);
        // update
        if (cart_item) {
            let new_item = {
                ...cart_item,
                amount: cart_item.amount + inv_item.amount,
            };
            updateCart(id, new_item).then((data) => {
                this.setState({
                    cart: this.state.cart.map((item) =>
                        item.id === id ? new_item : item
                    ),
                });
            });
        } else {
            // add
            addToCart(inv_item).then((data) => {
                this.setState({ cart: [inv_item, ...this.state.cart] });
            });
        }
        this.clearInventoryAmount(id);
    };

    handleDeleteFromCart = async (id) => {
        deleteFromCart(id).then((data) => {
            this.setState({
                cart: this.state.cart.filter((item) => {
                    console.log("item.id : " + item.id);
                    return item.id !== id
                }),
            });
        });
    };

    handleCheckout = async () => {
        checkout().then((data) => {
            this.setState({ cart: [] });
        });
    };

    handleInventoryAmount = (id, change) => {
        const inv_item = this.state.inventory.find((item) => item.id === id);
        if (inv_item === undefined) {
            return;
        }
        if (inv_item.amount + change < 0) {
            return;
        }
        this.setState({
            inventory: this.state.inventory.map((item) =>
                item.id === id
                    ? { ...item, amount: item.amount + change }
                    : item
            ),
        });
    };

    render() {
        return (
            <div id="app">
                <Inventory
                    inventory={this.state.inventory}
                    handleInventoryAmount={this.handleInventoryAmount}
                    handleAddToCart={this.handleAddToCart}
                />
                <Cart
                    cart={this.state.cart}
                    handleDeleteFromCart={this.handleDeleteFromCart}
                    handleCheckout={this.handleCheckout}
                />
            </div>
        );
    }
}