import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';
const {
    Header,
    Title,
    Right,
    Body
} = NativeBase;

class StatusBar extends Component {
    render() {
        return (
            <Header style={styles.headerStyle} androidStatusBarColor='#000000'>
                <Body>
                <Title>Is Het Lekker?</Title>
                </Body>
                <Right/>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#000000',
    }
});

export default StatusBar;