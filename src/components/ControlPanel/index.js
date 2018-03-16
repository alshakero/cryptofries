import React, { Component } from 'react';
import './style.css';

class ControlPanel extends Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.props.store.subscribe(this.update);
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.update);
  }
  update() {
    this.forceUpdate();
  }
  render() {
    const store = this.props.store;
    const i18n = store.i18n;
    const currencies = Object.entries(store.availableData.currencySymbols);
    return (
      <div className="controlPanel">
        <div className="slogan">
          <h1>{i18n.welcome}</h1>
          <p>{i18n.slogan}</p>
        </div>
        <div className="currencyChoice">
          <p>{i18n.selectCurrency}</p>
          {currencies.map(sym => (
            <button
              key={sym[0]}
              data-selected={store.availableData.currency === sym[0]}
              onClick={() => store.changeCurrency(sym[0])}
            >
              {sym[1]}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ControlPanel;
