import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from './Header';
import { cleanRedux } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount = () => {
    this.sendToLocalStorage();
  }

  sendToLocalStorage = () => {
    const { email, scoreToDisplay, nameToRanking } = this.props;
    let ranking = [];
    if (localStorage.getItem('ranking') !== null) {
      ranking = JSON.parse(localStorage.getItem('ranking'));
    }
    const something = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${something}`;
    const person = {
      name: nameToRanking,
      score: scoreToDisplay,
      picture,
    };
    ranking.push(person);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  scoreboard = () => {
    const { assertionsToDisplay } = this.props;
    const three = 3;
    let message = '';
    if (assertionsToDisplay < three) {
      message = 'Could be better...';
    }
    if (assertionsToDisplay >= three) {
      message = 'Well Done!';
    }
    return message;
  };

  playAgain = () => {
    const { history, cleanReduxDispatch } = this.props;
    cleanReduxDispatch();
    history.push('/');
  }

  goRanking = () => {
    const { history, cleanReduxDispatch } = this.props;
    cleanReduxDispatch();
    history.push('/ranking');
  }

  render() {
    const { assertionsToDisplay, scoreToDisplay } = this.props;
    return (
      <div>
        <Header />
        <div className="final-score">
          <p data-testid="feedback-total-question">{assertionsToDisplay}</p>
          <p data-testid="feedback-total-score">{scoreToDisplay}</p>
        </div>
        <p
          className="feedback-txt"
          data-testid="feedback-text"
        >
          {this.scoreboard()}
        </p>
        <div>
          <button
            type="submit"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
        </div>
        <div>
          <button
            type="submit"
            data-testid="btn-ranking"
            onClick={ this.goRanking }
          >
            Ranking
          </button>
        </div>
      </div>

    );
  }
}

Feedback.propTypes = {
  assertionsToDisplay: PropTypes.number,
  scoreToDisplay: PropTypes.number,
  email: PropTypes.string,
  nameToRanking: PropTypes.string,
  cleanReduxDispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  cleanReduxDispatch: () => dispatch((cleanRedux())),
});

const mapStateToProps = (state) => ({
  assertionsToDisplay: state.player.assertions,
  scoreToDisplay: state.player.score,
  imgToRanking: state.player.gravatarEmail,
  nameToRanking: state.player.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
