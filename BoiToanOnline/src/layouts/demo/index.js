import {Text, View, Platform, TextInput} from 'react-native'
import React, {Component} from 'react'
import {Icon, Left, InputGroup, Input, Button} from 'native-base';
import ToolBar from '../../components/LeftMenuNavigation/Toolbar/index'
import styles from './styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../actions';
import Demo2 from "./Demo2";
import LeftMenuNavigation from "../../components/LeftMenuNavigation/index";

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.params.value
        }
    }

    _onButton1Click() {
       this.props.actions.demoButton1Click(this.state.value)
    }

    _onButton2Click() {
       this.props.actions.demoButton2Click(this.state.value)
    }

    _onSendButtonClick(){
        this.props.navigator.push({screen: Demo2, value: this.state.value})
    }

    render() {
        let contentView = ( <View style={styles.container}>
            <View style={{margin: 20}}>
                <InputGroup borderType='underline' style={styles.input_group}>
                    <Input name="txtInput" placeholder='Enter value' style={styles.input}
                           placeholderTextColor='#999999'
                           autoFocus={true}
                           value={this.state.value}
                           onChangeText={(value) => this.setState({value})}
                           onSubmitEditing={() => {this._onSendButtonClick()}}
                           returnKeyType='send'
                           returnKeyLabel = 'send'/>
                </InputGroup>
                <View style={styles.buttonContainer}>
                    <Button bordered onPress={this._onButton1Click.bind(this)}>
                        <Text style={{width: 80, textAlign: 'center'}}>+5</Text>
                    </Button>
                    <Button bordered style={{marginLeft: 20}} onPress={this._onButton2Click.bind(this)}>
                        <Text style={{width: 80, textAlign: 'center'}}>-5</Text>
                    </Button>
                </View>
                <Text style={{marginTop:50}}>Result: {this.props.state.value}</Text>
            </View>
        </View>);
        return (<LeftMenuNavigation contentView={contentView} navigator={this.props.navigator} typeView = 'parent' title={this.props.state.appName}/>)
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
export default connect(mapStateToProps, mapDispatchToProps)(Demo);