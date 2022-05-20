import React from 'react';
import Header from '../components/Header';
/* import getMusics from '../services/musicsAPI'; */

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}
