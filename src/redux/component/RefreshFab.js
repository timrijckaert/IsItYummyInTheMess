import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';

const {Fab, Icon} = NativeBase;

class RefreshFab extends Component {
    render() {
        return (
            <Fab
                onPress={() => this.props.onRefreshFabButtonClicked()}
                active
                style={styles.fab}>
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

export default RefreshFab