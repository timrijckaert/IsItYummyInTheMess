import {IFoodService} from "../IFoodService";

class DbService extends IFoodService {

    constructor(databaseHelper) {
        super();
        this._databaseHelper = databaseHelper;
    }

    getFoodOptionsOfToday() {
        const databaseHelper = this._databaseHelper;
        return new Promise((resolve, _) => {
            resolve(databaseHelper.getFoodOptionsForToday());
        });
    }
}

export {DbService};