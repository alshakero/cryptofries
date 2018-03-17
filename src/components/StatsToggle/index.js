import React, { Component } from 'react';
import './style.css';

class StatsToggle extends Component {
  constructor() {
    super();
    this.state = { page: 'firstPage' };
  }
  componentDidMount() {
    let page;
    if(window.location.hash === "#stats") {
      page = "secondPage";
    } else {
      page = "firstPage";
    }
    this.setState({ page });
  }
  navigate(page) {
    const pageName = page === 'firstPage'? "Cryptofries" : "Cryprofries - Stats";
    const pageHash = page === 'firstPage'? "#" : "#stats";
    window.history.pushState(undefined, pageName, pageHash);
    window.onpopstate();
    this.setState({ page });
  }
  render() {
    const i18n = this.props.store.i18n;
    return (
      <div className="stats-toggle">
        {this.state.page === 'firstPage' ? (
          <button className="stats" title={i18n.viewStats} onClick={() => this.navigate('secondPage')}>
            <span role="img" aria-label={i18n.viewStats}>📝</span>
          </button>
        ) : (
          <button title={i18n.back} className="Back" onClick={() => this.navigate('firstPage')}>
            ◄
          </button>
        )}
      </div>
    );
  }
}

export default StatsToggle;
