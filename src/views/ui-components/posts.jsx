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
  Col
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import trioLogo from '../../assets/images/trioLog_old.png'
import { withRouter } from 'react-router-dom';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.props.firebase.queryPosts()
      .then(snapshot => {
        let postArray = [];

        snapshot.forEach(post => {
          postArray.push(post.data());
        });

        this.setState({ posts: postArray });
      })
  }

  onPostEdit = event => {
    console.log(this.state.posts[event.target.id]);
    this.props.history.push({
      pathname: '/edit',
      state: {...this.state.posts[event.target.id]}
    })
  }

  onNewPostClick = () => {
    this.props.history.push('/addnewpost');
  }

  render() {
    return (
      <div>
        <h5 className="mb-3">Current Active Posts</h5>
        <Button className="marginBottom" color="primary" onClick={this.onNewPostClick}><span className="mdi mdi-plus-circle"/> Add New Post</Button>


        <Row>
          {this.state.posts.map((post, index) => {
            return (
              <Col xs="12" md="4">
                <Card>
                  <CardImg className="card-img" top width="100%" src={post.image || trioLogo} />
                  <CardBody>
                    <CardTitle>{post.title}</CardTitle>
                    <CardSubtitle>{post.type || post.from}</CardSubtitle>
                    <CardText><span className="mdi mdi-eye"></span> {post.views || 0}</CardText>
                    <CardText><span className="mdi mdi-heart"></span> {post.likes || 0}</CardText>
                    <CardText>Posted {post.time || 'N/A'} ago</CardText>
                    {post.link && <CardText><a href={post.link} target="_blank">Active Link</a></CardText>} 
                    {!post.link && <CardText><p>No Link</p></CardText>}
                    <Button id={index} onClick={this.onPostEdit}>Edit</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    )
  }
}

export default withRouter(withFirebase(Posts));

{/* <Col xs="12" md="4">
  <Card>
    <CardImg top width="100%" src={dogImg} />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
      <Button>Button</Button>
    </CardBody>
  </Card>
</Col> */}