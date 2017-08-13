import { DateHelper } from '../util/DateHelper';
import { lazy } from '../util/lazy';
import { createLogger } from "redux-logger";

const dateHelper = lazy(() => new DateHelper());
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

export {
    dateHelper,
    loggerMiddleware
};