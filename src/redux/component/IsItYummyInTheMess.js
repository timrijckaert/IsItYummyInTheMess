import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import BackgroundJob from "react-native-background-job";
import { StyleSheet, View } from 'react-native';
import FoodList from "./FoodList";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionsCreators } from '../action'

import { VRT_VICINITY_JOB_KEY, checkPeriodicVicinityOfVRTTower } from '../../DI';

class IsItYummyInTheMess extends Component {
    componentWillMount() {
        BackgroundJob.cancelAll();
        BackgroundJob.schedule({
            jobKey: VRT_VICINITY_JOB_KEY,
            timeout: Number.MAX_SAFE_INTEGER,
            period: 60 * 60 * 1000, // 1 hour
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsCreators, dispatch);
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

// mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively.
// Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.

// It provides the actions to the underlying components.
// The first function is a function to manipulate the store
export default connect(() => {
    return {}
}, mapDispatchToProps)(IsItYummyInTheMess);