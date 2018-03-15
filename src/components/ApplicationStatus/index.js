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
    const lastUpdated = new Date(store.availableData.timestamp);
    const connectionStatus = store.availableData.connected;
    return (
      <div className="applicationStatus">
        <span className="indictor" title="Connection status">
          {connectionStatus ? (
            <span>
              {' '}
              <span aria-label="connected" role="img">
                🔵
              </span>{' '}
              Status: connected
            </span>
          ) : (
            <span>
              <span aria-label="disconnected" role="img">
                🔴
              </span>{' '}
              Status: disconnected
            </span>
          )}
        </span>
        <span className="indictor" title="Last updated">
          <span role="img" aria-label="Clock symbol">
            🕒
          </span>{' '}
          Last updated: {lastUpdated.toLocaleDateString()}{' '}
          {lastUpdated.toLocaleTimeString()}
        </span>
      </div>
    );
  }
}

export default ApplicationStatus;
