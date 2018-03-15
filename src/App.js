import React, { Component } from 'react';
import Header from './components/Header';
import CoinView from './components/CoinView';
import ControlPanel from './components/ControlPanel';
import BTCLogo from './art/bitcoin-logo.svg';
import EtherumLogo from './art/ethereum-logo.svg';
import RippleLogo from './art/ripple-logo.svg';
import DataStore from './dataStore';
import ApplicationStatus from './components/ApplicationStatus';

import './App.css';

const store = new DataStore();

class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  render() {
    const data = store.availableData;
    return (
      <div className="App">
        <Header />
        <ControlPanel store={store} />
        <div className="appBody">
          <ApplicationStatus store={store} />
          <CoinView
            coinCode="BTC"
            store={store}
            logo={BTCLogo}
            currencySymbol={data.currencySymbol}
            currency={data.currency}
            price={data.prices[data.currency].BTC}
            name="Bitcoin"
          />
          <CoinView
            coinCode="ETH"
            store={store}
            currencySymbol={data.currencySymbol}
            currency={data.currency}
            logo={EtherumLogo}
            price={data.prices[data.currency].ETH}
            name="Etherum"
          />
          <CoinView
            coinCode="XRP"
            store={store}
            currencySymbol={data.currencySymbol}
            currency={data.currency}
            logo={RippleLogo}
            price={data.prices[data.currency].XRP}
            name="Ripple"
          />
        </div>
      </div>
    );
  }
}

export default App;
