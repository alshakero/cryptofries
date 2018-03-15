import React, { Component } from 'react';
import './style.css';

class ControlPanel extends Component {
  render() {
    const store = this.props.store;
    const currencies = Object.entries(store.availableData.currencySymbols);
    return (
      <div className="controlPanel">
        <div className="slogan">
          <h1>
            Welcome to
            <strong>
              <em> CryptoFries!</em>
            </strong>
          </h1>
          <p>
            Here you find the latest information <strong>Bitcoin</strong>,{' '}
            <strong>Ethereum</strong> and <strong>Ripple</strong>.
          </p>
        </div>
        <div className="currencyChoice">
          <p>Select your favorite currency</p>
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
