import React, {Component} from "react";
import EventBus from "../common/EventBus";
import TeamService from "../services/team.service";
import Route from "react-router-dom/es/Route";
import Defence from "./defence.component";
import {Link} from "react-router-dom";
import Switch from "react-router-dom/es/Switch";


export default class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {team: ""},
            creator: {creator: ""},
            topic: {topic: ""},
            advisor: {advisor: ""},
            defence: {defence: ""},
        };
    }


    componentDidMount() {
        TeamService.getTeamInfo(this.props.match.params.id)
            .then(response => {
                this.setState({
                    team: response.data.team,
                    topic: response.data.topic,
                    creator: response.data.creator,
                    advisor: response.data.advisor,
                    defence: response.data.defence
                });
            },
                error => {
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
            )
    };

    teamDescription = () => (
        <tr>
            <td>{this.state.team.name}</td>
            <td>{this.state.topic.name}</td>
            <td>{this.state.advisor.first_name} {this.state.advisor.last_name}</td>
            <td>{this.state.advisor.email}</td>
            <td>{this.state.creator.first_name} {this.state.creator.last_name}</td>
            <td>{this.state.creator.email}</td>
            <td>{this.state.defence ? this.state.defence?.defence_date : "Not Selected"}</td>
        </tr>
    )


    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Team Name</th>
                        <th scope="col">Project Topic</th>
                        <th scope="col">Advisor</th>
                        <th scope="col">Advisor's Mail</th>
                        <th scope="col">Team Lead</th>
                        <th scope="col">Team Lead's Mail</th>
                        <th scope="col">Defence Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.teamDescription()}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Link to={"/defence/" + this.state.team.id} className="btn btn-secondary align-self-center">Set Defence Date</Link>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
