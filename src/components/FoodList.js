import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {foodInteractor} from '../DI';
import FoodOption from './FoodOption'

class FoodList extends Component {

    state = {
        foodOptions: []
    };

    componentWillMount() {
        foodInteractor().getFoodOptionsOfToday()
            .subscribe(
                val => this.setState({foodOptions: val}),
                err => {alert(`Error occurred: ${err}`);}
            );
    }

    _renderFoodOptions() {
        return this.state.foodOptions.map(foodOption => <FoodOption title={foodOption.title} option={foodOption.option}/>)
    }

    render() {
        return (
            <ScrollView>
                {this._renderFoodOptions()}
            </ScrollView>
        );
    }
}

export default FoodList;