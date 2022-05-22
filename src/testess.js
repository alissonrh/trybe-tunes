/*   onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, this.enableBtn);
  }

 */

/*  onChange = async (album, isFavorete) => {
    const { didUpdate } = this.props;
    if (isFavorete) {
      this.setState({
        loading: true,
        isFavorete: false,
      });
      await removeSong(album);
      didUpdate();
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

  handleChangeFavorite = ({ target }, album, isFavorete) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, this.onChange(album, isFavorete));
  } */
