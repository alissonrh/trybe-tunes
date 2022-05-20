import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  state = {
    loading: false,
    redirect: false,
  }

  handleSubimit = async () => {
    const { inputName } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: `${inputName}` });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { isButtonDisable, inputName, enableBtn } = this.props;
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <div>
            <label htmlFor="inputName">
              Nome:
              <input
                data-testid="login-name-input"
                type="text"
                name="inputName"
                onChange={ enableBtn }
                value={ inputName }
              />
            </label>
          </div>
          <div>

            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isButtonDisable }
              onClick={ this.handleSubimit }
            >
              Entrar
            </button>
          </div>
        </form>
        { loading && <Loading />}
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  isButtonDisable: propTypes.bool.isRequired,
  inputName: propTypes.string.isRequired,
  enableBtn: propTypes.func.isRequired,
};
