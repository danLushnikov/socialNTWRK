import axios from "axios";


export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		"API-KEY": "b67fc368-f9f6-4d2f-974d-c60302a72150"
	}
});

export enum ResultCodesEnum{
	Success = 0,
	Error = 1,
	Captcha = 10
}

export type CommonResponseType<T = {}, RC = ResultCodesEnum > = {
	data: T
	messages: Array<string>
	resultCode: RC
}