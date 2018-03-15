/**
 * This is the initial state of the app, it has all the default values
 */
const defaultData = {
  language: 'EN',
  timestamp: 1521130644536, // development time
  languages: ['EN', 'AR'],
  currency: 'USD',
  connected: false,
  currencySymbol: '$',
  currencySymbols: {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '元',
    CNY: '¥'
  },
  prices: {
    CNY: { BTC: 53441.8, ETH: 3964.31, XRP: 4.39 },
    EUR: { BTC: 6584.15, ETH: 487.87, XRP: 0.5414 },
    GBP: { BTC: 5870.5, ETH: 435.47, XRP: 0.4822 },
    JPY: { BTC: 875391.78, ETH: 64541.2, XRP: 72 },
    USD: { BTC: 8090.31, ETH: 598.94, XRP: 0.6639 }
  },
  historicalData: {
    BTC: {
      '1h': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1d': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1w': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1m': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1y': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      }
    },
    ETH: {
      '1h': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1d': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1w': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1m': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1y': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      }
    },
    XRP: {
      '1h': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1d': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1w': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1m': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      },
      '1y': {
        CNY: [],
        EUR: [],
        GBP: [],
        JPY: [],
        USD: []
      }
    }
  }
};

export default class DataStore {
  constructor() {
    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
    this.updateInterval = setInterval(this.fetchData, 60 * 1000);
    this.subscribers = new Set();
    if (localStorage.getItem('data-cache')) {
      this.availableData = JSON.parse(localStorage.getItem('data-cache'));
    } else {
      this.availableData = defaultData;
    }
  }

  constructAPIUrl(mode, coin, currency) {
    let url;
    switch (mode) {
      case '1h':
        url = `https://min-api.cryptocompare.com/data/histominute?fsym=${coin}&tsym=${currency}&limit=10&aggregate=6`;
        break;
      case '1d':
        url = `https://min-api.cryptocompare.com/data/histohour?fsym=${coin}&tsym=${currency}&limit=23`;
        break;
      case '1w':
        url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=${currency}&limit=6`;
        break;
      case '1m':
        url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=${currency}&limit=10&aggregate=3`;
        break;
      case '1y':
        url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=${currency}&limit=11&aggregate=30`;
        break;
    }
    return url;
  }

  async getHistoricalData(mode, coin, currency) {
    const url = this.constructAPIUrl(mode, coin, currency);
    try {
      const response = await fetch(url);
      const rawData = await response.json();
      const data = rawData.Data;
      this.availableData.historicalData[coin][mode][currency] = data;
    } catch (e) {
      this.dispatchUpdate(false);
    }
  }

  changeCurrency(newCurrency) {
    this.availableData.currency = newCurrency;
    this.availableData.currencySymbol = this.availableData.currencySymbols[
      newCurrency
    ];
    this.dispatchUpdate(true);

    Promise.all([
      this.getHistoricalData('1h', 'BTC', this.availableData.currency),
      this.getHistoricalData('1h', 'ETH', this.availableData.currency),
      this.getHistoricalData('1h', 'XRP', this.availableData.currency)
    ]);
  }

  changeLanguage(newLanguage) {
    this.availableData.language = newLanguage;
    this.dispatchUpdate(true);
  }

  normalizeData(prices) {
    const normalizedData = { ...this.availableData, timestamp: Date.now() };
    const pricesObj = {};
    for (const coin in prices) {
      for (const [currency, price] of Object.entries(prices[coin])) {
        if (!pricesObj[currency]) {
          pricesObj[currency] = {};
        }
        pricesObj[currency][coin] = price;
      }
    }
    normalizedData.prices = pricesObj;
    this.availableData = normalizedData;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  dispatchUpdate(success) {
    const detail = {
      isConnected: success,
      data: this.availableData,
      timestamp: Date.now()
    };
    this.availableData.connected = success;
    this.subscribers.forEach(cb => cb(detail));
    if (success) {
      localStorage.setItem('data-cache', JSON.stringify(this.availableData));
    }
  }
  fetchAllHistoricalData() {
    [ '1h', '1d', '1w', '1m', '1y'].forEach(period => {
        [ 'BTC', 'ETH', 'XRP'].forEach(coin => {
            this.getHistoricalData(period, coin, this.availableData.currency);
        })
    })
  }
  async fetchData() {
    try {
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,GBP,JPY,CNY'
      );
      if (response.status === 200) {
        const data = await response.json();
        this.normalizeData(data);
        this.dispatchUpdate(true);
      }
    } catch (e) {
      this.dispatchUpdate(false);
    }
    this.fetchAllHistoricalData();
  }
}
