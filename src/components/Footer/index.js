import React, { Component } from 'react';

import { AuthUserContext, withAuthentication } from '../../utils/Session';

const FooterBase = () => (
  <div id='footer'>
    <p>WSU Tricities TRIO</p>
  </div>
)

const Footer = () => (
  <AuthUserContext.Consumer>
    { authUser =>
      authUser ? <FooterBase /> : null
    }
  </AuthUserContext.Consumer>
)

export default withAuthentication(Footer);



