import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import {
    foodInteractor,
    VRT_VICINITY_JOB_KEY,
    checkPeriodicVicinityOfVRTTower
} from './DI';

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

import BackgroundJob from "react-native-background-job";
import FoodList from "./components/FoodList";

class App extends Component {

    state = {
        isLoading: true
    };

    constructor() {
        super();
    }

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
            <Container style={{ backgroundColor: '#2E2D2D' }}>
                <Header style={{ backgroundColor: '#000000' }} androidStatusBarColor='#000000'>
                    <Body>
                    <Title>Is Het Lekker?</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 8 }}>
                    {renderIf(true,
                        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner color='#FFFFFF'/>
                        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Lekkere gerechten ophalen.</Text>
                        </Body>
                    )}
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

function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

export default App;