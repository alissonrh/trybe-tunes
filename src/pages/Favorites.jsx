import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = {
    favoritesMusic: [],
  }

  async componentDidMount() {
    const favoritosSongs = await getFavoriteSongs();
    this.setState({
      favoritesMusic: favoritosSongs,
    });
  }

   didUpdate = async () => {
     console.log('didUpdate');
     const favoritosSongsATT = await getFavoriteSongs();
     this.setState({
       favoritesMusic: favoritosSongsATT,
     });
   }

   render() {
     const { favoritesMusic } = this.state;
     return (
       <div data-testid="page-favorites">
         <Header />
         {favoritesMusic.length > 0 ? (
           <>
             {favoritesMusic.filter((e) => e.trackId)
               .map((e) => (<MusicCard
                 key={ e.trackId }
                 album={ e }
                 didUpdate={ this.didUpdate }
               />))}
           </>) : <p>Não há musicas favoritadas</p> }

       </div>
     );
   }
}
