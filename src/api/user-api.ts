import { FilterType } from '../redux/usersReducer'
import { UsersType } from '../types/commonTypes'
import { CommonResponseType, instance } from './api'

type RequestUsersResponseType = {
	items: Array<UsersType>
	totalCount: number
	error: string|null
}
export const usersAPI = {
	async requestUsers(currentPage: number, pageSize: number,term:string='', friend:null|boolean=null,) {
		let response = await instance.get<RequestUsersResponseType>(
			`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend ===null?'':`&friend= ${friend}`)
		)
		return response.data
	},
	async unFollowAPI(id: number) {
		let response = await instance.delete<CommonResponseType>(`follow/${id}`)
		return response.data
	},
	async followAPI(id: number) {
		let response = await instance.post<CommonResponseType>(`follow/${id}`)
		return response.data
	}
}
