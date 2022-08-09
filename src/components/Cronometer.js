import React from 'react';
import { connect } from 'react-redux';
import { disableSwitch } from '../redux/actions';

class Cronometer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 2,
    };
  }

  componentDidMount() {
    const one = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, one);
  }

  componentDidUpdate() {
    this.resetTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  resetTime = () => {
    const { seconds } = this.state;
    const TIME_LIMIT = -1;

    if (seconds === TIME_LIMIT) {
      this.setState({ seconds: 0 });
    }
  }

  render() {
    const { seconds } = this.state;

    return (
      <h2>{seconds}</h2>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: () => dispatch(disableSwitch()),
});

export default connect(null, mapDispatchToProps)(Cronometer);
