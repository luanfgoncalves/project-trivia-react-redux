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

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          feedbacks
        </h1>
        <p
          data-testid="feedback-text"
        >
          <p>{this.scoreboard()}</p>
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertionsToDisplay: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertionsToDisplay: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
