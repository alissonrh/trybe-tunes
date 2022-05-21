import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  state = {
    usuarioState: {},
    loading: false,
  }

  async componentDidMount() {
    const usuario = await getUser();
    console.log(usuario);
    this.setState({
      usuarioState: usuario,
      loading: true,
    });
  }

  render() {
    const { usuarioState, loading } = this.state;
    return (
      <>
        {!loading && <Loading />}
        <header data-testid="header-component">
          <span data-testid="header-user-name">{usuarioState.name}</span>
          <nav>
            <div>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </div>
            <div>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos
              </Link>
            </div>
            <div>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </div>
          </nav>
        </header>

      </>
    );
  }
}
