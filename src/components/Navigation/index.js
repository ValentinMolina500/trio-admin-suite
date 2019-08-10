import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthentication } from '../../utils/Session';

const NavigationBase = () => (
  <div id='action-bar'>
    <ul>
      {/* <Link to={ROUTES.LOGIN}>Landing</Link> */}
    </ul>
  </div>  
)

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? <NavigationBase /> : null  
      }
    </AuthUserContext.Consumer>
  </div>
)

export default withAuthentication(Navigation);