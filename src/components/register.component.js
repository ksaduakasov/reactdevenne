import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const firstname = value => {
  if (!isEmail(value)) {
    return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
    );
  }
};

const lastname = value => {
  if (!isEmail(value)) {
    return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
    );
  }
};

const middlename = value => {
  if (!isEmail(value)) {
    return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const username = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const password = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeMiddlename = this.onChangeMiddlename.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      username: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeMiddlename(e) {
    this.setState({
      middleName: e.target.value
    });
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
          this.state.firstName,
          this.state.lastName,
          this.state.middleName,
          this.state.email,
          this.state.username,
          this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">firstName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstname}
                    // validations={[required, firstname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">lastName</label>
                  <Input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChangeLastname}
                      // validations={[required, lastname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="middleName">middleName</label>
                  <Input
                      type="text"
                      className="form-control"
                      name="middleName"
                      value={this.state.middleName}
                      onChange={this.onChangeMiddlename}
                      // validations={[required, middlename]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      // validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    // validations={[required, username]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    // validations={[required, password]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
