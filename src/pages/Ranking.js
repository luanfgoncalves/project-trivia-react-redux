import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanRedux } from '../redux/actions';

class Ranking extends React.Component {
    playAgain = () => {
      const { history, cleanReduxDispatch } = this.props;
      cleanReduxDispatch();
      history.push('/');
    }

    getFromLocalStorage = () => {
      const ranked = JSON.parse(localStorage.getItem('ranking'));
      ranked.sort((a, b) => b.score - a.score);
      return ranked.map((rank, index) => (
        <div
          key={ index }
          className="rank-person"
        >
          <img
            src={ rank.picture }
            alt={ rank.name }
          />
          <p data-testid={ `player-name-${index}` }>{ rank.name }</p>
          <p data-testid={ `player-score-${index}` }>{rank.score}</p>
        </div>
      ));
    }

    render() {
      return (
        <div>
          <h1
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <div>
            <button
              type="submit"
              data-testid="btn-go-home"
              onClick={ this.playAgain }
            >
              Play Again
            </button>
          </div>
          { this.getFromLocalStorage()}
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  cleanReduxDispatch: () => dispatch((cleanRedux())),
});

Ranking.propTypes = {
  cleanReduxDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  imgToRanking: state.player.gravatarEmail,
  scoreToDisplay: state.player.score,
  nameToRanking: state.player.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
