import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import * as NativeBase from 'native-base';

const {
    Fab,
    Icon
} = NativeBase;

class RefreshFab extends Component {
    render() {
        return (
            <Fab
                style={styles.fab}
                position="bottomRight">
                <Icon name="refresh"/>
            </Fab>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#5067FF'
    }
});

function mapStateToProps(state) {
    return {...state}
}

export default connect(mapStateToProps)(RefreshFab);