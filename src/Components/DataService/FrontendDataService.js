import axios from 'axios'

const API_URL = 'https://localhost:8443';

class FrontendDataService {

    authenticateUser(data){
        return axios.post(`${API_URL}/user/signin`, data);
    }

    sendMessage(message) {
        // return axios.post(`${API_URL}/message/addmessage`, message);
        return true;
    }

    uploadFile(data) {
        // return axios.post(`${API_URL}/message/upload`, data);
        return true;
    }

}
export default new FrontendDataService();