import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

class HistoryChart extends Component {
  constructor() {
    super();
    this.state = { mode: '1h' };
  }
  normalizeData(data, mode) {
    const newData = [];
    data.forEach(datum => {
      const date = new Date(datum.time * 1000)
      newData.push({
        time: ['1h', '1d'].includes(mode) ? date.toLocaleTimeString() : date.toLocaleDateString(),
        value: datum.high
      });
    });
    return newData;
  }
  render() {
    const store = this.props.store;
    const chartData = this.normalizeData(
      store.availableData.historicalData[this.props.coinCode][this.state.mode][
        this.props.currency
      ], this.state.mode
    );
    return (
      <div>
        <AreaChart
          width={this.props.width}
          height={this.props.height}
          data={chartData}
        >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff9966" stopOpacity={1}/>
            <stop offset="95%" stopColor="#ff5e62" stopOpacity={0.9}/>
          </linearGradient>
        </defs>
          <XAxis dataKey="time" type="category" />
          <YAxis basevalue="auto" type="number" domain={[dataMin => (Number.parseFloat(dataMin) * 0.999).toFixed(5), dataMax => (Number.parseFloat(dataMax) * 1.001).toFixed(5)]} />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="url(#colorUv)" />
        </AreaChart>
        <div>
          <label>{store.i18n.selectPeriod}:&nbsp;
            <select onChange={ev => this.setState({mode: ev.target.value})}>
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
