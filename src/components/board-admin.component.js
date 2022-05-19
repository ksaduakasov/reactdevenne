import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        console.log(response.data)
        console.log(typeof response.data)
        response.data.forEach(function (arrayItem) {
          console.log(arrayItem.team.name);
          console.log(arrayItem.creator.email)
        });
          this.setState({
              teams: response.data
          });
      },
      error => {
        //console.log(UserService.getAdminBoard())
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  listTeams = () =>
      this.state.teams.map(team => (
          <div className="card">
            <h1>{team.team.name}</h1>
            <p>{team.creator.email}</p>
          </div>
      ));

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.listTeams()}</h3>
        </header>
      </div>
    );
  }
}
