import React from 'react'
import { BackHandler, TouchableOpacity, View, StyleSheet } from "react-native";
import { Platform } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class CustomBackButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    render() {
        return (
            <View style={styles.flexStartContainer}>
                <TouchableOpacity onPress={this.handleBackButtonClick}>
                    <Icons name={"ios-arrow-back"} size={30} color='#fff' style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon:{ marginLeft: '3%' }
});

export default CustomBackButton;