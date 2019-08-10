import React, { Component } from 'react';

import SidebarLink from './SidebarLink';
import { withAuthentication, AuthUserContext } from '../../utils/Session';
import PATHS from '../../constants/sidebarlinks';

const SidebarBase = () => (
  <div>
    <div id='side-bar'>
      {PATHS.map((props, index) => <SidebarLink key={index} {...props} />)}
    </div>
  </div>
)

const Sidebar = () => (
  <AuthUserContext.Consumer>
    {
      authUser => 
        authUser ? <SidebarBase /> : null
    }
  </AuthUserContext.Consumer>
)
export default withAuthentication(Sidebar);