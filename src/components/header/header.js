import React, {  } from 'react';
import GameStateContext, { GAME_STATE_ACTION_TYPE } from '../../contexts/gameState';
import './header.css';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.timer = null;
  }

  componentDidMount () {
    this.timer = setInterval(this.onTimer, 1000);
  }

  componentWillUnmount () {
    if (this.timer)
      clearInterval(this.timer);
  }

  onTimer = () => {
    if (this.context[0].timeLeft > 0) {
      this.context[1]({
        type: GAME_STATE_ACTION_TYPE.TIMER,
      });
    }
    else {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  resetMatch = () => {
    this.context[1]({
      type: GAME_STATE_ACTION_TYPE.MATCH_RESET,
    });

    if (this.timer)
      clearInterval(this.timer);
    this.timer = setInterval(this.onTimer, 1000);
  };

  phrase = () => {
    const min = Math.floor(this.context[0].timeLeft / 60);
    const sec = this.context[0].timeLeft % 60;
    return `${Math.floor(min/10)}${min%10}:${Math.floor(sec/10)}${sec%10}`;
  };

  ResetButton(hide) {
    return (
      <button
        onClick={this.resetMatch}
        className={`header-status__reset-btn ${ hide ? 'hidden' : '' } `}
      >
        Reset
      </button>
    );
  }

  render() {
    return (
      <div className="header-status">
        {this.ResetButton(true)} <span className="header-timer">{this.phrase()}</span> {this.ResetButton(false)}
      </div>
    );
  }
};

Header.contextType = GameStateContext;

export default Header;
