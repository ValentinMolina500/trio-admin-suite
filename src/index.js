import React from 'react';
import ReactDOM from 'react-dom';
import indexRoutes from './routes/index.jsx';
import { Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import SignInForm from './views/Landing/Landing';
import './assets/scss/style.css';
import Firebase, { FirebaseContext } from './components/Firebase';
import { withAuthentication } from './components/Session';


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <HashRouter>
  
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={withAuthentication(prop.component)} />;
      })}
    </Switch>
  
  </HashRouter> 
=
  
  </FirebaseContext.Provider>
  ,document.getElementById('root')); 


