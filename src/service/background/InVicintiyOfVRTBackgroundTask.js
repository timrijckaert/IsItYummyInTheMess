import LocationProviderModule from '../../util/NativeLocationProvider';
const PushNotification = require('react-native-push-notification');

const VRT_VICINITY_JOB_KEY = "is-in-the-vicinity-of-VRT-tower-background-task";
const VRT_ADDRESS_LAT = 50.853001;
const VRT_ADDRESS_LONG = 4.401580;
const TRESHOLD_VRT_VICINITY = 0.5; //km
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
    const {longitude, latitude} = await LocationProviderModule.getLastKnownLocation();
    const distanceFromVRTTower = getDistanceFromVRTTower(latitude, longitude);

    if (distanceFromVRTTower <=TRESHOLD_VRT_VICINITY) {
        PushNotification.localNotification(NOTIFICATION_BUILDER);
    }
};
function getDistanceFromVRTTower(lat : Number, lon : Number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(VRT_ADDRESS_LAT - lat);  // deg2rad below
    const dLon = deg2rad(VRT_ADDRESS_LONG - lon);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(VRT_ADDRESS_LAT)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     // Distance in km
    return R * c;

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
}

export {VRT_VICINITY_JOB_KEY, checkPeriodicVicinityOfVRTTower};