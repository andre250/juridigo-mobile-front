import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class DateFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "0",
        }
    }

    componentDidMount() {
        this._timeConverter();
    }

    _timeConverter = async () =>{
    const a = new Date(this.props.timestamp * 1000);
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const time = `${hour}h - ${date}/${month}`
    this.setState({date: time})
  }

    render() {
        return (
            <Text style={styles.text}>{this.state.date}</Text>
        );
    }

}

const styles = StyleSheet.create({
    text: {
        color:"#9F9F9F",
        fontWeight:"bold",
        textAlign: "center",
        fontSize: hp("2%"),
        padding: hp("1%"),
        width: wp('28%')
    }   
})

export default DateFormat;