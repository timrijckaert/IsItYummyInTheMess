import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../redux/reducer'

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunk
        ),
    );
    return createStore(reducer, initialState, enhancer)
}

const store = configureStore({});

export default store