import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import BackgroundJob from "react-native-background-job";
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import FoodList from "./FoodList";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionsCreators } from '../action'

import { isInTheVicinityOfVRTBackgroundTask } from '../../DI';

class IsItYummyInTheMess extends Component {

    componentWillMount() {
        BackgroundJob.cancelAll();
        BackgroundJob.schedule({
            jobKey: isInTheVicinityOfVRTBackgroundTask.KEY,
            timeout: Number.MAX_SAFE_INTEGER,
            period: 60 * 60 * 1000, // 1 hour
            persist: true
        });
        this._fetchFoodOptionsForToday();
    }

    _fetchFoodOptionsForToday() {
        //noinspection JSUnresolvedFunction
        this.props.fetchFoodOptionsForTodayAction();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {this.props.foodOptions.length}
                </Text>
                <TouchableHighlight onPress={() => {
                    this._fetchFoodOptionsForToday()
                }}>
                    <Text>Fetch FoodOptions of the day</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsCreators, dispatch);
}

function mapStateToProps(state) {
    return { ...state };
}

BackgroundJob.register({
    jobKey: isInTheVicinityOfVRTBackgroundTask.KEY,
    job: isInTheVicinityOfVRTBackgroundTask.checkPeriodicVicinityOfVRTTower
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
export default connect(mapStateToProps, mapDispatchToProps)(IsItYummyInTheMess);