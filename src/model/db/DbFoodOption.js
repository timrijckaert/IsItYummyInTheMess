export class DbFoodOption {
    static realmClassName() {
        return DbFoodOption.REALM_NAME;
    }

    constructor(id, title, option) {
        this._id = id;
        this._title = title;
        this._option = option;
    }
}

DbFoodOption.REALM_NAME = "DbFoodOption";
DbFoodOption.schema = {
    name: DbFoodOption.REALM_NAME,
    primaryKey: '_id',
    properties: {
        _id: 'string',
        _title: 'string',
        _option: 'string'
    }
};