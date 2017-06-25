import {FoodInteractor} from '../service/FoodInteractor';
import {lazy} from '../util/lazy';
import {dbService, databaseHelper} from './db';
import {networkService} from './network';
import {VRT_VICINITY_JOB_KEY, checkPeriodicVicinityOfVRTTower} from './background';

const foodInteractor = lazy(() => new FoodInteractor(networkService(), dbService(), databaseHelper()));

export {
    foodInteractor,
    VRT_VICINITY_JOB_KEY,
    checkPeriodicVicinityOfVRTTower
};