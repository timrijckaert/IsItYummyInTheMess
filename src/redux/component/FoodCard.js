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

    render() {
        const { title, option } = this.props.foodOption;
        return (
            <Card transparent style={styles.foodCardContainer}>
                <CardItem header style={styles.foodCard}>
                    <Body>
                    <Text>{title}</Text>
                    <Text>{option}</Text>
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
    foodCard: {
        backgroundColor: '#EB5757'
    }
});

export default FoodCard;