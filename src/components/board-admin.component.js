import React, {Component} from "react";
import {Link} from "react-router-dom";

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
    };

    listTeams = () =>
        this.state.teams.map(team => (
            <tr>
                <td>
                    <Link to={"/team/" + team.team.id}>
                        {team.team.name}
                    </Link>
                </td>
                <td>{team.topic.name}</td>
                <td>{team.advisor.first_name} {team.advisor.last_name}</td>
            </tr>
        ));

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Team Name</th>
                        <th scope="col">Project Topic</th>
                        <th scope="col">Advisor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.listTeams()}
                    </tbody>
                </table>
            </div>
        );
    }
}
