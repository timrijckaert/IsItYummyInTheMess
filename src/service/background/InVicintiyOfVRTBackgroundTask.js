import LocationProviderModule from '../../util/NativeLocationProvider';
import {
    foodInteractor,
    dateHelper
} from '../../DI';
const PushNotification = require('react-native-push-notification');

const KEY = "is-in-the-vicinity-of-VRT-tower-background-task";
const VRT_ADDRESS_LAT = 50.853001;
const VRT_ADDRESS_LONG = 4.401580;
const THRESHOLD_VRT_VICINITY = 0.5; //km
const EARTH_RADIUS = 6371; //km

//Checks if you are in the vicinity of the VRT (at least for Android devices)
//Talks to a native module.
const checkPeriodicVicinityOfVRTTower = async () => {
    await LocationProviderModule.getLastKnownLocation()
        .then(({latitude, longitude}) => {
            if (_shouldShowNotification(latitude, longitude)) {
                _showNotification();
            }
        })
        .catch((error: Error) => {
            console.log(`An error occurred when trying to fetch the users location: ${error.message}`)
        });
};

//<editor-fold desc="Helper Functions">
const _showNotification = () => {
    const processFoodOptionsToNotificationText = (foodOptions) => foodOptions
        .map((foodOption) => `${foodOption.title} - ${foodOption.option}`).join("\n");

    foodInteractor().getFoodOptionsOfToday()
        .subscribe(
            foodOptions => {
                const notificationText = processFoodOptionsToNotificationText(foodOptions);
                PushNotification.localNotification(_buildNotification(notificationText));
            }
        );
};

const _shouldShowNotification = (latitude: Number, longitude: Number) => {
    (_getDistanceFromVRT(latitude, longitude) <= THRESHOLD_VRT_VICINITY) && dateHelper().isMidday();
};

const _getDistanceFromVRT = (lat: Number, lon: Number) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const dLat = deg2rad(VRT_ADDRESS_LAT - lat);
    const dLon = deg2rad(VRT_ADDRESS_LONG - lon);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(VRT_ADDRESS_LAT)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
};

const _buildNotification = (notificationText: String) => {
    return {
        id: '0',
        ticker: "My Notification Ticker",
        autoCancel: true,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText: notificationText,
        subText: `Menu voor: ${dateHelper().today()}`,
        color: "blue",
        vibrate: true,
        vibration: 300,
        tag: 'some_tag',
        group: "group",
        ongoing: false,
        title: "Is Het Lekker in de Mess",
        message: "Ja natuurlijk is het lekker in de Mess!",
        playSound: true,
        soundName: 'default',
        number: '10'
    }
};
//</editor-fold>

export {KEY, checkPeriodicVicinityOfVRTTower};