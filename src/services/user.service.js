import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/auth/';

class UserService {
  getPublicContent() {
    return "hello!";
  }

  getUserBoard() {
    return axios.get(API_URL , { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new UserService();
