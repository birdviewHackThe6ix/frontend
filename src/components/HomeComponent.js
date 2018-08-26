import React, { Component } from 'react';
import {
  Card, CardText, CardTitle, Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';

import { baseUrl } from '../shared/baseUrl';
import { potentialMatchUrl } from '../shared/potentialMatchUrl';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleReport = this.handleReport.bind(this);
    this.toggleReportModal = this.toggleReportModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handlePotentialMatchChange = this.handlePotentialMatchChange.bind(this);
    this.togglePotentialMatchModal = this.togglePotentialMatchModal.bind(this);
    this.handlePotentialMatchSubmit = this.handlePotentialMatchSubmit.bind(this);

    this.state = {
      isReportModalOpen: false,
      imageFile: null,
      name: '',
      age: '',
      height: '',
      lastSeenLocation: '',
      lastSeenTime: '',
      other: '',

      isPotentialMatchOpen: false,
      potentialMatchFile: null
    }
  }

  toggleReportModal() {
    this.setState({ isReportModalOpen: !this.state.isReportModalOpen });
  }

  togglePotentialMatchModal() {
    this.setState({ isPotentialMatchOpen: !this.state.isPotentialMatchOpen });
  }

  handleReport(event) {
    var body = {
      imageFile: this.state.imageFile,
      name: this.state.name,
      age: parseInt(this.state.age, 10),
      height: parseInt(this.state.height, 10),
      lastSeenLocation: this.state.lastSeenLocation,
      lastSeenTime: this.state.lastSeenTime,
      other: this.state.other
    };

    var uploadData = new FormData()
    uploadData.append('filename', this.state.imageFile.name);
    uploadData.append('file', this.state.imageFile);

    fetch(baseUrl + 'imageUpload', {
      method: 'POST',
      body: uploadData
    })
      .then(response => response.json())
      .then((response) => {
        let imageUrl = response.Location;
        console.log(imageUrl);
        body.imageUrl = imageUrl;
        fetch(baseUrl + 'profiles', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
            alert('Profile reported');
          })
      })
      .catch(err => alert(err));

    this.toggleReportModal();
    event.preventDefault();
  }

  handlePotentialMatchSubmit(event) {
    console.log('Potentail match submit');
    var uploadData = new FormData()
    uploadData.append('filename', this.state.potentialMatchFile.name);
    uploadData.append('file', this.state.potentialMatchFile);

    fetch(baseUrl + 'imageUpload', {
      method: 'POST',
      body: uploadData
    })
      .then(response => response.json())
      .then((response) => {
        fetch(potentialMatchUrl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ imageUrl: response.Location })
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
            alert('Thank you. We appreciate your help');
          })
      })
      .catch(err => alert(err));

    this.togglePotentialMatchModal();
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleFileChange(event) {
    console.log('changing');
    this.setState({
      imageFile: event.target.files[0],
    });
  }

  handlePotentialMatchChange(event) {
    console.log('changing');
    this.setState({
      potentialMatchFile: event.target.files[0],
    });
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
            <Button onClick={this.togglePotentialMatchModal}>
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

        <div className="row align-items-center">
          <Modal isOpen={this.state.isReportModalOpen} toggle={this.toggleReportModal}>
            <ModalHeader toggle={this.toggleReportModal}>Report a missing child</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleReport}>
                <FormGroup>
                  <Label htmlFor="imageFile">Image</Label>
                  <Input type="file" id="imageFile" name="imageFile"
                    onChange={this.handleFileChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="age">Age</Label>
                  <Input type="text" id="age" name="age"
                    value={this.state.age}
                    onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="height">Height</Label>
                  <Input type="text" id="height" name="height"
                    value={this.state.height}
                    onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastSeenLocation">Last seen location</Label>
                  <Input type="text" id="lastSeenLocation" name="lastSeenLocation"
                    value={this.state.lastSeenLocation}
                    onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastSeenTime">Last seen time</Label>
                  <Input type="text" id="lastSeenTime" name="lastSeenTime"
                    value={this.state.lastSeenTime}
                    onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="other">Other info</Label>
                  <div className="col-12">
                    <textarea id="other" name="other" rows={6}
                      value={this.state.other}
                      onChange={this.handleInputChange} />
                  </div>
                </FormGroup>

                <Button type="submit" value="submit" color="primary">submit</Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>

        <div className="row align-items-center">
          <Modal isOpen={this.state.isPotentialMatchOpen} toggle={this.togglePotentialMatchModal}>
            <ModalHeader toggle={this.togglePotentialMatchModal}>Submit a picture of a potential missing kid</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handlePotentialMatchSubmit}>
                <FormGroup>
                  <Label htmlFor="potentialMatchFile">Image</Label>
                  <Input type="file" id="potentialMatchFile" name="potentialMatchFile"
                    onChange={this.handlePotentialMatchChange} />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">submit</Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>

      </div>
    );
  }
}

export default Home;