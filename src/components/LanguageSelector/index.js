import React, { Component } from 'react';
import './style.css';
import UKFlag from '../../art/uk.svg';
import IraqFlag from '../../art/iraq.svg';

class LanguageSelector extends Component {
  render() {
    return (
      <div className="language-selector">
        <input
          value="🇬🇧"
          onClick={() => this.props.store.changeLanguage('EN')}
          name="lang"
          type="image" alt="UK flag (English)" src={UKFlag}
        />
        <input
          value="🇮🇶"
          onClick={() => this.props.store.changeLanguage('AR')}
          name="lang"
          type="image" alt="Iraqi flag (Arabic)" src={IraqFlag}
        />
      </div>
    );
  }
}

export default LanguageSelector;
