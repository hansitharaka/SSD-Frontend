import axios from 'axios'

const API_URL = 'https://localhost:8443';

class FrontendDataService {

    authenticateUser(data){
        return axios.post(`${API_URL}/user/signin`, data);
    }

    sendMessage(message, header) {
        // return axios.post(`${API_URL}/message/addmessage`, message, { headers: header });
        console.log(axios.post('https://localhost:8443/message/addmessage', message, { headers: header }))
    }

    uploadFile(data, header) {
        // return axios.post(`${API_URL}/message/upload`, data, { headers: header });
        console.log(axios.post('https://localhost:8443/message/upload', data, { headers: header }))
    }

}
export default new FrontendDataService();