import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';

const {
    Card,
    CardItem,
    Body,
    Text
} = NativeBase;

class FoodCard extends Component {

    colors = [
        '#EB5757',
        '#F2994A',
        '#F2C94C',
        '#219653',
        '#27AE60',
        '#2F80ED',
        '#9B51E0'
    ];

    _getCardItemStyle(id) {
        return {
            backgroundColor: this.colors[id % this.colors.length]
        };
    }

    render() {
        const { id, title, option } = this.props.foodOption;
        return (
            <Card style={styles.foodCardContainer}>
                <CardItem style={this._getCardItemStyle(id)}>
                    <Body>
                    <Text style={styles.foodOptionTitle}>- {title} -</Text>
                    <Text style={styles.foodOptionOption}>{option}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    foodCardContainer: {
        backgroundColor: 0
    },
    foodOptionTitle: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: 'courgette',
        fontSize: 22,
        color: '#211818'
    },
    foodOptionOption: {
        alignSelf: 'stretch',
        textAlign: 'center',
        fontFamily: 'lobster',
        fontSize: 24,
        color: '#211818'
    }
});

export default FoodCard;