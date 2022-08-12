import React from 'react';
import '../styles/login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
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
        <figure>
          <img src={ logo } className="App-logo" alt="logo" />
        </figure>
        <div
          className="login_form_div"
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
            <div
              className="btns_form"
            >
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
            </div>
          </form>
        </div>

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
    push: PropTypes.func,
  }),
  returnAPI: PropTypes.func,
  returnLoading: PropTypes.func,
  saveInfo: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  isLoading: state.player.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
