import {HOST_SERVER} from './config'

export default class ApiUrl {

    static appConfig() {
        return HOST_SERVER + 'appVersionRequest.php';
    }

    static boiTen(){
        return "http://api.lichvansu.net:8080/get-name";
    }
}