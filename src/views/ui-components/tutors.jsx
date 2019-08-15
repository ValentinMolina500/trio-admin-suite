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

import TutorTimes from './tutor-times';

import { withFirebase } from '../../components/Firebase';

import { withAuthorization, AuthUserContext } from '../../components/Session';
import { withRouter } from 'react-router-dom';

const dogImg = "https://upload.wikimedia.org/wikipedia/commons/2/26/Rottweiler_standing_facing_left.jpg"

const MODAL_INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tutorTimes: {}
}


class TutorPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      modal: false,
      modalState: {
        ...MODAL_INITIAL_STATE
      },
      tutors: [],
      error: null
    }
  }

  componentDidMount() {
    this.props.firebase.queryTutors()
      .then(snapshot => {
        let tutors = [];

        snapshot.forEach(doc => {
          tutors.push(doc.val())
        })

        this.setState({ tutors: tutors });
      })

  }
  onChange = event => {
    this.setState({ modalState: {
      ...this.state.modalState,
      [event.target.name]: event.target.value
    }})
  }

  onTutorTimeChange = event => {
    this.state.modalState.tutorTimes[event.target.id][event.target.name] = event.target.value;
    this.setState({ modalState: {
      ...this.state.modalState,
      tutorTimes: this.state.modalState.tutorTimes
    }})
  }

  toggle() {
    this.setState({ modalState: {...MODAL_INITIAL_STATE}})
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  doAddTutor = () => {
    const { firstName, lastName, email, password } = this.state.modalState;

    if(!firstName || !lastName || !email || !password) {
      let error = 'Please fill all required fields';
      this.setState({ ...this.state, error })
      return; 
    }
    this.props.firebase.doAddTutor(this.state.modalState)
      .then(() => {
        this.state.tutors.unshift(this.state.modalState);
        this.setState({ tutors: this.state.tutors });
        this.toggle();
      })
  }

  doAddTutorTime = () => {
    let time = {
      startTime: '',
      endTime: '',
    }
    let timestamp = (new Date()).getTime();
    this.state.modalState.tutorTimes['time-' + timestamp] = time;
    
    this.setState({ modalState: {
      ...this.state.modalState,
      tutorTimes: this.state.modalState.tutorTimes
    }})
  }

  render() {
    const { email, password, firstName, lastName } = this.state.modalState;
  
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Current Tutors in TRIO</CardTitle>
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
            <Button onClick={this.toggle}color="primary"><span className="mdi mdi-plus-circle"></span> Add Tutor</Button>
          </div>


          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add a Tutor to TRIO</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input value={firstName} onChange={this.onChange} type="text" name="firstName" id="first-name" placeholder="First Name"></Input>
                  <Label for="last-name">Last Name</Label>
                  <Input value={lastName} onChange={this.onChange} type="text" name="lastName" id="last-name" placeholder="Last Name"></Input>
                </FormGroup>
        
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input value={email} onChange={this.onChange} type="text" name="email" id="email" placeholder="Email"></Input>
                  <Label for="password">Temporary Password</Label>
                  <Input value={password} onChange={this.onChange} type="text" name="password" id="password" placeholder="Password"></Input>
                </FormGroup>
    
                <TutorTimes tutorTimes={this.state.modalState.tutorTimes} onChange={this.onTutorTimeChange}/>

                <FormGroup>
                  <Button onClick={this.doAddTutorTime}>Add Tutor Time</Button>
                </FormGroup>
                {this.state.error && <p className='error'>{this.state.error}!</p>}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.doAddTutor}><span className="mdi mdi-account-plus"> Add</span></Button>
              <Button color="danger" onClick={this.toggle}><span className="mdi mdi-close-circle"></span> Cancel</Button>
            </ModalFooter>
          </Modal>


          <Table className="no-wrap v-middle" responsive>
            <thead>                               
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tutors.map((user, index) => {
                return (
                  <tr id={index} className="hoverElement pointer" onClick={this.onUserClick} key={user.id}>
                      <td id={index}>
                        <div id={index} className="d-flex no-block align-items-center">
                          <div id={index} className="mr-2"><img src={dogImg  } alt="User" className="rounded-circle" width="60" height="55" /></div>
                          <div id={index} className="">
                            <h5 id={index} className="mb-0 font-16 font-medium">{user.firstName + ' ' + user.lastName}</h5><span>Undergraduate</span></div>
                        </div>
                      </td>
                      <td id={index}>{user.email}</td>
                    </tr> 
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

export default withFirebase(TutorPage);