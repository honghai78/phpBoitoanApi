import React, {Component} from 'react'
import {Platform, View, StatusBar, StyleSheet, Text, ImageBackground} from 'react-native'
import {Navigator} from 'react-native-navigation-custom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './actions';
import Home from "./layouts/home";
import * as image from './images'
const StatusBarCustom = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if(this.props.state.appConfig==null){
            this.props.actions.getAppConfig();
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
        if(this.props.state.appConfig!=null){
            return ( <View style={{flex: 1}}>
                <StatusBarCustom backgroundColor="#503655" barStyle="light-content"/>
                <Navigator initialRoute={{screen: Home}}
                           renderScene={this.renderScence.bind(this)}
                           configureScene={(route) => {
                               return Navigator.SceneConfigs.PushFromRight;
                           }}
                />
            </View>)
        }
        else{
            return (
                <StatusBarCustom backgroundColor="#476576" barStyle="light-content"/>
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
