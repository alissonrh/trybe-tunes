import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    isButtonDisable: true,
    inputName: '',
  }

  enableBtn = () => {
    const { inputName } = this.state;
    const allIsTrue = [
      inputName.length < 2,
    ];

    const isTrue = allIsTrue.every((e) => e === true);
    this.setState(({
      isButtonDisable: isTrue,
    }));
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.enableBtn);
  }

  render() {
    const { inputName, isButtonDisable } = this.state;
    console.log(searchAlbumsAPI(inputName));
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="inputName">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Buscar Artista"
              name="inputName"
              onChange={ this.onInputChange }
              value={ inputName }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisable }
            onClick={ () => searchAlbumsAPI(inputName) }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
