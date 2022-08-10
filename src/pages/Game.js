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
      seconds: 30,
      timeout: false,
      alternatives: [],
      teste: true,
    };
  }

  componentDidMount = () => {
    this.getJokes();

    this.timer();
  }

  componentDidUpdate() {
    this.stopTimer();

    const { index, jokes, teste } = this.state;
    if (teste === true) {
      this.randomizer(jokes[index]);
    }
  }

  timer = () => {
    const one = 1000;
    setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      } else {
        this.setState({ timeout: true });
      }
    }, one);
  }

  stopTimer = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.timer);
    }
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

  randomizer = (joke) => {
    const unshuffled = [...joke.incorrect_answers, joke.correct_answer];
    const shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    this.setState({ alternatives: shuffled, teste: false });
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
    </div>
  )

  whileLoop = (jokes) => {
    const { index } = this.state;
    return this.displayJoke(jokes[index]);
  }

  btnNext = () => {
    const { index } = this.state;
    this.setState({ index: index + 1, teste: true, clicked: false });
  }

  render() {
    const { jokes, isLoading, clicked, seconds,
      alternatives, index, timeout } = this.state;
    return (
      <div>
        <Header />
        { seconds }
        {
          // PROBLEMA AQUI :
          isLoading ? ''
            : this.whileLoop(jokes)
        }
        {alternatives.map((str) => (
          <div
            data-testid="answer-options"
            key={ str }
          >
            <button
              className={ clicked ? this.updateClass(str, jokes[index]) : '' }
              type="button"
              data-testid={ str === jokes[index].correct_answer ? 'correct-answer'
                : `wrong-answer-${index}` }
              onClick={ (event) => (
                this.getColor(event)) }
              disabled={ timeout }
            >
              {str}
            </button>
          </div>
        ))}
        {
          !isLoading && clicked
            ? (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.btnNext }
              >
                Next
              </button>)
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
  disabled: state.timerReducer.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
