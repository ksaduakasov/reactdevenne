import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/admin/team/';

class TeamService {
    getTeamInfo(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    setDefenceDate(id) {
        let pad = function(num) { return ('00'+num).slice(-2) };
        let date;
        date = new Date();
        date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
        return axios.post(API_URL + id + "/defence/create", {
            headers: authHeader(),
            body: {
                defenceDate: date,
                commissions: {},
                stageId: 1
            }
        });
    }
}

export default new TeamService();
