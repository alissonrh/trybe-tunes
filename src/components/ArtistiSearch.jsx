import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default class ArtistiSearch extends React.Component {
  render() {
    const { element } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${element.collectionId}` }
          to={ `/album/${element.collectionId}` }
        >
          <p>{element.collectionName}</p>
        </Link>
      </div>

    );
  }
}

ArtistiSearch.propTypes = {
  element: propTypes.shape({
    collectionName: propTypes.string.isRequired,
    collectionId: propTypes.number.isRequired,
  }).isRequired,
};
