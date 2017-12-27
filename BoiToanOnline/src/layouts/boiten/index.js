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
import BoiTenContent from './boiten'
import SpecialIntructions from "../../components/SpecialIntructions";
class BoiTen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuBoiTen: [],
            indexVisible: -1,
            countRequest: 0
        }
    }
    componentWillMount() {
       this.props.actions.setShowProgressBar(true, "Đang lấy dữ liệu!");
       this.props.actions.getBoiTenDataContent();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.state.action == Actions.ActionTypes.APP_GET_BOI_TEN_CONTENT_DATA_SUCCESS){
            if(this.props.state.isShowProgressBar)
                this.props.actions.setShowProgressBar(false);
            this.setState({menuBoiTen: nextProps.state.boiTenDataLayoutContent})
        }else if(nextProps.state.action == Actions.ActionTypes.APP_GET_BOI_TEN_CONTENT_DATA_ERROR){
            this.state.countRequest = this.state.countRequest+1;
            if(this.state.countRequest==5){
                this.props.actions.setShowModal(true, "Không thể lấy dữ liệu cho mục này. Vui lòng thử lại sau!");
            }else{
                this.props.actions.getBoiTenDataContent();
            }
        }
    }
    _itemClick(item, index){

       // console.log(index, this.state.indexVisible);
        if(index===this.state.indexVisible){
            this.setState({indexVisible: -1})
        }
        else {
            this.setState({indexVisible: index})
        }
    }

    _buttonOfMoTaClick(item){
        this.props.navigator.push({screen: BoiTenContent, item: item})
    }

    _renderRow(item, sectionID,index){
        let data = null;
        try{
            let string = item.mota;
           data= {
                "title": item.name,
                "description": [
                    string
            ]
            }
        }
        catch (e){
            console.log(e);
        }
       return(
           <TouchableOpacity onPress={()=>this._itemClick(item, index)} style={{marginLeft: 20, marginRight:20}}>
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
               {index===this.state.indexVisible?<SpecialIntructions data={data} visibility={index===this.state.indexVisible}
                                                                    buttonClick={()=>this._buttonOfMoTaClick(item)}/>:null}
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
                dataSource={ds.cloneWithRows(this.state.menuBoiTen!=null?this.state.menuBoiTen:[])}
                removeClippedSubviews={Platform.OS !== 'ios'}
                enableEmptySections
                renderRow={(item, sectionID,index) => this._renderRow(item, sectionID,index)}
            />
        </ImageBackground>)
    }

    render() {
        let contentView = this._renderContent();
        return (<LeftMenuNavigation contentView={contentView} navigator={this.props.navigator} typeView='child'
                                    title={"Bói Tên"}/>)
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