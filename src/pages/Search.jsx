import React from 'react';
import Header from '../components/Header';
import ArtistiSearch from '../components/ArtistiSearch';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    isButtonDisable: true,
    inputName: '',
    artist: [],
    artistName: '',
    notFoudMessage: '',
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

  searchArtist = async () => {
    const { inputName } = this.state;
    const artistObj = await searchAlbumsAPI(inputName);
    if (artistObj.length === 0) {
      this.setState({
        notFoudMessage: 'Nenhum álbum foi encontrado',
      });
    }
    this.setState({
      artist: artistObj,
      inputName: '',
      artistName: inputName,
    });
  }

  render() {
    const { inputName, isButtonDisable, artist, artistName, notFoudMessage } = this.state;
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
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
        </form>
        <div>
          { artist.length >= 1 ? (
            <p>
              {`Resultado de álbuns de: ${artistName}`}
            </p>
          ) : (<p>{notFoudMessage}</p>) }
          {artist.map((e) => <ArtistiSearch key={ e.collectionId } element={ e } />)}
        </div>
      </div>
    );
  }
}
