import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  // preciso pro o name= igual a estado
  state = {
    usuarioState: '',
    isDisable: true,
    inputName: '',
    inputEmail: '',
    inputImage: '',
    inputDescription: '',
    redirect: false,
    loading: false,
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({
      usuarioState: usuario,
      inputName: usuario.name,
      inputEmail: usuario.email,
      inputImage: usuario.image,
      inputDescription: usuario.description,
    });
    this.enableBtn();
  }

  handleSubimit = async () => {
    const { inputName, inputEmail, inputImage, inputDescription } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({
      name: `${inputName}`,
      email: `${inputEmail}`,
      image: `${inputImage}`,
      description: `${inputDescription}`,
    });
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  enableBtn = () => {
    const { inputName, inputEmail, inputImage, inputDescription } = this.state;
    /* console.log(inputEmail.includes('@'), inputName !== '', inputEmail !== '',
      inputImage !== '', inputDescription !== ''); */
    if (
      inputName !== ''
      && inputEmail !== ''
      && inputEmail.includes('@')
      && inputImage !== ''
      && inputDescription !== ''
    ) {
      return this.setState({
        isDisable: false,
      });
    }
    return this.setState({
      isDisable: true,
    });
  }

  onInputChange = ({ target }) => {
    console.log(target.name, target.value);
    this.setState({
      [target.name]: target.value,
    }, this.enableBtn);
  }

  render() {
    const { inputName, inputEmail, inputImage,
      inputDescription,
      isDisable,
      usuarioState, redirect, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {usuarioState === '' ? <Loading /> : (
          <form>
            <div>
              {' '}
              Nome:
              <input
                type="text"
                data-testid="edit-input-name"
                name="inputName"
                value={ inputName }
                onChange={ this.onInputChange }
              />
            </div>
            <div>
              Email:
              <input
                type="email"
                data-testid="edit-input-email"
                name="inputEmail"
                value={ inputEmail }
                onChange={ this.onInputChange }
              />
            </div>
            <div>
              Descrição:
              <textarea
                name="inputDescription"
                data-testid="edit-input-description"
                value={ inputDescription }
                onChange={ this.onInputChange }
              />
            </div>
            <div>
              Imagem:
              <input
                type="text"
                name="inputImage"
                value={ inputImage }
                data-testid="edit-input-image"
                onChange={ this.onInputChange }
              />
            </div>
            <button
              type="button"
              disabled={ isDisable }
              data-testid="edit-button-save"
              onClick={ this.handleSubimit }
            >
              Salvar
            </button>
          </form>
        )}
        {loading && <Loading />}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
