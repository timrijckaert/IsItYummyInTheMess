import {DbService} from '../service/database/DbService';
import {DatabaseHelper} from '../util/DatabaseHelper';
import {DbFoodOption, DbMenu} from '../model'
import {lazy} from '../util/lazy';
import {lazyDateHelper} from './utils';
const Realm = require('realm');

const realm = lazy(() =>  new Realm({schema: [DbFoodOption.schema, DbMenu.schema]}));
const databaseHelper = lazy(() => new DatabaseHelper(realm(), lazyDateHelper()));
const dbService = lazy(() => new DbService(databaseHelper()));

export {
    databaseHelper,
    dbService
};