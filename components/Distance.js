import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Distance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            distance: 0,
            unit: ""
        }
    }

    componentDidMount() {
        this._calculateDistance();
    }

    _calculateDistance = async () => {
        const userLatitude = this.props.uLat;
        const userLongitude = this.props.uLong;
        const taskLatitude = this.props.tLat;
        const taskLongitude = this.props.tLong;

        let diferenceLat = userLatitude - taskLatitude;
        let diferenceLong = userLongitude - taskLongitude;

        let distance = ((
            Math.sqrt(
                (Math.pow(diferenceLat, 2) + Math.pow(diferenceLong, 2))
            ))).toFixed(2);
        
        if (distance < 1){
            this.setState({unit: "m"});
        } else {
            this.setState({unit: "Km"});
        }

        this.setState({distance: distance});
    }

    render() {
        return (
            <Text style={styles.text}>{this.state.distance} {this.state.unit}</Text>
        );
    }

}

const styles = StyleSheet.create({
    text: {
        padding: wp('1%')
    }   
})

export default Distance;