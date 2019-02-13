import React from 'react';
import { View, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Text  } from 'react-native';
import { Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class ProgressBar extends React.Component {

  render() {
    return (
      <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progresso do cadastro</Text>
          {
            (Platform.OS === 'android')
              ?
              (<ProgressBarAndroid style={styles.progressBar} color="#2AA3D8" styleAttr="Horizontal" progress={this.props.Progress_Value} indeterminate={false} />)
              :
              (<ProgressViewIOS style={styles.progressBar} progressTintColor="#2AA3D8" progress={this.props.Progress_Value} />)
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  progressContainer: {
    height: hp('10%'),
    width: wp('100%'),
    flex: 1,
    backgroundColor:'#F2F2F3',
    paddingLeft:hp('2%'),
    paddingRight:hp('2%'),
    paddingTop:hp('3.5%')
  },
  progressText: {
    position: "absolute",
    fontSize: hp('1.5%'),
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1,
    paddingTop:hp('3.5%')
  },
  progressBar: {
    transform: [{ scaleX: 1.0 }, { scaleY: 4.0 }],
  }
});

export default ProgressBar;