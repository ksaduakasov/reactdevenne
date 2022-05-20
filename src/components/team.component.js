import React, {Component} from "react";
import EventBus from "../common/EventBus";
import TeamService from "../services/team.service";
import {Link} from "react-router-dom";


export default class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {team: ""},
            creator: {creator: ""},
            topic: {topic: ""},
            advisor: {advisor: ""},
            defences: [],
            members: []
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
                    defences: response.data.defences,
                    members: response.data.members
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

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Team Member #{++index}</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {member.first_name} {member.last_name}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">Team Member #{index} Mail</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {member.email}
                    </div>
                </div>
                <hr/>
            </div>
        ));

    getListDefences = () =>
        this.state.defences.map((defence, index) => (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">{defence.stage.name}</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {defence.grade === null ? "Not Graded" : defence.grade}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0">{defence.stage.name} Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {defence.defenceDate.join("-")}
                    </div>
                </div>
                <hr/>
            </div>
        ));



    render() {
        return (
            <div className="col">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Team Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.team.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Topic Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.topic.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Advisor</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.advisor.first_name} {this.state.advisor.last_name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Advisor's Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.advisor.email}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Team Creator</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.creator.first_name} {this.state.creator.last_name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Team Creator's Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.creator.email}
                            </div>
                        </div>
                        <hr/>
                        {this.getListMembers()}
                        {this.getListDefences()}
                        <div className="row">
                            <div className="col-sm-12">
                                <a className="btn btn-info " target="__blank">Set Defence</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
