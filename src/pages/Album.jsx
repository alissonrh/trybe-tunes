import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    album: [],
  }

  async componentDidMount() {
    const { match: {
      params: { id } } } = this.props;
    const albumObj = await getMusics(id);
    this.setState({
      album: albumObj,
    });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {console.log(album)}
        {album.length > 0 && (
          <>
            <h3 data-testid="artist-name">{album[0].artistName}</h3>
            <h4 data-testid="album-name">{album[0].collectionName}</h4>
            {album.filter((e) => e.trackName)
              .map((e) => <MusicCard key={ e.trackName } album={ e } />)}
          </>) }
        {/*  <h3 data-testid="artist-name">{`${album[0].artistName}`}</h3>
          <h4 data-testid="album-name">{`${album[0].collectionName}`}</h4> */}
      </div>

    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};
