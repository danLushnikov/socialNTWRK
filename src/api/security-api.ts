import {instance} from './api'


type CaptchaResponseType = {
	url:string
}
export const securityAPI = {
async	getCaptchaUrl() {
		let response = await instance.get<CaptchaResponseType>(`security/get-captcha-url`)
		return response.data
	}
}