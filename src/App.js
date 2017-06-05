import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';

const PushNotification = require('react-native-push-notification');
import {foodInteractor} from './DI';

class App extends Component {

    _handleButtonClick = () => {
        foodInteractor().getFoodOptionsOfToday()
            .subscribe(
                val => alert(`Receiving results from: ${val}.`),
                err => {
                    alert(`Error occurred: ${err}`);
                }
            );
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

export default App;