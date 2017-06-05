import {DateHelper} from '../util/DateHelper';
import {lazy} from '../util/lazy';

const dateHelper = lazy(() => new DateHelper());

export {
    dateHelper
};