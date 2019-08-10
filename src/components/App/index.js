import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

import Navigation from '../Navigation';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Settings from '../Dashboard/Settings';
import SideBar from '../Sidebar';
import Footer from '../Footer';

import { withAuthentication, AuthUserContext } from '../../utils/Session';

const App = () => (
      <div id='App'>
        <Router>  
          <Navigation />
          <SideBar />
          <AuthUserContext.Consumer>
            {
              authUser => 
                authUser ? 
                <Switch>
                  <div className='main-content'>
                    <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                    <Route path={ROUTES.SETTINGS} component={Settings} />
                    <Redirect to={ROUTES.DASHBOARD} />
                  </div>
                  
                </Switch> :
                <Switch>
                  <Route exact path={ROUTES.LOGIN} component={Login} />
                  <Redirect to={ROUTES.LOGIN} />
                </Switch>
            }
            
          </AuthUserContext.Consumer>
          <Footer />
        </Router>
      </div>
  ) 
  




export default withAuthentication(App);
