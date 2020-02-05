import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {location: null, newPosition: null}
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({location: position});
            },
            error => console.log("couldn't get Location")
        );

        let watchId = navigator.geolocation.watchPosition(position => {
                this.setState({newPosition: position});
            },
            error => {
                console.log("error: ", error)
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.findCoordinates}>
                    <Text style={styles.introText}>Find my Coordinates You faking bitch</Text>
                    {this.state.location && <Text
                        style={styles.result}>Location: {this.state.location.coords.latitude} / {this.state.location.coords.longitude} </Text>}
                </TouchableOpacity>
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
        color: "white",
        fontSize: 30
    },
    countText: {
        color: "white"
    }
});