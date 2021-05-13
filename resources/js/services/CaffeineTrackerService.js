import axios from 'axios';
import Cookies from 'universal-cookie';

let config= {headers : {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}};

const url = '/api';
const cookies = new Cookies();

function addAccessTokenToHeaders() {
    // Retrieve the access_token cookie and pass it as Authorization header
    const token = cookies.get('access_token');
    config.headers['Authorization'] = 'Bearer '+token;
}

export default {

    fetchDrinks : () => {
        return axios.get(`${url}/drinks`)
            .then(res => {
                return res.data;
            });
    },

    consumeDrink : (drink_id, servings) => {
        addAccessTokenToHeaders();

        const data = {'drink_id': drink_id, 'servings': servings};
        return axios.post(`${url}/user/consume`, JSON.stringify(data), config)
            .then(res => {
                return res.data;
            });
    },

    fetchConsumedDrinks : () => {
        addAccessTokenToHeaders();
        return axios.get(`${url}/user/drinks`, config)
            .then(res => {
                return res.data;
            });
    },

    resetConsumedDrinks : () => {
        addAccessTokenToHeaders();
        return axios.get(`${url}/user/reset`, config)
            .then(res => {
                return res.data;
            });
    }
}
