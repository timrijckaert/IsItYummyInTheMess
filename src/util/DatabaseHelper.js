import {
    DbFoodOption,
    DbMenu,
    FoodOption
} from '../model';

class DatabaseHelper {

    constructor(realm, dateHelper) {
        this._dateHelper = dateHelper;
        this._realm = realm;
    }

    saveFoodOptionsForToday(foodOptionsArr) {
        let todaysDateStr = this._dateHelper.today();
        const dbFoodOptions = Array.from(foodOptionsArr, foodOption =>
            new DbFoodOption(`${todaysDateStr}${foodOption.title}`, foodOption.title, foodOption.option)
        );
        const dbMenu = new DbMenu(dbFoodOptions, todaysDateStr);
        this._realm.write(() => {
            this._realm.create(DbMenu.realmClassName(), dbMenu)
        });
    }

    getFoodOptionsForToday() {
        return this._getFoodOptionsForDate(this._dateHelper.today());
    }

    _getFoodOptionsForDate(date) {
        const mapDbFoodOptionToFoodOption = (foodOption) => new FoodOption(foodOption._title, foodOption._option);
        //noinspection JSUnresolvedFunction
        const menuForDate = this._realm.objects(DbMenu.realmClassName()).filtered(`_date = "${date}"`).slice();
        const foodOptionsArr = menuForDate.map((dbMenu) => dbMenu._dbFoodOptions.map((dbFoodOption) => mapDbFoodOptionToFoodOption(dbFoodOption)));
        return foodOptionsArr.length >= 1 ? foodOptionsArr[0] : foodOptionsArr;
    }
}

export {DatabaseHelper}