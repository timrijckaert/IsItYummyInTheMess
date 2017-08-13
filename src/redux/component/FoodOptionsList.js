import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';
import { connect } from 'react-redux'
import FoodCard from './FoodCard'

const {
    List,
    ListItem,
    Text
} = NativeBase;

class FoodOptionsList extends Component {

    _renderFoodOption(item) {
        return (
            <ListItem style={styles.listItem}>
                <FoodCard foodOption={item}/>
            </ListItem>
        )
    }

    render() {
        return (
            <List dataArray={this.props.foodOptions}
                  renderRow={this._renderFoodOption}/>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 0
    }
});

function mapStateToProps(state) {
    return { ...state }
}

export default connect(mapStateToProps)(FoodOptionsList);