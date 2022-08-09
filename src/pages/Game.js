import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestToken, requestAwaiting } from '../redux/actions';

class Game extends React.Component {
  componentDidMount = () => {
    const { jokes, isLoading, returnJokes, history } = this.props;
    const token = localStorage.getItem('token');
    returnJokes(token);
    console.log('funcionando');
    if (jokes.length === 0 && isLoading) {
      console.log('funcionando2?');
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  randomizer =(joke) => {
    const unshuffled = [...joke.incorrect_answers, joke.correct_answer];
    const shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled.map((str, index) => (
      <div
        data-testid="answer-options"
        key={ str }
      >
        <button
          type="button"
          data-testid={ str === joke.correct_answer ? 'correct-answer'
            : `wrong-answer-${index}` }
        >
          {str}
        </button>
      </div>
    ));
  }

  render() {
    const { jokes } = this.props;
    return (
      <div>
        {jokes.map((joke, index) => (

          <div
            key={ index }
          >
            <h3
              data-testid="question-text"
            >
              {joke.question}

            </h3>
            <p
              data-testid="question-category"
            >
              {joke.category}
            </p>
            {
              this.randomizer(joke)
            }
          </div>))}
      </div>
    );
  }
}
// :
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  returnJokes: PropTypes.func.isRequired,
  jokes: PropTypes.arrayOf.isRequired,
  code: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnJokes: (token) => dispatch(requestToken(token)),
  returnLoading: () => dispatch(requestAwaiting),
});

const mapStateToProps = (state) => ({
  jokes: state.user.jokes,
  code: state.user.code,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
