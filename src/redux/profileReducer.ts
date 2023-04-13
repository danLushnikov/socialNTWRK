import { ThunkAction } from 'redux-thunk'
import { ResultCodesEnum } from '../api/api'
import { profileAPI } from '../api/profile-api'
import { PhotosType, PostDataType, ProfileType } from '../types/commonTypes'
import { AppStateType, InferActionsTypes } from './reduxStore'
//Constants for Reducers
const ADD_POST = 'social network/profile/ADD-POST'
const SET_USER_PROFILE = 'social network/profile/SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'social network/profile/SET_PROFILE_STATUS'
const DELETE_POST = 'social network/profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'social network/profile/SAVE_PHOTO_SUCCESS'
//First initial state for first loading and type of it
let initialState = {
	profile: null as ProfileType | null,
	postData: [
		{ id: 1, message: 'Hi', likesCount: 12 },
		{ id: 2, message: 'Hey, this is my first post!', likesCount: 1 },
		{ id: 3, message: 'Hey, this is my second post!', likesCount: 0 },
		{ id: 4, message: 'Hey, this is my third post!', likesCount: 100 },
	] as Array<PostDataType>,
	status: '',
	postText: ''
}
type InitialStateType = typeof initialState
//Reducer
const profileReducer = (
	state = initialState,
	action: Action
): InitialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.postData.length + 1,
				message: action.postText,
				likesCount: 0,
			}
			return { ...state, postText: '', postData: [...state.postData, newPost] }
		case DELETE_POST:
			return {
				...state,
				postData: state.postData.filter(post => post.id !== action.id),
			}
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile }
		case SET_PROFILE_STATUS:
			return { ...state, status: action.status }
		case SAVE_PHOTO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as ProfileType,
			}

		default:
			return state
	}
}
export default profileReducer
// Actions and Actions Types
type Action = InferActionsTypes<typeof actions>
export const actions = {
	addPost: (postText: string) =>
		({
			type: ADD_POST,
			postText,
		} as const),
	deletePost: (id: number) =>
		({
			type: DELETE_POST,
			id,
		} as const),
	setUserProfile: (profile: ProfileType) =>
		({
			type: SET_USER_PROFILE,
			profile,
		} as const),
	setProfileStatus: (status: string) =>
		({
			type: SET_PROFILE_STATUS,
			status,
		} as const),
	savePhotoSuccess: (photos: PhotosType) =>
		({
			type: SAVE_PHOTO_SUCCESS,
			photos,
		} as const),
}
//Thunk middleware and type of ThunkActions
type Thunk = ThunkAction<
	Promise<any>,
	AppStateType,
	unknown,
	Action 
>
type GetState = () => AppStateType

export const getUserProfile =
	(userId: number | null): Thunk =>
	async dispatch => {
		let profileData = await profileAPI.getUserProfile(userId)
		dispatch(actions.setUserProfile(profileData))
	}
export const getProfileStatus =
	(userId: number | null): Thunk =>
	async dispatch => {
		let statusData = await profileAPI.getProfileStatus(userId)
		dispatch(actions.setProfileStatus(statusData))
	}
export const updateProfileStatus =
	(status: string): Thunk =>
	async dispatch => {
		try {
			let statusData = await profileAPI.updateProfileStatus(status)
			if (statusData.resultCode === ResultCodesEnum.Success) {
				dispatch(actions.setProfileStatus(status))
			}
		} catch (error) {}
	}
export const savePhoto =
	(file: File): Thunk =>
	async dispatch => {
		let photoData = await profileAPI.savePhoto(file)
		if (photoData.resultCode === ResultCodesEnum.Success) {
			dispatch(actions.savePhotoSuccess(photoData.data.photos))
		}
	}
export const saveProfile =
	(profile: ProfileType): Thunk =>
	async (dispatch, getState: GetState) => {
		const userId = getState().auth.id
		const response = await profileAPI.saveProfile(profile)
		if (response.resultCode === ResultCodesEnum.Success) {
			dispatch(getUserProfile(userId))
		} else {
			// dispatch(
			// 	stopSubmit('editProfile', {
			// 		_error: response.messages[0],
			// 		// "contacts": {"facebook": response.data.messages[0]}   // code for unique component error
			// 	})
			// )
			return Promise.reject(response.messages[0]) //reject for form with promise stable work
		}
	}
