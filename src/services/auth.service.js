import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        console.log(response.data)
        if (response.data.authenticationToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, middleName, email, username, password) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      middleName,
      email,
      username,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
