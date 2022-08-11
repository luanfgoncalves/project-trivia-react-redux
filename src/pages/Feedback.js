import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
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
    const { history } = this.props;
    history.push('/');
  }

  goRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertionsToDisplay, scoreToDisplay } = this.props;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-question">{assertionsToDisplay}</p>
          <p data-testid="feedback-total-score">{scoreToDisplay}</p>
        </div>
        <p data-testid="feedback-text">{this.scoreboard()}</p>
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
  assertionsToDisplay: PropTypes.number.isRequired,
  scoreToDisplay: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertionsToDisplay: state.player.assertions,
  scoreToDisplay: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
