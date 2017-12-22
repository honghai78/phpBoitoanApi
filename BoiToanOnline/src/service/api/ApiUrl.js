import {HOST_SERVER} from './config'

export default class ApiUrl {

    static appConfig() {
        return HOST_SERVER + 'appVersionRequest.php';
    }
}