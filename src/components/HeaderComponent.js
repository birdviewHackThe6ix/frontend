import React, { Component } from 'react';
import {
  Nav, Navbar, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.handleSignup = this.handleSignup.bind(this);

    this.state = {
      isLoginModalOpen: false,
      isSignupModalOpen: false
    };
  }

  toggleLoginModal() {
    this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  }

  handleLogin(event) {
    var body = {
      username: this.username.value,
      password: this.password.value
    };
    console.log(body);
    fetch(baseUrl + 'users/login', {
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Authorization': 'Basic Auth',
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => alert(response.body))
      .catch(err => alert('Incorrect username or password'));

    this.toggleLoginModal();
    event.preventDefault();
  }

  toggleSignupModal() {
    this.setState({ isSignupModalOpen: !this.state.isSignupModalOpen });
  }

  handleSignup(event) {
    this.toggleSignupModal();
    var body = {
      username: this.username.value,
      password: this.password.value,
    };
    fetch(baseUrl + 'users/signup', {
      method: "POST",
      mode: 'no-cors',
      headers: {
        'Authorization': 'Basic Auth',
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => alert(response.body))
      .catch(err => alert('Cannot sign up'));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={this.toggleLoginModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
              </NavItem>
              <NavItem>
                <Button outline onClick={this.toggleSignupModal}>
                  <span className="fa fa-sign-in fa-signup"></span> Sign up
                                    </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>

        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <img src="assets/images/logo.png" width="200" height="200"
                  alt="BirdView" />
              </div>
              <div className="col-12 auto-ml">
                <h3>We are here to help reunite children with their families</h3>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
          <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
          <ModalHeader toggle={this.toggleSignupModal}>Sign up</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSignup}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" name="email"
                  innerRef={(input) => this.email = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" name="username"
                  innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password"
                  innerRef={(input) => this.password = input} />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Sign up</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Header;