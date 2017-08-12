import {FoodInteractor} from '../service/FoodInteractor';
import {lazy} from '../util/lazy';
import {dbService, databaseHelper} from './db';
import {networkService} from './network';
import {dateHelper} from './utils';
import {VRT_VICINITY_JOB_KEY, checkPeriodicVicinityOfVRTTower} from './background';
import store from './store'

const foodInteractor = lazy(() => new FoodInteractor(networkService(), dbService(), databaseHelper()));

export {
    store,

    foodInteractor,
    VRT_VICINITY_JOB_KEY,
    checkPeriodicVicinityOfVRTTower,
    dateHelper
};