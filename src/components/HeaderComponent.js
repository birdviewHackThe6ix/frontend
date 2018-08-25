import React, { Component } from 'react';
import {
  Nav, Navbar, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      isLoginModalOpen: false,
      isReportModalOpen: false
    };
  }

  toggleLoginModal() {
    this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  }

  handleLogin(event) {
    this.toggleLoginModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
      + " Remember: " + this.remember.checked);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button onClick={this.toggleLoginModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>

        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <img src="assets/images/logo1.jpg"
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
      </div>
    );
  }
}

export default Header;