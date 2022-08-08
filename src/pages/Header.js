import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.getGravatar();
  }

  getGravatar = () => {
    const { email } = this.props;
    this.setState({ hash: md5(email).toString() });
  }

  render() {
    const { name } = this.props;
    const { hash } = this.state;
    return (
      <div>
        <p data-testid="header-player-name">{name}</p>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagem de perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">0.00</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.login,
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
