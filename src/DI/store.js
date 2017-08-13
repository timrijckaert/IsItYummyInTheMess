import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../redux/reducer'
import { loggerMiddleware } from './utils'

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunk,
            loggerMiddleware
        ),
    );
    return createStore(reducer, initialState, enhancer)
}

const store = configureStore({});

export default store