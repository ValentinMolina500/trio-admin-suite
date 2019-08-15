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
  Input,
  Table,
  Label,
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';
import dogImg from "../../assets/images/person.jpg"

class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);

    if(props.location.state == null)
    {
      this.props.history.push('/users');
    }

    this.state = {
      userData: { ...this.props.location.state }
    }
  }

  render() {
    const { email, firstName, lastName, major, wsuId } = this.state.userData
    return (
      <div>
        <h1>{firstName + ' ' + lastName}</h1>
        <Card>
          <CardBody>

          
          <Row>
            <Col xs="12" md="4">
            <img src={dogImg} className="user-info-image"></img>
            </Col>
            <Col xs="12" md="4">
              
            </Col>
            <Col xs="12" md="4"></Col>
          </Row>
          <Button className="m-10" color="danger">Delete Student</Button>
          </CardBody>
  
        </Card>
      </div>
      
    )
  }
}

export default withRouter(withFirebase(UserInfoPage));