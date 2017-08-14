import * as Rx from "rxjs";
import { IFoodService } from "./IFoodService";

class FoodInteractor extends IFoodService {

    constructor(networkService, dbService, databaseHelper) {
        super();
        this._networkService = networkService;
        this._dbService = dbService;
        this._databaseHelper = databaseHelper;
    }

    getFoodOptionsOfToday(fetchFromRemote = false) {
        const networkObservable = this._getRemoteObservable(this._databaseHelper);
        const dbObservable = this._getLocalObservable();

        return FoodInteractor._getMergedObservable(networkObservable, dbObservable, fetchFromRemote);
    }

    static _getMergedObservable(networkObservable, dbObservable, fetchFromRemote) {
        return fetchFromRemote ?
            networkObservable :
            Rx.Observable.merge(
                networkObservable,
                dbObservable
            ).first();
    }

    _getLocalObservable() {
        return Rx.Observable
            .fromPromise(this._dbService.getFoodOptionsOfToday())
            .filter((arr) => arr.length >= 1);
    }

    _getRemoteObservable(databaseHelper) {
        return Rx.Observable
            .fromPromise(this._networkService.getFoodOptionsOfToday())
            .do((networkResult) => databaseHelper.saveFoodOptionsForToday(networkResult));
    }
}

export { FoodInteractor }