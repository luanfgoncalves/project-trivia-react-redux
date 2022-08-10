import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPI, requestAwaiting, saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
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

  requestAPI = async (e) => {
    e.preventDefault();
    const { saveInfo, returnLoading, returnAPI, history } = this.props;
    returnLoading();
    const { email, name } = this.state;
    saveInfo({ email, name });
    const triviaAPI = await returnAPI();
    localStorage.setItem('token', triviaAPI.token);
    history.push('/game');
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
            onClick={ (e) => { this.requestAPI(e); } }
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

const mapDispatchToProps = (dispatch) => ({
  returnAPI: () => dispatch(requestAPI()),
  returnLoading: () => dispatch(requestAwaiting()),
  saveInfo: (payload) => dispatch(saveEmail(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  returnAPI: PropTypes.func.isRequired,
  returnLoading: PropTypes.func.isRequired,
  saveInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.player.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
