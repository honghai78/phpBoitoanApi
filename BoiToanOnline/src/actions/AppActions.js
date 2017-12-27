import * as ActionTypes from './ActionType'
import APIServices from '../service/api'
import ApiUrl from "../service/api/ApiUrl";
import AppUnits from "../utils/AppUnits";

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
            console.log(error);
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


export function setShowProgressBar(isShow, text) {
    return {
        type: ActionTypes.SHOW_PROGRESS_BAR,
        isShowProgressBar: isShow,
        textOfProgressBar: text!=null?text:null
    }
}

export function setShowModal(isShow, title, content) {
    return {
        type: ActionTypes.APP_SHOW_MODAL,
        isShowModal: isShow,
        titleModal: title,
        contentModal: content
    }
}

export function boiTen(params) {
    let input = AppUnits.convertJsonToFormEncoded(params);
    console.log(input)
    return (dispatch) => {
        APIServices.post(ApiUrl.boiTen(), input).then((response) => {
            console.log(response)
            return response.json();
        }).then((responseJson) => {
            dispatch({
                type: ActionTypes.APP_BOI_TEN_SUCCESS,
                boiTenData: responseJson
            })
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: ActionTypes.APP_BOI_TEN_ERROR,
                boiTenData: null
            })
        })
    }
}

export function getBoiTenDataContent() {
    return (dispatch) => {
        APIServices.get(ApiUrl.boiTenDataContent()).then((response) => {
            return response.json();
        }).then((responseJson) => {
            dispatch({
                type: ActionTypes.APP_GET_BOI_TEN_CONTENT_DATA_SUCCESS,
                boiTenDataLayoutContent: responseJson
            })
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: ActionTypes.APP_GET_BOI_TEN_CONTENT_DATA_ERROR,
                boiTenDataLayoutContent: []
            })
        })
    }
}