import React, { Component } from 'react';
import './style.css';

const failedImage =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 100 100' version='1.1' viewBox='0 0 100 100' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;%7D .st1%7Bfill:%23B3B3B3;%7D .st2%7Bfont-family:'MyriadPro-Regular';%7D .st3%7Bfont-size:17px;%7D%0A%3C/style%3E%3Crect class='st0' x='8.5' y='17.5' width='86.5' height='74.5'/%3E%3Ctext transform='translate%288.5142 29.584%29'%3E%3Ctspan class='st1 st2 st3' x='0' y='0'%3ECOULDN’T %3C/tspan%3E%3Ctspan class='st1 st2 st3' x='0' y='20.4'%3ELOAD %3C/tspan%3E%3Ctspan class='st1 st2 st3' x='0' y='40.8'%3EIMAGE%3C/tspan%3E%3C/text%3E%3C/svg%3E%0A";

class NewsItem extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      imgsrc:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    };
    this.registerForIntersionObserver = this.registerForIntersionObserver.bind(
      this
    );
    this.intersectionObserver = new IntersectionObserver(
      this.intersecionHandler.bind(this)
    );
  }
  intersecionHandler(entries) {
    if (entries[0].isIntersecting) {
      this.setState({ visible: true });

      // load image here before setting it to the img tag, this allows us to sure we don't set image while offline
      const image = new Image();
      image.onload = () => {
        this.setState({ imgsrc: this.props.imageurl, loaded: true });
      };
      image.onerror = () => {
        this.setState({ imgsrc: failedImage, loaded: true });
      };
      image.src = this.props.imageurl;
      // we need it once
      this.intersectionObserver.unobserve(this.img);
      this.intersectionObserver.disconnect();
    }
  }
  registerForIntersionObserver(img) {
    if (!img) return;
    this.intersectionObserver.observe(img);
    this.img = img;
  }
  formatDate(d) {
    return new Date(d * 1000).toLocaleString();
  }
  render() {
    return (
      <a
        href={this.props.url}
        rel="noopener noreferrer"
        target="_blank"
        className="newsItem"
      >
        <img
          ref={this.registerForIntersionObserver}
          alt={this.props.title}
          className={this.state.loaded ? 'loaded' : 'loading'}
          data-loaded={this.state.loaded}
          src={this.state.imgsrc}
        />
        <h4 className="title">{this.props.title}</h4>
        <div className="details">
          <time>
            <span role="img" aria-label="clock">
              🕒{' '}
            </span>
            {this.formatDate(this.props.published_on)}
          </time>
          <p>
            {' '}
            <span role="img" aria-label="world">
              🌐{' '}
            </span>
            {this.props.source}
          </p>
        </div>
      </a>
    );
  }
}

export default NewsItem;
