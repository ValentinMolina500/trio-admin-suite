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
  Label
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  title: '',
  link: '',
  type: 'News',
}

class AddNewPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postState: {
        ...INITIAL_STATE
      }
    }

    this.imageUploadRef = React.createRef();
  }

  onChange = event => {
      this.setState({
        postState: {
          ...this.state.postState,
          [event.target.name]: event.target.value
        }
      })

  }
  onCancel = () => {
    this.props.history.goBack();
  }

  onAddNewPost = () => {
    try {
      this.props.firebase.doAddNewPost(this.state.postState)
      .then(() => this.props.history.goBack())
    }
    catch(error) {
      console.log(error);
    }
  }

  onImageChange = () => {
    //console.log(this.imageUploadRef.current.files[0].name.split('.').pop());
    this.setState({
      postState: {
        ...this.state.postState,
        image: this.imageUploadRef.current.files[0]
      }
    })
  }

  render() {
    const { title, link, type } = this.state.postState;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Add New Post</CardTitle>
            </div>
          </div>
          <CardText>
            <Row>
              <Col xs="12" md="4">
                <Label for="title">Title</Label>
                <Input value={title} onChange={this.onChange} name="title" type="text"></Input>
              </Col>
              <Col xs="12" md="4">
                <Label for="link">Link <span className="mdi mdi-link"></span></Label>
                <Input value={link} onChange={this.onChange} name="link" type="text"></Input>
              </Col>
              <Col xs="12" md="4">
                <Label for="type">Type <span className="mdi mdi-link"></span></Label>
                <Input value={type} onChange={this.onChange} name="type" type="select">
                  <option>News</option>
                  <option>Events</option>
                </Input>
              </Col>
              <Col xs="12" md="4">
                <Label for="image">Upload Image <span className="mdi"></span></Label>
                <input ref={this.imageUploadRef} onChange={this.onImageChange} name="file" type="file"></input>
              </Col>
            </Row>
          </CardText>
          <Button className="m-10" onClick={this.onAddNewPost} color="success"><span className="mdi mdi-plus-circle" /> Add</Button>
          <Button color="danger" className="margin-left" onClick={this.onCancel}><span className="mdi mdi-close-circle"></span> Cancel</Button>
        </CardBody>
      </Card>

    )
  }
}

export default withFirebase(AddNewPostPage);