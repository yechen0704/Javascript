import React, { Component } from "react";

export default class DoubleSelect extends Component {
  state = {
    selectedCategory: "",
    selectedItem: "",
  };

  findUniqueCategories = (items) => {
    let categ = {};
    items.map((item) => {
      if (Object.keys(categ).includes(item.category)) {
        categ[item.category] = [...categ[item.category], item.name];
      } else {
        categ[item.category] = [];
      }
    });

    return Object.keys(categ);
  };

  handleChangeCategory = (event) => {
    const selectedCategory = event.target.value;
    const itemsInCategory = this.props.items.filter(
      (item) => item.category === selectedCategory
    );
    this.setState({
      selectedCategory: selectedCategory,
      selectedItem: itemsInCategory[0].name,
    });
  };

  handleChangeItem = (event) => {
    this.setState({ selectedItem: event.target.value });
  };

  render() {
    const { items } = this.props;
    const categories = this.findUniqueCategories(items);
    const itemsInCategory = items.filter(
      (item) => item.category === this.state.selectedCategory
    );

    return (
      <div>
        <h1>{this.state.selectedItem}</h1>
        <div className="container">
          <div className="container-item">
            <span>category</span>
            <select
              value={this.state.selectedCategory}
              onChange={this.handleChangeCategory}
            >
              {categories.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
          </div>
          <div className="container-item">
            <span>item</span>
            <select
              value={this.state.selectedItem}
              onChange={this.handleChangeItem}
            >
              {itemsInCategory.map((item, index) => {
                return (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
