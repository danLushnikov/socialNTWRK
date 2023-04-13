import { AppStateType } from './reduxStore'

export const getIsAuthSelector = (state: AppStateType) => {
	return state.auth.isAuth
}
export const getCaptchaSelector = (state: AppStateType) => {
	return state.auth.captchaUrl
}
