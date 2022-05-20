import React, {Component} from "react";
import EventBus from "../common/EventBus";
import TeamService from "../services/team.service";
import {Link} from "react-router-dom";

export default class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: Object
        };
    }


    componentDidMount() {
        TeamService.getTeamInfo(this.props.match.params.id)
            .then(response => {
                this.setState({
                    team: response.data
                });
                console.log(this.state.team.team.name);
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

    teamDescription = () =>
        this.state.team.team.name


    render() {
        return (
            <div>
                {this.teamDescription()}
            </div>
        );
    }
}
