import axios from 'axios';
import Cookies from 'universal-cookie';

let config= {headers : {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}};

const url = '/api';
const cookies = new Cookies();

function setCookie(accessToken, expiresIn) {
    let expirationDate = new Date();
    expirationDate.setTime(new Date().getTime() + (expiresIn * 1000));
    cookies.set('access_token', accessToken, {path: '/', expires: expirationDate});
}

function deleteCookie() {
    cookies.remove('access_token');
}

function addAccessTokenToHeaders() {
    // Retrieve the access_token cookie and pass it as Authorization header
    const token = cookies.get('access_token');
    config.headers['Authorization'] = 'Bearer '+token;
}

export default {

    register: user => {
        return axios.post(`${url}/register`, user, config)
            .then(res => {
                if (res.data.status === 'success')
                    setCookie(res.data.access_token, res.data.expires_in);
                return res.data;
            });
    },

    login: user => {
        return axios.post(`${url}/login`, user, config)
            .then(res => {
                if (res.data.status === 'success')
                    setCookie(res.data.access_token, res.data.expires_in);
                return res.data;
            })
    },

    logout: () => {
        addAccessTokenToHeaders();
        return axios.get(`${url}/logout`, config)
            .then(res => {
                if (res.data.status === 'success') {
                    deleteCookie();
                }
                return res.data;
            })
    },

    user: () => {
        addAccessTokenToHeaders();
        return axios.get(`${url}/user`, config)
            .then(res => {
                return res.data;
            })
    }

}
