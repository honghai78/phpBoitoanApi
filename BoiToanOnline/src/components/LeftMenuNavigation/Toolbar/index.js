import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, PlatformOnline, ImageBackground} from 'react-native';
import {Icon} from 'native-base';
import {images} from "../../../images";

export default class Toolbar extends Component {

    _onSettingClick() {
        if (this.props.onSettingClick) {
            this.props.onSettingClick();
        }
    }

    _onBackButtonClick() {
        if (this.props.onBackButtonClick) {
            this.props.onBackButtonClick();
        }
    }

    render() {
        var icon = null;
        switch (this.props.typeView) {
            case "parent":
                icon = (<TouchableOpacity style={styles.btnSetting} onPress={() => this._onSettingClick()}>
                    <Icon style={{color: 'white', fontSize: 30, fontWeight: "bold",}} name="ios-menu"/>
                </TouchableOpacity>);
                break;
            case "child":
                icon = (<TouchableOpacity style={styles.btnSetting} onPress={() => this._onBackButtonClick()}>
                    <Icon style={{color: 'white', fontSize: 30, fontWeight: "bold",}} name="ios-arrow-back"/>
                </TouchableOpacity>);
                break;
            case "none":
                icon = (<View style={styles.btnIconNone}></View>)
                break;
            default:
                icon = (<TouchableOpacity style={styles.btnSetting} onPress={() => this._onBackButtonClick()}>
                    <Icon style={{color: 'white', fontSize: 30, fontWeight: "bold",}} name="ios-arrow-back"/>
                </TouchableOpacity>);
                break;
        }
        return (
            <ImageBackground source={images.toolbar_background} style={styles.toolbar}
                             resizeMode={Image.resizeMode.stretch}>
                {icon}
                <Text style={styles.title} numberOfLines={1}>
                    {this.props.title == null ? "Bói Toán " : this.props.title}
                </Text>
            </ImageBackground>
        );
    }
}

var styles = {
    btnSetting: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIconNone: {
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar: {
        flexDirection: 'row',
        height: 58,
        //borderColor:'#CBCBCB',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 2,
        width: undefined, backgroundColor: 'transparent'
    },
    title: {
        flex: 0.8,
        color: "white",
        fontSize: 20,
        marginTop: 13,
        marginLeft: 10,
        justifyContent: 'center',
        fontFamily: 'Roboto-Regular',
    }
}
