import React, { Component } from 'react';
import './style.css';
import NewsItem from '../NewsItem';

class NewsWidget extends Component {
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
  toggleProviderChecked(target, providers) {
    providers.find(p => p.name === target.getAttribute('data-name')).checked =
      target.checked;
    this.props.store.notifyProvidersUpdate();
  }
  render() {
    const providers = this.props.store.availableData.providers || [];
    const news = this.props.store.getNews(providers);
    return (
      <div className="newsWidget">
        <div className="newsWidgetHead">
          <div>
            <h2>
              <span role="img" aria-label="news paper">
                📰
              </span>{' '}
              {this.props.store.i18n.news}
            </h2>
          </div>
          <div className="providersFilters">
            <a>From providers: </a>
            {providers.map(p => (
              <label key={p.name}>
                <input
                  type="checkbox"
                  checked={p.checked}
                  data-name={p.name}
                  onChange={e =>
                    this.toggleProviderChecked(e.target, providers)
                  }
                  name={p.name}
                />{' '}
                {p.name}
              </label>
            ))}
          </div>
        </div>
        {news.map(el => <NewsItem key={el.id} {...el} />)}
      </div>
    );
  }
}

export default NewsWidget;
