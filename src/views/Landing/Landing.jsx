import React from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardGroup,
  CardDeck,
  CardLink,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthentication, AuthUserContext } from '../../components/Session';


import img1 from '../../assets/images/trioLogo.png'

const INITIAL_STATE = {
  email: 'valentin.molina@wsu.edu',
  password: 'Mario509',
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      isOpen: false,
      width: window.innerWidth
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/dashboard')
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  }
  render() {
    const { email, password } = this.state

    return (
      <div>
        <Row>
          <Col></Col>
          <Col>
            <Card className="card">
              <CardImg className="m-4 signupimage align-self-center" top src={img1} />
              <CardBody>
                <CardTitle className="text-center">Admin Login to TRIO Services</CardTitle>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input value={email} onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input value={password} onChange={this.onChange} type="password" name="password" id="examplePassword" placeholder="Password" />
                  </FormGroup>

                  <Button color="success" type="submit">Login</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </div>
    )

  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignIn);

export default SignInForm;


{/* <div
    id="main-wrapper"
    data-theme="light"
    data-layout="vertical"
  >
    <div className="page-wrapper d-block">
      <div className="page-content container-fluid">
        <p>Hey!</p>
      </div>
    </div>
  </div> */}