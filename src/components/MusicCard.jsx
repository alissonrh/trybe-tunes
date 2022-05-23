import React from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isFavorete: false,
    loading: false,
  }

  async componentDidMount() {
    console.log(('monte'));
    this.setState({
      loading: true,
    });
    const { album } = this.props;
    const favoritosSongs = await getFavoriteSongs();
    this.setState({
      isFavorete: favoritosSongs.some((e) => e.trackId === album.trackId),
      loading: false,
    });
  }

  handleChangeFavorite = async (album, isFavorete) => {
    const { didUpdate } = this.props;
    if (isFavorete) {
      this.setState({
        loading: true,
        isFavorete: false,
      });
      await removeSong(album);
      await didUpdate();
      this.setState({
        loading: false,
      });
    }
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
            <label htmlFor="isFavorete">
              Favorita
              <input
                id="isFavorete"
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
  didUpdate: propTypes.func,
};

MusicCard.defaultProps = {
  didUpdate: () => {},
};
