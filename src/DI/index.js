import {FoodInteractor} from '../service/FoodInteractor';
import {lazy} from '../util/lazy';
import {dbService, databaseHelper} from './db';
import {networkService} from './network';
import {dateHelper} from './utils';
import {isInTheVicinityOfVRTBackgroundTask} from './background';
import store from './store'

const foodInteractor = lazy(() => new FoodInteractor(networkService(), dbService(), databaseHelper()));

export {
    store,

    foodInteractor,
    isInTheVicinityOfVRTBackgroundTask,
    dateHelper
};