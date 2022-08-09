import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAwaiting } from '../redux/actions';
import Header from './Header';
import '../styles/right-wrong.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      jokes: [],
      isLoading: true,
      index: 0,
      clicked: false,
    };
  }

  componentDidMount = () => {
    this.getJokes();
  }

  tokenValidation = (data) => {
    const { history } = this.props;
    const three = 3;
    if (data.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        jokes: data.results,
        isLoading: false,
      });
    }
  }

  getJokes = async () => {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    this.tokenValidation(data);
  }

  getColor = () => {
    this.setState({
      clicked: true,
    });
  }

  updateClass = (str, joke) => (str === joke.correct_answer ? 'right'
    : 'wrong')

  randomizer =(joke) => {
    const { clicked } = this.state;
    const unshuffled = [...joke.incorrect_answers, joke.correct_answer];
    const shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled.map((str, i) => (
      <div
        data-testid="answer-options"
        key={ str }
      >
        <button
          className={ clicked ? this.updateClass(str, joke) : '' }
          type="button"
          data-testid={ str === joke.correct_answer ? 'correct-answer'
            : `wrong-answer-${i}` }
          onClick={ (event) => (
            this.getColor(event)) }
        >
          {str}
        </button>
      </div>
    ));
  }

  displayJoke = (joke) => (
    <div
      key={ joke.question }
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
    </div>
  )

  whileLoop = (jokes) => {
    const { index } = this.state;
    return this.displayJoke(jokes[index]);
  }

  btnNext = () => {
    const { index } = this.state;
    this.setState({ index: index + 1})
  }

  render() {
    const { jokes, isLoading, clicked } = this.state;
    return (
      <div>
        <Header />
        {
          isLoading ? ''
            : this.whileLoop(jokes)
        }
        {
          !isLoading && clicked ? 
          <button
          data-testid='btn-next'
          onCLick={ this.btnNext }
          >
            Next
          </button>
          : ''
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLoading: () => dispatch(requestAwaiting()),
});

const mapStateToProps = (state) => ({
  jokes: state.user.jokes,
  code: state.user.code,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
