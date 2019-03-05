import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons";

export class DetailItem extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon name={this.props.name} color="#777777" size={hp("7%")} />
                <View style={styles.textContainer}>
                    <Text style={styles.labelTitle}>{this.props.title}</Text>
                    <Text style={styles.labelDescription}>{this.props.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: hp('3%'),
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        flexDirection: 'row',
        alignItems: "center"
    },
    textContainer: {
        marginLeft: wp('3%')
    },
    labelTitle: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: "#777777",
        fontSize: hp('2.2%')
    },
    labelDescription: {
        fontSize: hp('2%'),
        color: "#C8C8C8"
    }
});

export default DetailItem;