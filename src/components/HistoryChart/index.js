import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis } from 'recharts';
class HistoryChart extends Component {
  constructor() {
    super();
    this.state = { mode: '1h', chartData: [] };
  }
  normalizeData(data, mode) {
    const newData = [];
    data.forEach(datum => {
      const date = new Date(datum.time * 1000);
      newData.push({
        time: ['1h', '1d'].includes(mode)
          ? date.toLocaleTimeString()
          : date.toLocaleDateString(),
        value: datum.high
      });
    });
    return newData;
  }
  componentWillMount() {
    this.updatePrices();
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.chartData === nextState.chartData) {
      this.updatePrices(nextState.mode);
    }
  }
  async updatePrices(mode) {
    const coinCode = this.props.coinCode;
    const currency = this.props.currency;
    const data = await this.props.store.getHistoricalData(
      coinCode,
      mode,
      currency
    );
    const chartData = this.normalizeData(data, mode);
    this.setState({ chartData });
  }
  render() {
    const store = this.props.store;

    return (
      <div>
        <AreaChart
          width={this.props.width}
          height={this.props.height}
          data={this.state.chartData}
        >
          <XAxis dataKey="time" type="category" />
          <YAxis
            basevalue="auto"
            type="number"
            domain={[
              dataMin => (Number.parseFloat(dataMin) * 0.999).toFixed(5),
              dataMax => (Number.parseFloat(dataMax) * 1.001).toFixed(5)
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="url(#colorUv)"
          />
        </AreaChart>
        <div>
          <label>
            {store.i18n.selectPeriod}:&nbsp;
            <select onChange={ev => this.updatePrices(ev.target.value)}>
              <option value="1h">1h</option>
              <option value="1d">1d</option>
              <option value="1w">1w</option>
              <option value="1m">1m</option>
              <option value="1y">1y</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default HistoryChart;
