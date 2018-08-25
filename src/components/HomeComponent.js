import React, { Component } from 'react';
import {
  Card, CardText, CardTitle, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleReport = this.handleReport.bind(this);
    this.toggleReportModal = this.toggleReportModal.bind(this);

    this.state = {
      isReportModalOpen: false
    }
  }

  toggleReportModal() {
    this.setState({ isReportModalOpen: !this.state.isReportModalOpen });
  }

  handleReport(event) {
    this.toggleReportModal();
    alert("Profile reported");
    event.preventDefault();
  }

  render() {
    return (
      <div className="container" >

        <div className="row align-items-center">
          <div className="col-12 col-md m-1">
            <Button onClick={this.toggleReportModal}>
              <Card body inverse color="danger">
                <CardTitle>Report a missing child</CardTitle>
                <CardText>If you think your child may be missing,
                  please provide us with as much information as you can so
                  we can help you find your child as soon as possible
              </CardText>
              </Card>
            </Button>
          </div>
          <div className="col-12 col-md m-1">
            <Button>
              <Card body inverse color="success">
                <CardTitle>Report a sighting/tip</CardTitle>
                <CardText>If you think you may have spotted a missing child,
                  please provide us with any information you have to help us reunite
                  missing children with their families.
              </CardText>
              </Card>
            </Button>
          </div>
        </div>

        <Modal isOpen={this.state.isReportModalOpen} toggle={this.toggleReportModal}>
          <ModalHeader toggle={this.toggleReportModal}>Report a missing child</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleReport}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name"
                  innerRef={(input) => this.name = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="age">Age</Label>
                <Input type="text" id="age" name="age"
                  innerRef={(input) => this.age = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="height">Height</Label>
                <Input type="text" id="height" name="heigth"
                  innerRef={(input) => this.heigth = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastSeenLocation">Last seen location</Label>
                <Input type="text" id="lastSeenLocation" name="lastSeenLocation"
                  innerRef={(input) => this.lastSeenLocation = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastSeenTime">Last seen time</Label>
                <Input type="text" id="lastSeenTime" name="lastSeenTime"
                  innerRef={(input) => this.lastSeenTime = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="other">Other info</Label>
                <div className="col-12">
                  <textarea id="other" name="other" rows={6}
                    innerRef={(input) => this.other = input} />

                </div>
              </FormGroup>

              <Button type="submit" value="submit" color="primary">submit</Button>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

export default Home;