import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {location: null, positions: [], watchId: null}
    }

    componentDidMount = () => {
        //Do something with the positions. for example draw a route
        let watchId = navigator.geolocation.watchPosition(position => {
                console.log("updated...");
                //Position changed
                let positions = this.state.positions;
                positions.push(position);
                this.setState({positions: positions});
            },
            error => {
                console.log("error: ", error)
            },
            {enableHighAccuracy: true});
        this.setState({watchId});
    };

    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.state.watchId);
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({location: position});
            },
            error => console.log("couldn't get Location")
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.findCoordinates}>
                    <Text style={styles.introText}>Gimme Location pls</Text>
                    {this.state.location &&
                    <View style={styles.resultContainer}>
                        <Text style={styles.result}>Latitude: {this.state.location.coords.latitude}</Text>
                        <Text style={styles.result}>Longitude: {this.state.location.coords.longitude} </Text>
                    </View>}
                </TouchableOpacity>
                <Text>{this.state.positions.length}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3B3533',
        alignItems: 'center',
        justifyContent: 'center',
    },
    introText: {
        color: "white",
        fontSize: 40
    },
    result: {
        color: "red",
        fontSize: 20
    },
    countText: {
        color: "white"
    },
    resultContainer: {
        marginTop: 20,
    }
});