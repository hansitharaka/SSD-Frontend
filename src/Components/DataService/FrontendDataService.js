import axios from 'axios'

const API_URL = 'http://localhost:8000';

class FrontendDataService {

    authenticateUser(data){
        return axios.post(`${API_URL}/user/signin`, data);
    }

    sendMessage(message, header) {
        return axios.post(`${API_URL}/message/addmessage`, message, { headers: header });
    }

    uploadFile(data, header) {
        return axios.post(`${API_URL}/message/upload`, data, { headers: header });
    }

}
export default new FrontendDataService();