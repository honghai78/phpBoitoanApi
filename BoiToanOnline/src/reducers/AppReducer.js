import * as ActionTypes from "../actions/ActionType";

const initialState = {
    action: null,
    value: '',
    appConfig: null,
    appName: null,
    appVersion: null,
    isShowProgressBar: false,
    textOfProgressBar: null,
    boiTenData: null,
    isShowModal: false,
    titleModal: null,
    contentModal: null
};

export default (state = initialState, action) => {
    state.action = action.type;
    switch (action.type) {
        case ActionTypes.ACTION_1:
            return {
                ...state,
                value: action.value
            };
            break;
        case ActionTypes.ACTION_2:
            return {
                ...state,
                value: action.value
            };
            break;
        case ActionTypes.APP_GET_CONFIG_SUCCESS:
            var app_name = '', app_version = '';
            if (action.appConfig != null && action.appConfig.length > 0) {
                app_name = action.appConfig[action.appConfig.length - 1].app_name;
                app_version = action.appConfig[action.appConfig.length - 1].app_version;
            }
            return {
                ...state,
                appConfig: action.appConfig,
                appName: app_name,
                appVersion: app_version
            };
            break;
        case ActionTypes.APP_GET_CONFIG_ERROR:
            var app_name = '', app_version = '';
            if (action.appConfig != null && action.appConfig.length > 0) {
                app_name = action.appConfig[action.appConfig.length - 1].app_name;
                app_version = action.appConfig[action.appConfig.length - 1].app_version;
            }
            return {
                ...state,
                appConfig: action.appConfig,
                appName: app_name,
                appVersion: app_version
            };
            break;
        case ActionTypes.SHOW_PROGRESS_BAR:
            return {
                ...state,
                isShowProgressBar: action.isShowProgressBar,
                textOfProgressBar: action.textOfProgressBar
            };
        case ActionTypes.APP_BOI_TEN_SUCCESS:
            return {
                ...state,
                boiTenData: action.boiTenData
            };
        case ActionTypes.APP_BOI_TEN_ERROR:
            return {
                ...state,
                boiTenData: action.boiTenData
            };
        case ActionTypes.APP_SHOW_MODAL:
            return {
                ...state,
                isShowModal: action.isShowModal,
                titleModal: action.titleModal,
                contentModal: action.contentModal
            };
        default:
            return state;
    }
}