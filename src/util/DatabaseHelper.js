const Realm = require('realm');
class DatabaseHelper {

    constructor(dateHelper) {
        this._dateHelper = dateHelper;
    }

    saveResultFor(date, results) {
        return true;
    }
}

export {DatabaseHelper}