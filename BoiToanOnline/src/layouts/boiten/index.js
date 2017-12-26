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

class BoiTen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBoiTen: []
        }
    }
    componentWillMount() {
        let data = new BoiTenMenu().getData();
        this.setState({
            menuBoiTen: data
        })
    }
    _renderRow(item, index){
       return(
           <TouchableOpacity>
           <ImageBackground source={images.boi_ten_item}
                            style={style.item_row}
                            resizeMode={Image.resizeMode.stretch}>
               <Image source={images.ngu_hanh}
                      style={{width: 35, height: 35, backgroundColor: 'transparent'}}
                      resizeMode={Image.resizeMode.contain}/>
               <View style={style.view_item}>
                   <Text style={style.text_item}>{item.name}</Text>
               </View>

           </ImageBackground>
           </TouchableOpacity>
       )
    }
    _renderContent() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<ImageBackground source={images.boi_ten_background}
                                 style={{flex: 1, width: undefined, height: undefined, backgroundColor: 'transparent'}}
                                 resizeMode={Image.resizeMode.stretch}>
            <ListView
                style={{ marginTop: 15}}
                dataSource={ds.cloneWithRows(this.state.menuBoiTen)}
                removeClippedSubviews={Platform.OS !== 'ios'}
                enableEmptySections
                renderRow={(item, index) => this._renderRow(item, index)}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(BoiTen);