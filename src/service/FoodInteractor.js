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
        const networkObservable = this._getRemoteObservable(this._databaseHelper);
        const dbObservable = this._getLocalObservable();

        //noinspection JSUnresolvedFunction
        Rx.Observable.merge(
            networkObservable,
            dbObservable
        )
            .first()
            .subscribe(
                val => {
                    alert(`Receiving results from: ${val.name}.`);
                }, err => {
                    alert(`Error occurred: ${err}`);
                }, () => {}
            );
    }

    _getLocalObservable() {
        return Rx.Observable
            .fromPromise(this._dbService.getFoodOptionsOfToday())
            .filter((arr) => arr.length >= 1)
            .map((element) => {
                return {name: "Db", x: element}
            });
    }

    _getRemoteObservable(databaseHelper) {
        return Rx.Observable
            .fromPromise(this._networkService.getFoodOptionsOfToday())
            .map((networkResult) => databaseHelper.saveFoodOptions(networkResult))
            .map((element) => {
                return {name: "Nw", x: element}
            });
    }
}

export {FoodInteractor}