import * as types from './types'
import { foodInteractor } from '../../DI'

export function fetchFoodOptionsForTodayAction() {
    return (dispatch, getState) => {
        foodInteractor().getFoodOptionsOfToday()
            .subscribe(
                foodOptions => {
                    const foodOptionsForTodayAction = setFoodOptionsForTodayAction({ foodOptions });
                    return dispatch(foodOptionsForTodayAction);
                },
                err => alert(`Error occurred: ${err}`)
            )
    }
}

export function setFoodOptionsForTodayAction({ foodOptions }) {
    return {
        type: types.FETCH_FOOD_OPTIONS_FOR_THE_DAY,
        foodOptions
    }
}