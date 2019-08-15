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

class PostEditPage extends React.Component {
  constructor(props) {
    super(props);

    if(props.location.state == null)
    {
      this.props.history.push('/posts');
    }

    this.state = {
      oldPostData: { ...this.props.location.state },
      newPostData: { ...this.props.location.state }
    }
  }

  onChange = event => {
    this.setState({ newPostData: {
      ...this.state.newPostData,
      [event.target.name]: event.target.value
    }})
  }

  onEditSubmit = () => {
    this.props.firebase.doUpdatePost(this.state.newPostData)
      .then(() => {
        console.log('done!');
        this.props.history.push('/posts');
      })
  }

  onUndoChanges = () => {
    this.setState({ newPostData: {
    ...this.state.oldPostData
      }});
  }

  onDeletePost = () => {
    this.props.firebase.doDeletePost(this.state.newPostData)
      .then(() => this.props.history.push('/posts'));
  }
  onCancel = () => {
    this.props.history.goBack();
  }

  render() {
    const { title, link, type, image, postId } = this.state.newPostData;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Edit Post</CardTitle>
              <CardSubtitle>ID #{postId}</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block">
              <Button color="primary" onClick={this.onUndoChanges}><span className="mdi mdi-refresh"> </span>Undo Changes</Button>
            </div>
          </div>
          <CardText>

          <Row>
            <Col xs="12" md="4">
              <Label for="title">Title</Label>
              <Input name="title" type="text" onChange={this.onChange} value={title}></Input>
            </Col> 
            <Col xs="12" md="4">
              <Label for="link">Link <span className="mdi mdi-link"></span></Label>
              <Input name="link" type="text" onChange={this.onChange} value={link}></Input>
            </Col>
            <Col xs="12" md="4">
              <Label for="type">Type</Label>
              <Input name="type" type="text" onChange={this.onChange} value={type}></Input>
            </Col>
            
          </Row>
          </CardText>
            <Button className="m-10" color="success" onClick={this.onEditSubmit}><span className="mdi mdi-content-save"></span> Save Changes</Button>
            <Button color="danger" className="margin-left"onClick={this.onCancel}><span className="mdi mdi-close-circle"></span> Cancel</Button>
            <Button color="danger" className="align-button-right"onClick={this.onDeletePost}><span className="mdi mdi-delete"></span> Delete</Button>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(withFirebase(PostEditPage));