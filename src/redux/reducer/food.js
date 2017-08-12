import createReducers from '../lib/createReducer'
import * as types from '../action/types'
import { FoodOption } from '../../model'
import { foodInteractor } from '../../DI'

export const foodOptions = createReducers([], {
    [types.FOOD_OPTIONS_FOR_THE_DAY](state, action){
        return [
            new FoodOption("Soep", "Wortelsoep"),
            new FoodOption("Dagschotel", "Frietjes met frikandon")
        ]
    }
});