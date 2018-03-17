import React, { Component } from 'react';
import './style.css';

class StatsView extends Component {
  constructor(props) {
    super();
    this.state = {
      lastFiveRequests: [],
      apiLimits: { Hour: {}, Minute: {}, Second: {}}
    };
    this.i18n =  props.store.i18n 
  }
  componentDidMount() {
    const store = this.props.store;
    let updateCount = 0;
    this.updateInterval = setInterval(() => {
      this.processStats(updateCount++ % 60 === 0); // fetch api limits every ~60 seconds
    }, 950);
  }
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
  formatDuration(totalSeconds) {
    totalSeconds = Math.floor(totalSeconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    hours < 10 && (hours = '0' + hours);
    minutes < 10 && (minutes = '0' + minutes);
    seconds < 10 && (seconds = '0' + seconds);

    let output = '';
    hours !== '00' && (output += hours + ':');
    output += minutes + ':';
    output += seconds;

    return output;
  }
  async processStats(getApiLimits) {
    const stats = await this.props.store.getStats(getApiLimits);
    const requests = stats.requestHistory;
    const duration = this.formatDuration(stats.sessionDuration);

    let successfulCount = 0;
    let failedCount = 0;

    requests.forEach(r => (r.success ? successfulCount++ : failedCount++));

    let totalRequestCount = successfulCount + failedCount;

    const successRatio = `${successfulCount}/${totalRequestCount} (${Math.floor(
      successfulCount / totalRequestCount * 100
    )}% success)`;

    const lastFiveRequests = requests.slice(-5);
    const newState = {
      duration,
      successRatio,
      totalRequestCount,
      lastFiveRequests
    };
    if (getApiLimits) {
      newState.apiLimits = stats.apiLimits;
    }
    this.setState(newState);
  }
  stringifyCallsMade(callsMade) {
    if (!callsMade) return '';
    return `
      Histo: ${callsMade.Histo},
      Price: ${callsMade.Price},
      News: ${callsMade.News},
      Strict: ${callsMade.Strict}
      `;
  }
  render() {
    return (
      <div className="stats-view">
        <h1>
          <span role="img" aria-label="paper emoji">
            📝
          </span>{' '}
          {this.i18n.appStats}
        </h1>
        <div>
          <table>
            <tbody>
              <tr>
                <th>{this.i18n.metric}</th>
                <th>{this.i18n.value}</th>
              </tr>
              <tr>
                <td>{this.i18n.sessionDuration}</td>
                <td>{this.state.duration}</td>
              </tr>
              <tr>
                <td>{this.i18n.reqSuccessRatio}</td>
                <td>{this.state.successRatio}</td>
              </tr>
              <tr>
                <td>{this.i18n.totalReqCount}</td>
                <td>{this.state.totalRequestCount}</td>
              </tr>
            </tbody>
          </table>
          <h3>{this.i18n.lastFiveReqs}</h3>
          <table>
            <tbody>
              <tr>
                <th>
                  {this.i18n.URL}
                </th>
                <th>
                  {this.i18n.statusCode}
                </th>
              </tr>
              {this.state.lastFiveRequests.map(r => (
                <tr key={r.url + r.time}>
                  <td>{r.url}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>
          {this.i18n.APIlimits}
            <button
              className="update-now"
              title="Refresh now"
              onClick={() => this.processStats(true)}
            >
              🔄
            </button>
          </h4>
          <table>
            <tbody>
              <tr>
                <th>{this.i18n.period}</th>
                <th>{this.i18n.callsMade}</th>
                <th>{this.i18n.callsLeft}</th>
              </tr>
              <tr>
                <td>{this.i18n.hour}</td>
                <td>
                  {this.stringifyCallsMade(this.state.apiLimits.Hour.CallsMade)}
                </td>
                <td>
                  {this.stringifyCallsMade(this.state.apiLimits.Hour.CallsLeft)}
                </td>
              </tr>
              <tr>
                <td>{this.i18n.minute}</td>
                <td>
                  {this.stringifyCallsMade(
                    this.state.apiLimits.Minute.CallsMade
                  )}
                </td>
                <td>
                  {this.stringifyCallsMade(
                    this.state.apiLimits.Minute.CallsLeft
                  )}
                </td>
              </tr>
              <tr>
                <td>{this.i18n.second}</td>
                <td>
                  {this.stringifyCallsMade(
                    this.state.apiLimits.Second.CallsMade
                  )}
                </td>
                <td>
                  {this.stringifyCallsMade(
                    this.state.apiLimits.Second.CallsLeft
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StatsView;
