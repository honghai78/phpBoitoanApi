import * as ActionTypes from './ActionType'
import APIServices from '../service/api'
import ApiUrl from "../service/api/ApiUrl";

export function demoButton1Click(value) {
    return {
        type: ActionTypes.ACTION_1,
        value: !isNaN(value) ? parseFloat(value) + 5 : 'NaN'
    }
}

export function demoButton2Click(value) {
    return {
        type: ActionTypes.ACTION_2,
        value: !isNaN(value) ? parseFloat(value) - 5 : 'NaN'
    }
}

export function getAppConfig() {
    return (dispatch) => {
        APIServices.get(ApiUrl.appConfig()).then((response) => {
            return response.json();
        }).then((responseJson) => {
            dispatch({
                type: ActionTypes.APP_GET_CONFIG_SUCCESS,
                appConfig: responseJson
            })
        }).catch((error) => {
            dispatch({
                type: ActionTypes.APP_GET_CONFIG_ERROR,
                appConfig: [
                    {
                        app_name: 'Bói Toán Online',
                    }
                ]
            })
        })
    }
}