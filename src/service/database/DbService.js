const Realm = require('realm');
import {FoodOption} from '../../model/index';
import {IFoodService} from "../IFoodService";

class DbService extends IFoodService {
    getFoodOptionsOfToday() {
        return new Promise((resolve, _) => {
            resolve([
                new FoodOption("Soep", "Database Soep"),
                new FoodOption("Vlees", "Database Vlees"),
                new FoodOption("Veggie", "Database Veggie"),
                new FoodOption("-500 KCal", "Database -500 KCal"),
                new FoodOption("Grill van de week", "Database Grill"),
                new FoodOption("Groenten van de week", "Database groenten")
            ]);
        });
    }
}

export {DbService};