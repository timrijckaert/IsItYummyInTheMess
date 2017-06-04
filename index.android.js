import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Button
} from 'react-native';
import {FoodInteractor} from './src/service/FoodInteractor';
import {NetworkService} from './src/service/network/NetworkService';
import {DbService} from './src/service/database/DbService';
import {DateHelper} from "./src/util/DateHelper";
import {DatabaseHelper} from "./src/util/DatabaseHelper";
import {DbFoodOption, DbMenu} from "./src/model"
const Realm = require('realm');

export default class IsHetLekkerInDeMess extends Component {

    _handleButtonClick = () => {
        let realm = new Realm({schema: [DbFoodOption.schema, DbMenu.schema]});
        let networkService = new NetworkService();
        let dateHelper = new DateHelper();
        let databaseHelper = new DatabaseHelper(realm, dateHelper);
        let dbService = new DbService(databaseHelper);
        let foodInteractor = new FoodInteractor(networkService, dbService, databaseHelper);

        foodInteractor.getFoodOptionsOfToday()
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Click me to scrape" onPress={this._handleButtonClick}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('IsHetLekkerInDeMess', () => IsHetLekkerInDeMess);