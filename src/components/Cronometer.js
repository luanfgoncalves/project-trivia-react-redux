import React from 'react';
import { connect } from 'react-redux';
import { disableSwitch } from '../redux/actions';

class Cronometer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 5,
    };
  }

  // componentDidMount() {
  //   this.timer();
  // }

  // timer = () => {
  //   const um = 1;
  //   const one = 1000;
  //   let { seconds } = this.state;
  //   const { disableAnswer } = this.props;

  //   const interval = setInterval(() => {
  //     if (seconds >= um) {
  //       this.setState({ seconds: seconds -= 1 });
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, one);
  // }

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
