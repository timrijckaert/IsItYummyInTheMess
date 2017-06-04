import * as Rx from "rxjs";
import {IFoodService} from "./IFoodService";

class FoodInteractor extends IFoodService {

    constructor(networkService, dbService, databaseHelper) {
        super();
        this._networkService = networkService;
        this._dbService = dbService;
        this._databaseHelper = databaseHelper;
    }

    getFoodOptionsOfToday() {
        let networkObservable = this._getRemoteObservable(this._databaseHelper);
        let dbObservable = this._getLocalObservable();

        //noinspection JSUnresolvedFunction
        Rx.Observable.merge(
            networkObservable,
            dbObservable
        )
            .first()
            .subscribe(val => {
                alert(val);
            });
    }

    _getLocalObservable() {
        return Rx.Observable
            .fromPromise(this._dbService.getFoodOptionsOfToday());
    }

    _getRemoteObservable(databaseHelper) {
        return Rx.Observable.empty();
/*        Rx.Observable
            .fromPromise(this._networkService.getFoodOptionsOfToday())
            .map((networkResult) => databaseHelper.saveResultFor(networkResult));*/
    }
}

export {FoodInteractor}