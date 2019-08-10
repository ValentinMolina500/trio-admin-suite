import React, { Component } from 'react';
import TRIO_LOGO from '../../images/TRIO-Logo.png';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../utils/firebase/context';


const INITIAL_STATE = {
  email: '',
  password: '',
}
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  login = () => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='component-div'>
        <div className='input-container'>
          <img id='trio-logo' className='m-b-32' src={TRIO_LOGO}></img>  
          <p className='admin-text m-b-16'>TRIO Admin Suite</p>
          <input type='text' 
            name='email' 
            value={this.state.email} 
            className='input m-b-16'
            onChange={this.handleChange}>  
            </input>
          <input 
            type='password' 
            name='password' 
            value={this.state.password}
            className='input m-b-8'
            onChange={this.handleChange}>
            </input> 
        </div>

        <div className='bottom-container'>
          <button onClick={this.login} className='login-button m-t-16'>Login</button>
        </div>

    </div>
    )
  }
}

const LoginBase = compose(
  withRouter,
  withFirebase
)(Login);

export default LoginBase;