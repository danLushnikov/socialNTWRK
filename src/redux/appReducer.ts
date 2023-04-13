import { ThunkAction } from 'redux-thunk'
import { getUserAuthData } from './authReducer'
import { AppStateType, InferActionsTypes } from './reduxStore'
//Constants for Reducers
const SET_INITIALIZED_SUCCESS = 'social network/app/SET_INITIALIZED_SUCCESS'
//First initial state for first loading and type of it
let initialState = {
	initialized: false
}
type InitialStateType = typeof initialState
//Reducer
const appReducer = (state = initialState, action: Action): InitialStateType => {
	switch (action.type) {
		case SET_INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
				
			}
		default:
			return state
	}
}
//Action & Action Type
type Action = InferActionsTypes<typeof actions>
export const actions = {
	initializedSuccess: () => ({
	type: SET_INITIALIZED_SUCCESS
})
}
//Thunk middleware and type of ThunkActions
type Thunk = ThunkAction<void, AppStateType, unknown, Action>

export const initializeApp = (): Thunk => dispatch => {
	let promise = dispatch(getUserAuthData())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}
export default appReducer
