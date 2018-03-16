import i18n from '../i18n';

const localStorageVersion = 'v1';

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
  historicalData: {},
  news: []
};

export default class DataStore {
  constructor() {
    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
    this.updateInterval = setInterval(this.fetchData, 60 * 1000);
    this.subscribers = new Set();
    if (localStorage.getItem('data-cache-v' + localStorageVersion)) {
      this.availableData = JSON.parse(localStorage.getItem('data-cache-v' + localStorageVersion));
    } else {
      this.availableData = defaultData;
    }
    setTimeout(this.fetchNews.bind(this), 100); // fetch news lazily
  }

  async getHistoricalData(coin, period, currency) {
    if (!this.availableData.historicalData[coin]) {
      this.availableData.historicalData[coin] = {};
    }
    if (!this.availableData.historicalData[coin][period]) {
      this.availableData.historicalData[coin][period] = {};
    }
    if (!this.availableData.historicalData[coin][period][currency]) {
      const data = await this.fetchHistoricalData(period, coin, currency);
      this.availableData.historicalData[coin][period][currency] = data;
    }
    return this.availableData.historicalData[coin][period][currency];
  }

  get i18n() {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, name) {
          return i18n[self.availableData.language][name];
        }
      }
    );
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

  async fetchHistoricalData(mode, coin, currency) {
    const url = this.constructAPIUrl(mode, coin, currency);
    try {
      const response = await fetch(url);
      const rawData = await response.json();
      const data = rawData.Data;
      this.dispatchUpdate(true, true);
      return data;
    } catch (e) {
      this.dispatchUpdate(false);
      return [];
    }
  }
  async fetchNews() {
    try {
      const res = await fetch(
        'https://min-api.cryptocompare.com/data/news/?lang=EN'
      );
      const news = await res.json();
      this.availableData.news = news;
      // get the current preferences of providers into a hash
      const savedProviders = (this.availableData.providers || []).reduce(
        (hash, p) => {
          hash[p.name] = p.checked;
          return hash;
        },
        {}
      );
      // reset the data
      this.availableData.providers = [
        ...new Set(news.map(el => el.source_info.name)) // UNIQ
      ];
      // combine the old results with the new ones
      this.availableData.providers = this.availableData.providers.map(el => {
        const oldAnswer =
          typeof savedProviders[el] === 'boolean' ? savedProviders[el] : true;
        return { name: el, checked: oldAnswer };
      });
      this.dispatchUpdate(true);
    } catch (e) {
      this.dispatchUpdate(false);
    }
  }
  notifyProvidersUpdate() {
    this.dispatchUpdate(true);
  }
  getNews() {
    return this.availableData.news.filter(n =>
      this.availableData.providers.find(
        p => p.name === n.source_info.name && p.checked
      )
    );
  }

  changeCurrency(newCurrency, mode = '1h') {
    this.availableData.currency = newCurrency;
    this.availableData.currencySymbol = this.availableData.currencySymbols[
      newCurrency
    ];

    Promise.all([
      this.getHistoricalData(mode, 'BTC', this.availableData.currency),
      this.getHistoricalData(mode, 'ETH', this.availableData.currency),
      this.getHistoricalData(mode, 'XRP', this.availableData.currency)
    ]).then(() => {
      this.dispatchUpdate(true, true);
    });
  }

  changeLanguage(newLanguage = this.availableData.language) {
    this.availableData.language = newLanguage;
    this.dispatchUpdate(true);
    if (newLanguage === 'EN') {
      document.documentElement.className = '';
    } else {
      document.documentElement.className = 'arabic';
    }
  }

  storeData() {
    localStorage.setItem('data-cache-v' + localStorageVersion, JSON.stringify(this.availableData));
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

  dispatchUpdate(success, pricesUpdate) {
    const detail = {
      isConnected: success,
      data: this.availableData,
      timestamp: this.availableData.timestamp
    };
    this.availableData.connected = success;
    if (success) {
      this.storeData();
    }
    this.subscribers.forEach(cb => cb(detail, pricesUpdate));
  }
  async fetchData() {
    try {
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,GBP,JPY,CNY'
      );
      if (response.status === 200) {
        const data = await response.json();
        this.normalizeData(data);
        this.dispatchUpdate(true, true);
      }
    } catch (e) {
      this.dispatchUpdate(false);
    }
  }
}
