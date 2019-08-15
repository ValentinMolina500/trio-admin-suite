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

class TutorTimes extends React.Component {
  render() {
    const { tutorTimes } = this.props;
    console.log(tutorTimes);
    Object.keys(tutorTimes).map(index => {
      console.log(index);
    })
    return (
      <div>
        {
          Object.keys(tutorTimes).map(key => {
            return (
              <FormGroup key={key}>
                <Label for={key}>Start Time</Label>
                <Input value={tutorTimes[key].startTime} onChange={this.props.onChange} type="text" name="startTime" id={key} placeholder="Start Time"></Input>
              </FormGroup>
            )
          })
        }
      </div>
    )
  }
}

export default TutorTimes;