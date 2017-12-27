import React, {Component} from 'react'
import {AppRegistry, Text, Image, View, TouchableOpacity} from 'react-native';
import {Button} from 'native-base'
import PlatformUtil from '../../utils/PlatformUtil';

const VISIBLE = 1;
const INVISIBLE = 2;
import PropTypes from 'prop-types'

export default class SpecialIntructions extends Component {

    constructor(props) {
        super(props);
        this.state = {visibility: VISIBLE, height: 0};
    }

    _renderTitle() {
        var {data} = this.props;
        return (<Text key={Math.random()} style={Styles.titleSpecial()}>{data.title}</Text>);
    }

    _changeState() {
        // var currentState = this.state;
        // var value = currentState.visibility;
        // if (value == VISIBLE) {
        //     value = INVISIBLE;
        // } else {
        //     value = VISIBLE;
        // }
        // this.setState({...currentState, visibility: value});
    }

    onPageLayout(event) {
        var currentState = this.state;
        var {width, height} = event.nativeEvent.layout;
        var currentHeight = currentState.height;
        if (currentHeight == 0) {
            currentHeight = height;
            this.setState({...currentState, height: currentHeight});
        }
    }

    render() {
        var {data} = this.props;
        var content = null;
        if (this.state.visibility == VISIBLE) {
            content = this._renderDescriptionOfSpecialInstruction(data.description)
        }
        return (<View key={Math.random()} style={Styles.containerStyle(this.state.height)}
                      onLayout={this.onPageLayout.bind(this)}>
                <TouchableOpacity onPress={() => this._changeState()}>
                    <View key={Math.random()} style={Styles.container()}>
                        <View>
                            {this._renderTitle()}
                            {content}
                        </View>
                        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end',
                            flexDirection: 'row',}}>
                            <Button bordered style={{marginTop: 10}}
                                    onPress={this.props.buttonClick}>
                                <Text style={{width: 80, textAlign: 'center', color: 'steelblue', fontWeight: 'bold'}}>Bắt Đầu</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableOpacity></View>
        );
    }

    /*
     *  Render layout for description of special instruction
     */
    _renderDescriptionOfSpecialInstruction(array) {
        var description = array.map((item, index) => {
            return (
                <View key={Math.random()} style={{flexDirection: 'row'}}>
                    {/*<View key={Math.random()} ><Text style={Styles.contentSpecial()}>{(index+1)+ ". "} </Text></View>*/}
                    <View key={Math.random()} style={{flex: 1}}><Text
                        style={Styles.contentSpecial()}>{item}</Text></View>
                </View>
            )
        });
        return (<View key={Math.random()}>{description}</View>);
    }

}

SpecialIntructions.propTypes = {
    data: PropTypes.any
}

SpecialIntructions.defaultProps = {
    data: {
        "title": "Special Instruction",
        "description": [
            "Withdraw 8 units from the Actrapid vial using \r\nthe syringe.",
            "The using the same syringe withdraw 8 units from the insulatard vial.",
            "Make sure you have re-suspended the insulatard vial before withdrawing insulin from it.",
            "Now inject the 16 units in the syringe subcutaneously 15 minutes before dinner."
        ]
    }
}

class Styles {
    static container() {
        return {
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#6EA1BE',
            backgroundColor: "#f8f8f8",
            marginTop: 0,
            paddingTop: 10,
            paddingBottom: 15,
            paddingLeft: 25,
            paddingRight: 15,
            marginBottom: 15,
        }
    }

    static containerStyle(heightValue) {
        if (heightValue == 0) {
            return {};
        }
        return {
            height: heightValue
        }
    }

    static titleSpecial() {
        return {
            fontSize: 46 / 3,
            color: '#6b9ebc',
            fontWeight: 'bold',
            fontFamily: 'Roboto-Medium'
        }
    }

    static contentSpecial() {
        return {
            fontSize: 13,
            color: "#5f5f5f",
            marginTop: 10,
            lineHeight: PlatformUtil.getDefaultValue(19, 17),
            fontFamily: 'Roboto'
        }
    }
} 