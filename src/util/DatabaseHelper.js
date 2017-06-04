import {DbFoodOption, DbMenu} from '../model';

class DatabaseHelper {

    constructor(realm, dateHelper) {
        this._dateHelper = dateHelper;
        this._realm = realm;
    }

    saveResultFor(foodOptionsArr) {
        let todaysDateStr = this._dateHelper.today();
        const dbFoodOptions = Array.from(foodOptionsArr, foodOption =>
            new DbFoodOption(`${todaysDateStr}${foodOption.title}`, foodOption.title, foodOption.option)
        );
        const dbMenu = new DbMenu(dbFoodOptions, todaysDateStr);
        this._realm.write(() => {this._realm.create(DbMenu.realmClassName(), dbMenu)});
    }

    getMenuFor(date) {
        return new DbMenu(null, this._dateHelper.today());
    }
}

export {DatabaseHelper}