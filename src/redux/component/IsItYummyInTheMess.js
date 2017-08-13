import React, { Component } from 'react';
import BackgroundJob from "react-native-background-job";
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';

const {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Card,
    CardItem,
    Spinner
} = NativeBase;
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionsCreators } from '../action'
import StatusBar from './StatusBar'
import Loading from './Loading'

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
                    {/*                    <Card transparent style={{ backgroundColor: 0 }}>
                        <CardItem header style={{ backgroundColor: '#EB5757', minHeight: 150 }}>
                            <Body>
                            <Text>This is an example</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ backgroundColor: 0 }}>
                        <CardItem header style={{ backgroundColor: '#F2994A' }}>
                            <Body>
                            <Text>This is an example</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ backgroundColor: 0 }}>
                        <CardItem header style={{ backgroundColor: '#F2C94C' }}>
                            <Body>
                            <Text>This is an example</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ backgroundColor: 0 }}>
                        <CardItem header style={{ backgroundColor: '#219653' }}>
                            <Body>
                            <Text>This is an example</Text>
                            </Body>
                        </CardItem>
                    </Card>*/}
                </Content>
            </Container>
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