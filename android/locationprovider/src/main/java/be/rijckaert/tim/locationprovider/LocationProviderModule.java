package be.rijckaert.tim.locationprovider;

import android.Manifest;
import android.location.Location;
import android.location.LocationManager;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import static android.content.Context.LOCATION_SERVICE;
import static android.content.pm.PackageManager.PERMISSION_GRANTED;
import static android.support.v4.content.ContextCompat.checkSelfPermission;

class LocationProviderModule extends ReactContextBaseJavaModule {

    private final LocationManager locationManager;

    private static final String PERMISSION_NOT_GRANTED_ERROR_CODE = "-1";
    private static final String LOCATION_NOT_FOUND = "-2";

    public LocationProviderModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        this.locationManager = (LocationManager) reactContext.getApplicationContext().getSystemService(LOCATION_SERVICE);
    }

    @Override
    public String getName() {
        return "LocationProviderModule";
    }

    @ReactMethod
    public void getLastKnownLocation(final Promise onLocationSuccessfullyFetched) {
        if (checkLocationPermission(onLocationSuccessfullyFetched)) return;

        final Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        if (lastKnownLocation != null) {
            onLocationSuccessfullyFetched.resolve(getJSMapFromLocation(lastKnownLocation));
        } else {
            onLocationSuccessfullyFetched.reject(LOCATION_NOT_FOUND, "No location found for the user.");
        }
    }

    private WritableMap getJSMapFromLocation(@NonNull  final Location location) {
        final WritableMap map = Arguments.createMap();
        map.putDouble("longitude", location.getLongitude());
        map.putDouble("latitude", location.getLatitude());
        map.putDouble("accuracy", location.getAccuracy());
        return map;
    }

    private boolean checkLocationPermission(final Promise onLocationSuccessfullyFetched) {
        if (checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PERMISSION_GRANTED &&
                checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PERMISSION_GRANTED) {
            onLocationSuccessfullyFetched.reject(PERMISSION_NOT_GRANTED_ERROR_CODE, "You don't have the right permissions for this action.");
            return true;
        }
        return false;
    }
}
