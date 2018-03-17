import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CoinView from './components/CoinView';
import ControlPanel from './components/ControlPanel';
import BTCLogo from './art/bitcoin-logo.svg';
import EtherumLogo from './art/ethereum-logo.svg';
import RippleLogo from './art/ripple-logo.svg';
import DataStore from './dataStore';
import ApplicationStatus from './components/ApplicationStatus';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import StatsView from './components/StatsView';

import './App.css';

const NewsWidgetAsync = Loadable({
  loader: () =>
    import(/* webpackChunkName: "NewsWidget"*/ './components/NewsWidget'),
  render(loaded, props) {
    let NewsWidget = loaded.default;
    return <NewsWidget {...props} />;
  },
  loading: Loading
});

const store = new DataStore();

class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
    store.changeLanguage();

    /* this gotta be the cutest React router ever */
    window.onpopstate = function (event) {
      if(window.location.hash === "#stats") {
        document.body.className = "secondPage";
      } else {
        document.body.className = "firstPage";
      }
    }
    // don't animate moving to the second page, this is a first visit
    document.body.setAttribute('dont-transition', '');
    
    // the event has already passed by mounting time, simulate another one
    window.onpopstate ();

    // ok feel free to animate now
    setTimeout(() => document.body.removeAttribute('dont-transition'));
  }

  render() {
    const data = store.availableData;
    return (
      <div className="App">
        <Header store={store} />
        <ControlPanel welcome={store.i18n.welcome} store={store} />
        <div className="appBody">
          <div className="carousel">
            <div className="leftfold">
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
              <NewsWidgetAsync store={store} />
            </div>
            <div className="rightFold">
              <StatsView store={store} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
