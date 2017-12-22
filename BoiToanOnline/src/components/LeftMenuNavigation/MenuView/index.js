import React, {Component} from 'react'
import {View, Text} from 'react-native'
import style from './style'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../../actions';
class MenuView extends Component{
    constructor(props){
        super(props);
    }

    renderTopContainer(){
        return (
            <View style={style.containerTop}>

            </View>
        )
    }
    renderBottomContainer(){
        return (
            <View style={style.containerBottom}>
                <Text style={style.text_version}>Version: {this.props.state.appVersion}</Text>
            </View>
        )
    }

    render(){
        return(<View style={style.container}>
                {this.renderTopContainer()}
                {this.renderBottomContainer()}
        </View>)
    }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);