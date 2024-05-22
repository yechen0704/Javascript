
import React, { Component } from 'react'

export default class PureComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        nextState ??= {};
        nextProps ??= {};
        this.state ??= {};
        this.props ??= {};

        const stateEqual = Object.keys(nextState).every((key) => nextState[key] === this.state[key]);
        const propsEqual = Object.keys(nextProps).every((key) => nextProps[key] === this.props[key]);

        return !(stateEqual && propsEqual);
    }
  render() {
    return (
      <div>
        <h1>Pure Component Logic</h1>
      </div>
    )
  }
}