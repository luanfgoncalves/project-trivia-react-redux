import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value,
    }, () => { this.handleClick(); });
  }

  settingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div
        data-testid="login-div"
      >
        <form>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              placeholder="Name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsBtn }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
