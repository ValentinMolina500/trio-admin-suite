import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Tooltip,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormText
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';

import { withAuthorization, AuthUserContext } from '../../components/Session';
import { withRouter } from 'react-router-dom';
import { WSU_MAJORS } from '../../constants/majors';
import { defaultProfile } from '../../assets/images/users/1.png';

const dogImg = "https://upload.wikimedia.org/wikipedia/commons/2/26/Rottweiler_standing_facing_left.jpg"

const MODAL_INITIAL_STATE = {
  firstName: '',
  lastName: '',
  wsuId: '',
  major: '',
  year: '',
  email: '',
  password: ''
}

class Events extends React.Component {
  constructor(props) {
    super(props);

    
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      users: [],
      modal: false,
      modalState: {
        ...MODAL_INITIAL_STATE
      },
      majors: WSU_MAJORS,
      isOperationComplete: false
    };
    console.log(this.state);
  }

  componentDidMount() {
    this.props.firebase.queryUsers()
      .then(snapshot => {
        let userArray = [];
        snapshot.forEach(doc => {
          userArray.push(doc.val());
        })

        this.setState({ users: userArray });
      })
  }

  toggle() {
    this.setState({ modalState: {...MODAL_INITIAL_STATE}})
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onUserClick = event => {
    //console.log(this.state.users[event.target.id]);
    this.props.history.push({
      pathname: '/userinfo',
      state: { ...this.state.users[event.target.id], }
    })
  }

  onChange = event => {
    this.setState({ modalState: {
      ...this.state.modalState,
      [event.target.name]: event.target.value
    }})
  }

  doAddUser = () => {
    this.props.firebase.doAddUser(this.state.modalState)
      .then(() => {
        console.dir(this.state.modalState);
        this.state.users.unshift(this.state.modalState);
        this.setState({ users: this.state.users});
        this.toggle();
      })
  }

  renderMajors = major => {
    return (
      <Input value={major} type="select" onChange={this.onChange} name="major"id="majors">
        <option>{this.state.majors[0]}</option>
        <option>{this.state.majors[1]}</option>
        <option>{this.state.majors[2]}</option>
        <option>{this.state.majors[3]}</option>
        <option>{this.state.majors[4]}</option>
        <option>{this.state.majors[5]}</option>
        <option>{this.state.majors[6]}</option>
        <option>{this.state.majors[7]}</option>
        <option>{this.state.majors[8]}</option>
        <option>{this.state.majors[9]}</option>
        <option>{this.state.majors[10]}</option>
        <option>{this.state.majors[11]}</option>
        <option>{this.state.majors[12]}</option>
        <option>{this.state.majors[13]}</option>
        <option>{this.state.majors[14]}</option>
        <option>{this.state.majors[15]}</option>
        <option>{this.state.majors[16]}</option>
        <option>{this.state.majors[17]}</option>
        <option>{this.state.majors[18]}</option>
        <option>{this.state.majors[19]}</option>
        <option>{this.state.majors[20]}</option>
        <option>{this.state.majors[21]}</option>
        <option>{this.state.majors[22]}</option>
        <option>{this.state.majors[23]}</option>
        <option>{this.state.majors[24]}</option>
      </Input>
    )
  }


  render() {
    const { email, firstName, lastName, wsuId, year, major, password } = this.state.modalState;
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Current Students in TRIO</CardTitle>
              <CardSubtitle>Updated Today</CardSubtitle>
            </div>
            <div className="ml-auto d-flec no-block align-items-center">
              <div className="dl">
                <Input type="select" className="custom-select">
                  <option value="0">Recent</option>
                  <option value="1">Ordered A-Z</option>
                  <option value="2">Ordered Z-A</option>
                </Input>
              </div>
            </div>
          </div>
          <div className="ml-auto d-flec no-block">
            <Button onClick={this.toggle} color="primary"><span className="mdi mdi-plus-circle"></span> Add User</Button>
          </div>


          {/* MODAL LOGIC */}
      
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add a Student to TRIO</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input value={firstName} onChange={this.onChange} type="text" name="firstName" id="first-name" placeholder="First Name"></Input>
                  <Label for="last-name">Last Name</Label>
                  <Input value={lastName} onChange={this.onChange} type="text" name="lastName" id="last-name" placeholder="Last Name"></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="majors">Major</Label>
                  {this.renderMajors(major)}
                </FormGroup>
                <FormGroup>
                  <Label for="wsuId">WSU Id</Label>
                  <Input value={wsuId} onChange={this.onChange} type="text" name="wsuId" id="wsuId" placeholder="WSU Id"></Input>
                  <Label for="email">WSU Email</Label>
                  <Input value={email} onChange={this.onChange} type="text" name="email" id="email" placeholder="WSU Email"></Input>
                  <Label for="password">Temporary Password</Label>
                  <Input value={password} onChange={this.onChange} type="text" name="password" id="password" placeholder="Password"></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.doAddUser}><span className="mdi mdi-account-plus"> Add</span></Button>
              <Button color="danger" onClick={this.toggle}><span className="mdi mdi-close-circle"></span> Cancel</Button>
            </ModalFooter>
          </Modal>
          
  

          {/*  TABLE RENDER*/}

          <Table className="no-wrap v-middle" responsive>
            <thead>                               
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">WSU ID</th>
                <th className="border-0">Major</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => {
                return (
                    <tr id={index} className="hoverElement pointer" onClick={this.onUserClick} key={user.id}>
                      <td id={index}>
                        <div id={index} className="d-flex no-block align-items-center">
                          <div id={index} className="mr-2"><img src={dogImg} alt="User" id={index} className="rounded-circle" width="60" height="55"/></div>
                          <div id={index} className="">
                            <h5 id={index} className="mb-0 font-16 font-medium">{user.firstName + ' ' + user.lastName}</h5><span id={index}>Undergraduate</span></div>
                        </div>
                      </td>
                      <td id={index}>{user.email}</td>
                      <td id={index}>
                        <div id={index}>
                          {user.wsuId}
                      </div>
                      </td>
                      <td id={index}>
                        <div id={index}>
                          {user.major}
                      </div>
                      </td>
                    </tr> 

                );
              })} 
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

const condition = authUser => !!authUser;

export default withRouter(withFirebase(Events));