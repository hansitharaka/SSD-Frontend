import axios from 'axios'

const API_URL = 'http://localhost:8080';

class FrontendDataService {

    authenticateUser(data){
        return axios.post(`${API_URL}/user/signin`, data);
    }

    sendMessage(message) {
        return axios.post(`${API_URL}/message/addmessage`, message);
    }

    uploadFile(data) {
        // return axios.post(`${API_URL}/message/upload`, data);
        return true;
    }

}
export default new FrontendDataService();