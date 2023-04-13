import { CommonResponseType, instance } from './api'

type AuthDataType = {
	id: number
	email: string
	login: string
}
type LoginDataType = {
	userId: number
}
export const authAPI = {
	async getIsAuth() {
		const response = await instance.get<CommonResponseType<AuthDataType>>(`auth/me`)
		return response.data
	},
	async login(
		email: string,
		password: string,
		rememberMe: boolean,
		captcha: string | null
	) {
		const response = await instance.post<CommonResponseType<LoginDataType>>(`auth/login`,{
				email,
				password,
				rememberMe,
				captcha
			}
		)
		return response.data
	},
	async logout() {
		const response = await instance.delete<CommonResponseType>(`auth/login`)
		return response.data
	}
}
