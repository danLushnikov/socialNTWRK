import { ThunkAction } from 'redux-thunk'
import { ResultCodesEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import { AppStateType, InferActionsTypes } from './reduxStore'
//Constants for Reducers
const SET_USER_DATA = 'social network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social network/auth/ GET_CAPTCHA_URL_SUCCESS'
//First initial state for first loading and type of it
export let initialState = {
	id: null as null | number,
	email: null as null | string,
	login: null as null | string,
	isAuth: false,
	captchaUrl: null as null | string,
}
export type InitialStateType = typeof initialState
//Reducer
const authReducer = (	state = initialState,	action: Action): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}
export default authReducer
//Actions and Action Types
type Action = InferActionsTypes<typeof actions>

export const actions = {
	setUserData: (	id: number | null,	email: string | null,	login: string | null,	isAuth: boolean) => ({
	type: SET_USER_DATA,
	payload: { id, email, login, isAuth }
	} as const),
getCaptchaUrlSuccess: (captchaUrl: string) => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
} as const)
}

//Thunk middleware and type of ThunkActions
type Thunk = ThunkAction<
	Promise<any>,
	AppStateType,
	unknown,
	Action 
>

export const getUserAuthData = (): Thunk => async dispatch => {
	const authData = await authAPI.getIsAuth()
	if (authData.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = authData.data
		dispatch(actions.setUserData(id, email, login, true))
	}
}
export const login =	(email: string, password: string,	rememberMe: boolean, captcha: string): Thunk =>
	async dispatch => {
		const loginData = await authAPI.login(email, password, rememberMe, captcha)
		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getUserAuthData())
		} else {
			if (loginData.resultCode === ResultCodesEnum.Captcha) {
				dispatch(getCaptchaUrl())
			}
			// dispatch(
			// 	stopSubmit('login', {
			// 		_error: loginData.messages
			// 			? loginData.messages[0]
			// 			: 'something wrong',
			// 	})
			// )
		}
	}
export const logout = (): Thunk => async dispatch => {
	const logoutData = await authAPI.logout()
	if (logoutData.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setUserData(null, null, null, false))
	}
}
export const getCaptchaUrl = (): Thunk => async dispatch => {
	let captchaData = await securityAPI.getCaptchaUrl()
	const captchaUrl = captchaData.url
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
