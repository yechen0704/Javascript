import React, { Component } from "react";
import "./inventory.css";

const ITEMS_PER_PAGE = 5;

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    handlePageChange = (change) => {
        if (this.state.currentPage + change < 0) {
            return;
        } else if (
            this.state.currentPage + change >
            Math.ceil(this.props.inventory.length / ITEMS_PER_PAGE) - 1
        ) {
            return;
        }
        this.setState({ currentPage: this.state.currentPage + change });
    };

    render() {
        const getPageItems = () => {
            const start = this.state.currentPage * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            return this.props.inventory.slice(start, end);
        };

        return (
            <div className="inventory-container">
                <h1>Inventory</h1>
                <div className="inventory-list">
                    {getPageItems().map((item) => (
                        <div className="inventory_item" key={item.id}>
                            <p className="inventory_name">{item.content}</p>
                            <button
                                className="decrease_amount_btn inventory_btns"
                                onClick={() =>
                                    this.props.handleInventoryAmount(
                                        item.id,
                                        -1
                                    )
                                }
                            >
                                {" "}
                                -{" "}
                            </button>
                            <p> {item.amount} </p>
                            <button
                                className="increse_amount_btn inventory_btns"
                                onClick={() =>
                                    this.props.handleInventoryAmount(item.id, 1)
                                }
                            >
                                {" "}
                                +{" "}
                            </button>

                            <button
                                className="add_to_cart_btn inventory_btns"
                                onClick={() =>
                                    this.props.handleAddToCart(item.id)
                                }
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className="inventory-pagination">
                    {this.state.currentPage > 0 ? (
                        <button
                            className="inv-prev-btn inventory_btns"
                            onClick={() => this.handlePageChange(-1)}
                        >
                            prev
                        </button>
                    ) : null}

                    <p id="page-label"> Page: {this.state.currentPage + 1}</p>

                    {this.state.currentPage <
                    Math.ceil(this.props.inventory.length / ITEMS_PER_PAGE) -
                        1 ? (
                        <button
                            className="inv-next-btn inventory_btns"
                            onClick={() => this.handlePageChange(1)}
                        >
                            next
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}