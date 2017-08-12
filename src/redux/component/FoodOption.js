import React from 'react';
import {Image, Text, View, Linking} from 'react-native';

const FoodOption = ({title, option}) => {
    return (
        <View>
            <Text>Title: {title}</Text>
            <Text>Optie: {option}</Text>
        </View>
    );
};

export default FoodOption;