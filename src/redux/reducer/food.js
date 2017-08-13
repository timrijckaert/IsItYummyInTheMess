import createReducers from '../lib/createReducer'
import * as types from '../action/types'

export const foodOptions = createReducers([], {
    [types.FETCH_FOOD_OPTIONS_FOR_THE_DAY](state, action){
        return action.foodOptions
    }
});