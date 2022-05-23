import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    user: '',
  }

  async componentDidMount() {
    const userObj = await getUser();
    this.setState({
      user: userObj,
    });
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        {user === '' ? <Loading /> : (
          <div>
            <p>{user.name}</p>
            <img data-testid="profile-image" src={ user.image } alt="foto da pessoa" />
            <p>
              {user.description}
            </p>
            <p>{user.email}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}

      </div>
    );
  }
}
