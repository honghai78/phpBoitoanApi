import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../actions';
import {Text, View, Platform, TextInput, ImageBackground, Image, Dimensions, ListView, TouchableOpacity} from 'react-native'
import LeftMenuNavigation from '../../components/LeftMenuNavigation'
import {images} from "../../images";
import style from './style';
import GridView from 'react-native-super-grid'
import BoiTenMenu from "../../service/data/BoiTenMenu";

class BoiTenContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBoiTen: []
        }
    }
    componentWillMount() {

    }

    _renderContent() {
        return (<ImageBackground source={images.boi_ten_background}
                                 style={{flex: 1, width: undefined, height: undefined, backgroundColor: 'transparent'}}
                                 resizeMode={Image.resizeMode.stretch}>

        </ImageBackground>)
    }

    render() {
        let contentView = this._renderContent();
        return (<LeftMenuNavigation contentView={contentView} navigator={this.props.navigator} typeView='child'
                                    title={this.props.state.appName}/>)
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

export default connect(mapStateToProps, mapDispatchToProps)(BoiTenContent);