import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';

import {
    VRT_VICINITY_JOB_KEY,
    checkPeriodicVicinityOfVRTTower
} from './DI';

import BackgroundJob from "react-native-background-job";
import {FoodList} from "./redux/component";

class App extends Component {

    componentWillMount() {
        BackgroundJob.cancelAll();
        BackgroundJob.schedule({
            jobKey: VRT_VICINITY_JOB_KEY,
            timeout: Number.MAX_SAFE_INTEGER,
            period: 1 * 60 * 60 * 1000, // 1 hour
            persist: true
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FoodList />
            </View>
        );
    }
}

BackgroundJob.register({
    jobKey: VRT_VICINITY_JOB_KEY,
    job: checkPeriodicVicinityOfVRTTower
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;