import LocationProviderModule from '../../util/NativeLocationProvider';
import {dateHelper} from '../../DI';
const PushNotification = require('react-native-push-notification');

const VRT_VICINITY_JOB_KEY = "is-in-the-vicinity-of-VRT-tower-background-task";
const VRT_ADDRESS_LAT = 50.853001;
const VRT_ADDRESS_LONG = 4.401580;
const TRESHOLD_VRT_VICINITY = 0.5; //km
const EARTH_RADIUS = 6371; //km
const NOTIFICATION_BUILDER = {
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

//Periodic function that runs in the background (at least for Android devices)
//https://www.npmjs.com/package/react-native-background-job
//https://facebook.github.io/react-native/docs/headless-js-android.html
//Checks if you are in the vicinity (RADIUS) of the VRT tower.
//TODO Go to a native implementation for Android
const checkPeriodicVicinityOfVRTTower = async () => {
    await LocationProviderModule.getLastKnownLocation()
        .then(({longitude, latitude}) => {
            const distanceFromVRTTower = getDistanceFromVRT(latitude, longitude);
            if (shouldShowNotification(distanceFromVRTTower)) {
                PushNotification.localNotification(NOTIFICATION_BUILDER);
            }
        })
        .catch((error: Error) => {
            console.log(`An error occurred: ${error.message}`)
        });
};

const shouldShowNotification = (distanceFromVRTTower) => {
    (distanceFromVRTTower <= TRESHOLD_VRT_VICINITY) && dateHelper().isMidday();
};

const getDistanceFromVRT = (lat: Number, lon: Number) => {
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

export {VRT_VICINITY_JOB_KEY, checkPeriodicVicinityOfVRTTower};