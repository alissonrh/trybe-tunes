import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

const TRES = 3;

class App extends React.Component {
  state = {
    inputName: '',
    isButtonDisable: true,
  }

  enableBtn = () => {
    const { inputName } = this.state;
    const allIsTrue = [
      inputName.length < TRES,
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
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              { ...this.state }
              enableBtn={ this.onInputChange }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
