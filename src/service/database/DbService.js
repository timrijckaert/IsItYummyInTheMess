import {IFoodService} from "../IFoodService";

class DbService extends IFoodService {

    constructor(databaseHelper, dateHelper) {
        super();
        this._databaseHelper = databaseHelper;
        this._dateHelper = dateHelper;
    }

    getFoodOptionsOfToday() {
        const databaseHelper = this._databaseHelper;
        const today = this._dateHelper.today();
        return new Promise((resolve, _) => {
            resolve(databaseHelper.getMenuFor(today));
        });
    }
}

export {DbService};