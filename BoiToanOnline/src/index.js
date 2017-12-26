import React, {Component} from 'react'
import {Platform, View, StatusBar, StyleSheet, Text, ImageBackground, ActivityIndicator, Dimensions} from 'react-native'
import {Navigator} from 'react-native-navigation-custom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './actions';
import Home from "./layouts/home";
import * as image from './images'
import AlertNotification from './components/AlertNotification/AlertNotification'
const StatusBarCustom = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countVerRequest: 0
        }
    }

    componentWillMount() {
        if(this.props.state.appConfig==null){
            this.props.actions.setShowProgressBar(true, 'Đang kiểm tra phiên bản ứng dụng.')
            this.props.actions.getAppConfig();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.state.action == Actions.ActionTypes.APP_GET_CONFIG_SUCCESS){
            if(this.props.state.isShowProgressBar)
            this.props.actions.setShowProgressBar(false);
        }else if(nextProps.state.action == Actions.ActionTypes.APP_GET_CONFIG_ERROR){
            this.state.countVerRequest = this.state.countVerRequest+1;
            if(this.state.countVerRequest==5){
                this.props.actions.setShowModal(true, "Không thể kiểm tra phiển bản ứng dụng!", "Vui lòng đảm bảo rằng kết nối internet của bạn là ổn định. Nhấn OK để thử lại.");
            }else{
                this.props.actions.getAppConfig();
            }
        }
    }

    renderScence(state, navigator) {
        const Screen = state.screen;
        if (Screen !== null) {
            return (<Screen navigator={navigator} params={state}/>)
        } else {
            return (<View style={{marginTop: 100}}>
                <Text style={{textAlign: 'center'}}>Page not found</Text>
            </View>)
        }
    }


    render() {
        var objLoading = null;
        if (this.props.state.isShowProgressBar) {
            var width = Dimensions.get('window').width;
            var height = Dimensions.get('window').height;
            objLoading = (
                <View style={{
                    flex: 1, position: 'absolute', zIndex: 10, backgroundColor: 'rgba(52, 52, 52, 0.2)',
                    alignItems: 'center', justifyContent: 'center', width: width, height: height
                }}>
                    <ActivityIndicator
                        style={[{
                            padding: 8,
                            position: 'absolute',
                            zIndex: 11,
                            width: 50,
                            height: 50,
                            top: height / 2 - 25,
                            left: width / 2 - 25
                        }, {transform: [{scale: 1.5}]}]}
                        size="large"
                    />
                    <Text style={{
                        color: "#FF7167",
                        fontWeight: '600',
                        marginTop: 60
                    }}>{this.props.state.textOfProgressBar}</Text>
                </View>
            )
        }
       let alertNotification = (<AlertNotification isVisible={this.props.state.isShowModal}
                           onButtonPress={() => {
                               this.props.actions.setShowModal(false, "", "");
                               this.props.actions.setShowProgressBar(false);
                               if(this.state.countVerRequest==5){
                                   this.state.countVerRequest = 0;
                                   this.props.actions.setShowProgressBar(true, 'Đang kiểm tra phiên bản ứng dụng.')
                                   this.props.actions.getAppConfig();
                               }
                           }}
                           onRequestClose = {()=>{
                               // this.props.functions.setShowModal(false, "", "");
                               // this.props.functions.setShowProgressBar(false);
                           }}
                           titleText={this.props.state.titleModal}
                           contentText={this.props.state.contentModal}
                           titleColor={this.props.state.ntfType != null ? '#373737' : '#FF7167'}/>);
        if(this.props.state.appConfig!=null){
            return ( <View style={{flex: 1}}>
                <StatusBarCustom backgroundColor="#503655" barStyle="light-content"/>
                <Navigator initialRoute={{screen: Home}}
                           renderScene={this.renderScence.bind(this)}
                           configureScene={(route) => {
                               return Navigator.SceneConfigs.PushFromRight;
                           }}
                />
                {objLoading != null ? objLoading : null}
                {alertNotification}
            </View>)
        }
        else{
            return (
                <View style={{flex: 1}}>
                    <StatusBarCustom backgroundColor="#503655" barStyle="light-content"/>
                    {objLoading != null ? objLoading : null}
                    {alertNotification}
                </View>
            )
        }
    }

}
const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        statusBar: {
            height: Platform.OS === 'ios' ? 20 : 0,
        }
    }
);

function mapStateToProps(state) {
    return {
        state: {...state.AppReducer}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...Actions.AppActions}, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
