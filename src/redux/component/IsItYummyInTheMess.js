import React, { Component } from 'react';
import BackgroundJob from "react-native-background-job";
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionsCreators } from '../action'
import StatusBar from './StatusBar'
import Loading from './Loading'
import FoodOptionsList from './FoodOptionsList'
import RefreshFab from './RefreshFab'

const {Container, Content} = NativeBase;

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
        //noinspection JSUnresolvedFunction
        this.props.fetchFoodOptionsForTodayAction();
    }

    render() {
        return (
            <Container style={styles.appContainer}>
                <StatusBar/>
                <Content contentContainerStyle={styles.contentContainer}>
                    <Loading/>
                    <RefreshFab />
                    <FoodOptionsList/>
                </Content>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionsCreators, dispatch);
}

function mapStateToProps(state) {
    return {...state};
}

BackgroundJob.register({
    jobKey: isInTheVicinityOfVRTBackgroundTask.KEY,
    job: isInTheVicinityOfVRTBackgroundTask.checkPeriodicVicinityOfVRTTower
});

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: '#2E2D2D'
    },
    contentContainer: {
        flex: 1
    }
});

// It provides the actions to the underlying components.
// The first function is a function to manipulate the store
export default connect(mapStateToProps, mapDispatchToProps)(IsItYummyInTheMess);