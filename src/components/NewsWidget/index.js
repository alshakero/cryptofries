import React, { Component } from 'react';
import './style.css';
import NewsItem from '../NewsItem';

class NewsWidget extends Component {
  render() {
    const news = this.props.store.availableData.news;

    return (
      <div className="newsWidget">
        <div className="newsWidgetHead">
          <h2>
            <span role="img" aria-label="news paper">
              📰
            </span>{' '}
            {this.props.store.i18n.news}
          </h2>
        </div>
        {news.map(el => <NewsItem key={el.id} {...el} />)}
      </div>
    );
  }
}

export default NewsWidget;
