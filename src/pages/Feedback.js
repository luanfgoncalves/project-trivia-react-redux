import React from 'react';
import Header from './Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          feedbacks
        </h1>
      </div>
    );
  }
}

export default Feedback;
