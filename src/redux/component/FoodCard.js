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
            <Card transparent style={styles.foodCardContainer}>
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
        textAlign: 'center'
    },
    foodOptionOption: {
        alignSelf: 'stretch',
        textAlign: 'center'
    }
});

export default FoodCard;