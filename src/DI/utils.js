import {DateHelper} from '../util/DateHelper';
import {lazy} from '../util/lazy';

const dateHelper = lazy(() => {
    return new DateHelper();
});

export {
    dateHelper
};