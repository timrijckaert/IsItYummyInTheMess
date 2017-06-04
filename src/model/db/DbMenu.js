import {DbFoodOption} from '../index';

export class DbMenu {
    static realmClassName() {
        return DbMenu.REALM_NAME;
    }

    constructor(dbFoodOptions, date) {
        this._dbFoodOptions = dbFoodOptions;
        this._date = date;
    }
}

DbMenu.REALM_NAME = "DbMenu";
DbMenu.schema = {
    name: DbMenu.REALM_NAME,
    properties: {
        _dbFoodOptions: {type: 'list', objectType: DbFoodOption.realmClassName()},
        _date: 'string'
    }
};