import React, {Component} from "react";
import teamService from "../services/team.service";

export default class Defence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: "",
            defence: {defence: ""}
        };
    }

    componentDidMount() {
        teamService.setDefenceDate(this.props.match.params.id);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className='col-sm-6'>
                        <div className="form-group">
                            <div className='input-group date' id='datetimepicker2'>
                                <input type='date' className="form-control"/>
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
