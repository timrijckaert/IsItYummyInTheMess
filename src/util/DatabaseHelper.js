const Realm = require('realm');
class DatabaseHelper {

    constructor(dateHelper) {
        this._dateHelper = dateHelper;
    }

    saveResultFor(date, results) {
        const resultsWithTodayDate = results.map((result) => result.date = date);
        alert(resultsWithTodayDate);
    }
}

export {DatabaseHelper}