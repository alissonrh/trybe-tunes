import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isFavorete: false,
    loading: false,
  }

  handleChangeFavorite = async (album, isFavorete) => {
    if (isFavorete === false) {
      this.setState({
        isFavorete: true,
        loading: true,
      });
      await addSong(album);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isFavorete, loading } = this.state;
    const { album } = this.props;
    return (

      <div>
        { loading ? <Loading /> : (
          <>
            <p>{album.trackName}</p>
            <audio data-testid="audio-component" src={ album.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="forovita">
              Favorita
              <input
                name="favorita"
                data-testid={ `checkbox-music-${album.trackId}` }
                type="checkbox"
                onChange={ () => this.handleChangeFavorite(album, isFavorete) }
                checked={ isFavorete }
              />
            </label>

          </>
        ) }

      </div>
    );
  }
}

MusicCard.propTypes = {
  album: propTypes.shape({
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
    trackId: propTypes.number.isRequired,
  }).isRequired,
};
