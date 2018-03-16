import React, { Component } from 'react';
import './style.css';

class ApplicationStatus extends Component {
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
    const lastUpdated = new Date(store.availableData.timestamp);
    const connectionStatus = store.availableData.connected;
    return (
      <div className="applicationStatus">
        <span className="indictor" title={i18n.connectionStatus}>
          {connectionStatus ? (
            <span>
              {' '}
              <span aria-label={i18n.connected} role="img">
                🔵
              </span>{' '}
              {i18n.connectionStatus}: {i18n.connected}
            </span>
          ) : (
            <span>
              <span aria-label={i18n.disconnected} role="img">
                🔴
              </span>{' '}
              {i18n.connectionStatus}: {i18n.disconnected}
            </span>
          )}
        </span>
        <span className="indictor" title={i18n.lastUpdated}>
          <span role="img" aria-label="Clock symbol">
            🕒
          </span>{' '}
          {i18n.lastUpdated}: {lastUpdated.toLocaleDateString()}{' '}
          {lastUpdated.toLocaleTimeString()}
        </span>
      </div>
    );
  }
}

export default ApplicationStatus;
