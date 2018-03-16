import React, { Component } from 'react';
import Loadable from 'react-loadable';
import ContainerDimensions from 'react-container-dimensions';
import Loading from '../Loading';
import './style.css';

const HistoryChartAsync = Loadable({
  loader: () => import(/* webpackChunkName: "HistoryChart"*/ '../HistoryChart'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading: Loading
});

class Header extends Component {
  constructor() {
    super();
    this.state = { hasUpdated: false };
    this.flashOnUpdates = false;
    this.flashOnUpdatesTimeout = false;
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.props.store.subscribe(this.update);
    // only start flashing after 5 seconds
    this.flashOnUpdatesTimeout = setTimeout(() => {
      this.flashOnUpdates = true;
    }, 5000);
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.update);
    clearTimeout(this.flashOnUpdatesTimeout);
  }
  update(success, pricesUpdate) {
    // only flash when it's a prices update
    if (pricesUpdate && this.flashOnUpdates) {
      this.setState({ hasUpdated: true }, () => {
        setTimeout(() => {
          this.setState({ hasUpdated: false });
        }, 1000);
      });
    }
  }
  componentWillReceiveProps() {
    
  }
  render() {
    const store = this.props.store;
    return (
      <div className="CoinView">
        <div data-go-red={this.state.hasUpdated} className="currencyPanel">
          <div className="currencytitle">
            <h1>
              <img alt={this.props.name + ' logo'} src={this.props.logo} />{' '}
              <span>{this.props.name}</span>
            </h1>
          </div>
          <div className="currencyBody">
            <div className="currencyCurrentPrice">
              <h1 className="value">
                {this.props.currencySymbol}
                {this.props.price}
              </h1>
              <p className="title">{store.i18n.currentPrice}</p>
            </div>
            <div className="currencyHistoryChart">
              <div style={{ width: '100%', height: '100%' }}>
                <ContainerDimensions>
                  {({ width, height }) => (
                    <HistoryChartAsync
                      height={height - 20}
                      width={width - 10}
                      store={store}
                      currency={this.props.currency}
                      coinCode={this.props.coinCode}
                    />
                  )}
                </ContainerDimensions>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
