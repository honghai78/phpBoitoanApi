import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './../actions';
import {Text, View, Platform, TextInput, ImageBackground, Image, Dimensions} from 'react-native'
import LeftMenuNavigation from '../components/LeftMenuNavigation'
import {images} from "../images";
import style from './style';
import GridView from 'react-native-super-grid'
import MainMenuData from "../service/data/mainMenuData";

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
                renderItem={item => (
                    <View style={{flexDirection: 'column',
                        justifyContent: 'center',}}>
                    <Image source={item.icon}
                                     style={{flex: 1, width: Dimensions.get('window').width, height: 80, backgroundColor: 'transparent'}}
                                     resizeMode={Image.resizeMode.contain}/>
                    </View>
                )}
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