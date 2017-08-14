import * as types from './types'
import { foodInteractor } from '../../DI'

export function fetchFoodOptionsForTodayAction(forcedNetworkRequest = false) {
    return (dispatch, getState) => {
        foodInteractor().getFoodOptionsOfToday(forcedNetworkRequest)
            .subscribe(
                foodOptions => {
                    const foodOptionsForTodayAction = setFoodOptionsForTodayAction({foodOptions});
                    return dispatch(foodOptionsForTodayAction);
                },
                err => alert(`Error occurred: ${err}`)
            )
    }
}

export function refreshFoodOptionsForTodayAction() {
    return (dispatch, getState) => {
        //clear the state
        dispatch({
            type: types.REFRESH_FOOD_OPTIONS_FOR_THE_DAY,
            foodOptions: []
        });
        dispatch(fetchFoodOptionsForTodayAction(true));
    };
}

export function setFoodOptionsForTodayAction({foodOptions}) {
    return {
        type: types.FETCH_FOOD_OPTIONS_FOR_THE_DAY,
        foodOptions
    }
}