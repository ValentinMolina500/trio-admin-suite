import React, { Component } from 'react';
import * as ROUTES from '../../../constants/routes';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../utils/firebase';

class Settings extends Component {
  signOut = () => {
    this.props.firebase.doSignOut()
      .then(() => {
      })
  }
  render() {
    return (
      <div>
        <h2 className='title-text'>Settings</h2>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    )
  }
}

export default withFirebase(Settings);