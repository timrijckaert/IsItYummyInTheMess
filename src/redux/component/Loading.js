import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import UiFunctions from './uiFunctions'
import { connect } from 'react-redux'
import * as NativeBase from 'native-base';

const {
    Body,
    Spinner,
    Text
} = NativeBase;

class Loading extends Component {

    fetchingMessages = [
        "Ophalen van lekkere gerechten.",
        "Njam njam",
        "Lekker in de mess",
        "Zouden het frietjes zijn vandaag?!",
        "Snellllleeeeeerrr!",
        "Broodjes Smeren ..."
    ];

    _getRandomFetchingMessage() {
        return this.fetchingMessages[Math.floor(Math.random() * this.fetchingMessages.length)];
    }

    render() {
        const { spinnerContainer, spinner, spinnerSubText } = styles;
        return (
            UiFunctions.renderIf(this.hasNoFoodOptions(),
                <Body style={spinnerContainer}>
                <Spinner color='#FFFFFF'/>
                <Text style={spinnerSubText}>{this._getRandomFetchingMessage()}</Text>
                </Body>
            )
        );
    }

    hasNoFoodOptions() {
        return !this.props.hasFoodOptions
    }
}

const styles = StyleSheet.create({
    spinnerContainer: {},
    spinnerSubText: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
    return {
        hasFoodOptions : state.foodOptions.length !== 0
    };
}

export default connect(mapStateToProps)(Loading);