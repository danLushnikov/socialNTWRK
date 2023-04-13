import { ContactsType, PhotosType, ProfileType } from '../types/commonTypes'
import { CommonResponseType, instance } from './api'

type PhotosResponseType = {
	photos: {
		small: string
		large: string
	}
}

export const profileAPI = {
	async getUserProfile(userId: number | null) {
		const response = await instance.get<ProfileType>(`profile/` + userId)
		return response.data
	},
	async saveProfile(profile: ProfileType) {
		debugger;
		const response = await instance.put<CommonResponseType>(`profile`, profile)
		return response.data
	},
	async getProfileStatus(userId: number | null) {
		const response = await instance.get<string>(`profile/status/` + userId)
		return response.data
	},
	async updateProfileStatus(status: string) {
		const response = await instance.put<CommonResponseType>(`profile/status`, {
			status: status,
		})
		return response.data
	},
	async savePhoto(file: File) {
		const formData = new FormData()
		formData.append('image', file)
		const response = await instance.put<CommonResponseType<PhotosResponseType>>(
			`profile/photo`,
			formData
		)
		return response.data
	},
}
