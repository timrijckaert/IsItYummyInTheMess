import {FoodInteractor} from '../service/FoodInteractor';
import {lazy} from '../util/lazy';
import {dbService, databaseHelper} from './db';
import {networkService} from './network';

const foodInteractor = lazy(() => {
    return new FoodInteractor(networkService(), dbService(), databaseHelper());
});

export {foodInteractor};