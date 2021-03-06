import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './../actions';
import {Text, View, Platform, TextInput, ImageBackground, Image, Dimensions, TouchableOpacity} from 'react-native'
import LeftMenuNavigation from '../components/LeftMenuNavigation'
import {images} from "../images";
import style from './style';
import GridView from 'react-native-super-grid'
import MainMenuData from "../service/data/mainMenuData";
import {BOI_TEN} from "../service/data/key";
import BoiTenScreen from "./boiten"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainMenuData: []
        }
    }
    componentWillMount() {
        let data = new MainMenuData().getData();
        this.setState({
            mainMenuData: data
        })
    }
    _itemClick(item){
        switch (item.id){
            case BOI_TEN:
                this.props.navigator.push({screen: BoiTenScreen, item: item})
                break;
        }
    }
    _renderItem(item){
        return (<TouchableOpacity onPress={()=>this._itemClick(item)}>
            <Image source={item.icon}
                   style={{flex: 1, width: 80, height: 80, backgroundColor: 'transparent'}}
                   resizeMode={Image.resizeMode.contain}/>
        </TouchableOpacity>)
    }

    _renderContent() {
        return (<ImageBackground source={images.home_background}
                                 style={{flex: 1, width: undefined, height: undefined, backgroundColor: 'transparent'}}
                                 resizeMode={Image.resizeMode.stretch}>
            <GridView
                itemDimension={80}
                items={this.state.mainMenuData}
                style={style.gridView}
                fixed = {false}
                spacing = {0}
                renderItem={(item)=>this._renderItem(item)}
            />
        </ImageBackground>)
    }

    render() {
        let contentView = this._renderContent();
        return (<LeftMenuNavigation contentView={contentView} navigator={this.props.navigator} typeView='parent'
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);