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
const PushNotification = require('react-native-push-notification');
const Realm = require('realm');

export default class IsHetLekkerInDeMess extends Component {

    componentWillMount() {
        return super.componentWillMount();
        //this._registerBackgroundTask();
    }

    _handleButtonClick = () => {
        let realm = new Realm({schema: [DbFoodOption.schema, DbMenu.schema]});
        let networkService = new NetworkService();
        let dateHelper = new DateHelper();
        let databaseHelper = new DatabaseHelper(realm, dateHelper);
        let dbService = new DbService(databaseHelper);
        let foodInteractor = new FoodInteractor(networkService, dbService, databaseHelper);

        foodInteractor.getFoodOptionsOfToday();
        // .subscribe(
        //     val => alert(`Receiving results from: ${val}.`),
        //     err => {
        //         alert(`Error occurred: ${err}`);
        //     }
        // );
    };

    _handleShowNotification = (delayInSec: Number = 0) => {
        const details = {
            id: '0',
            ticker: "My Notification Ticker",
            autoCancel: true,
            largeIcon: "ic_launcher",
            smallIcon: "ic_notification",
            bigText: "My big text that will be shown when notification is expanded",
            subText: "This is a subText",
            color: "blue",
            vibrate: true,
            vibration: 300,
            tag: 'some_tag',
            group: "group",
            ongoing: false,

            title: "My Notification Title",
            message: "My Notification Message",
            playSound: true,
            soundName: 'default',
            number: '10'
        };

        if (delayInSec === 0) {
            PushNotification.localNotification(details)
        } else {
            PushNotification.localNotificationSchedule({...details, date: new Date(Date.now() + (delayInSec * 1000))});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Click me to scrape" onPress={this._handleButtonClick}/>
                <Button title="Show Random Notification" onPress={() => this._handleShowNotification()}/>
                <Button title="Dispatch Notification in 10 seconds" onPress={() => this._handleShowNotification(10)}/>
            </View>
        );
    }

    _registerBackgroundTask() {
        // BackgroundTask.register(() => {
        //     this._handleShowNotification();
        //     BackgroundTask.finish()
        // });
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

AppRegistry.registerComponent('IsHetLekkerInDeMess',
    () => IsHetLekkerInDeMess);