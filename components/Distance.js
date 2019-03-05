import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import geolib from 'geolib';

class Distance extends React.Component {
    constructor(props) {
        super(props)
        this.props.distance = 0;
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

        let distance = ((geolib.getDistance(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: taskLatitude, longitude: taskLongitude }
        )) / 1000).toFixed(2);

        if (distance < 1) {
            this.setState({ unit: "m" });
        } else {
            this.setState({ unit: "Km" });
        }

        this.setState({ distance: distance });
        this.props.distance = distance;
    }

    render() {
        return (
            <Text style={styles.text}>{this.state.distance} {this.state.unit}</Text>
        );
    }

}

const styles = StyleSheet.create({
    text: {
        padding: wp('1%'),
        color: "#9F9F9F",
        fontWeight: "bold"
    }
})

export default Distance;