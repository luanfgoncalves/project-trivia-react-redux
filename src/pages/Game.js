import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAwaiting, scorePoints } from '../redux/actions';
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
      score: 0,
      assertions: 0,
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
        this.setState({ timeout: true, clicked: true });
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

  getColor = ({ target }, a) => {
    this.setState({
      clicked: true,
    });
    const { seconds, score, assertions } = this.state;
    const { scorePointsDispatch } = this.props;

    if (target.value === a.correct_answer) {
      const dez = 10;
      const tres = 3;
      if (a.difficulty === 'hard') {
        const soma = dez + (tres * seconds);
        this.setState((prevState) => (
          { score: prevState.score + soma, assertions: prevState.assertions + 1 }));
        const scoreA = score + soma;
        const assentionsA = assertions + 1;
        scorePointsDispatch({ scoreA, assentionsA });
      }
      if (a.difficulty === 'medium') {
        const soma = dez + (2 * seconds);
        this.setState((prevState) => (
          { score: prevState.score + soma, assertions: prevState.assertions + 1 }));
        const scoreA = score + soma;
        const assentionsA = assertions + 1;
        scorePointsDispatch({ scoreA, assentionsA });
      }
      if (a.difficulty === 'easy') {
        const soma = dez + seconds;
        this.setState((prevState) => (
          { score: prevState.score + soma, assertions: prevState.assertions + 1 }));
        const scoreA = score + soma;
        const assentionsA = assertions + 1;
        scorePointsDispatch({ scoreA, assentionsA });
      }
    }
  }

  updateClass = (str, joke) => (str === joke.correct_answer ? 'right'
    : 'wrong')

  randomizer = (joke) => {
    console.log(joke);
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
    const { history } = this.props;
    const quatro = 4;
    this.setState({
      index: index + 1, teste: true, clicked: false, seconds: 30, timeout: false });
    if (index === quatro) {
      history.push('/feedback');
    }
  }

  render() {
    const { jokes, isLoading, clicked, seconds,
      alternatives, index, timeout } = this.state;
    return (
      <div>
        <Header />
        { seconds }
        {
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
                this.getColor(event, jokes[index])) }
              disabled={ clicked || timeout }
              value={ str }
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
  scorePointsDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLoading: () => dispatch(requestAwaiting()),
  scorePointsDispatch: (payload) => dispatch(scorePoints(payload)),
});

const mapStateToProps = (state) => ({
  isLoading: state.player.isLoading,
  disabled: state.timerReducer.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
