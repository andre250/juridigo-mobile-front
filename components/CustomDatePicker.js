import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet } from "react-native";
import { Platform } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:this.props.date
    }
  }

  render() {
    return (
      <View style={[styles.flexStartContainer,]}>
          <DatePicker
            style={[styles.dataPickerInput]}
            date={this.state.date}
            mode="date"
            placeholder={this.props.placeHolder}
            format="DD/MM/YYYY"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            showIcon={true}
            iconComponent= {<Icon style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />}
            customStyles={{
              dateInput: styles.dateInput,
              dateText: styles.dateText,
              placeholderText: styles.placeholderText
            }}
            onDateChange={(date) => {
              this.setState({date: date})}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStartContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  dateInput: {
    borderWidth: 0,
    backgroundColor: '#D8D8D6',
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: hp('7%'),
    padding: hp('1%'),
  },
  dateText: {
    color: '#333333',
    alignSelf:'flex-start'
  },
  placeholderText: {
    color: '#9E9C9D',
    alignSelf:'flex-start'
  },
  protectedInput: {
    color: '#333333',
    backgroundColor: '#D8D8D6',
  },
  birthdayIcon: {
    height:hp('7%'),
    paddingRight:wp('5%'),
    alignSelf:'center',
    textAlignVertical:'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  dataPickerInput:{
    width: wp('50%')
  }
});

export default CustomDatePicker