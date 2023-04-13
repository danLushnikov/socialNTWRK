import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ResultCodesEnum } from '../api/api'
import { usersAPI } from '../api/user-api'
import { UsersType } from '../types/commonTypes'
import { AppStateType, InferActionsTypes } from './reduxStore'
//Constants for Reducers
const FOLLOWING_TOGGLE = 'social network/users/FOLLOWING_TOGGLE'
const SET_USERS = 'social network/users/SET_USERS'
const SET_CURRENT_PAGE = 'social network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'social network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'social network/users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS =
	'social network/users/TOGGLE_FOLLOWING_IN_PROGRESS'
const SET_FILTER = 'social network/users/SET_FILTER'
//First initial state for first loading and type of it
let initialState = {
	users: [] as Array<UsersType>,
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	filter: {
		term: '',
		friend: null as null | boolean,
	},
	isFetching: false,
	followingInProgress: [] as Array<number>, //array of usersId
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
//Reducer
const usersReducer = (
	state = initialState,
	action: Action
): InitialStateType => {
	switch (action.type) {
		case FOLLOWING_TOGGLE: {
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: !u.followed }
					}
					return u
				}),
			}
		}
		case SET_USERS:
			return { ...state, users: action.users }
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage }
		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalUsersCount }
		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching }
		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId),
			}
		case SET_FILTER:
			return { ...state, filter: action.payload }
		default:
			return state
	}
}
export default usersReducer

//Actions and Actions Types
type Action = InferActionsTypes<typeof actions>

export const actions = {
	followingToggle: (userId: number) =>
		({ type: FOLLOWING_TOGGLE, userId } as const),

	setUsers: (users: Array<UsersType>) => ({ type: SET_USERS, users } as const),

	setCurrentPage: (currentPage: number) =>
		({ type: SET_CURRENT_PAGE, currentPage } as const),

	setFilter: (filter: FilterType) =>
		({ type: SET_FILTER, payload: filter } as const),

	setTotalUsersCount: (totalUsersCount: number) =>
		({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const),

	toggleIsFetching: (isFetching: boolean) =>
		({ type: TOGGLE_IS_FETCHING, isFetching } as const),

	toggleFollowingProgress: (isFetching: boolean, userId: number) =>
		({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId } as const),
}
//Thunk middleware and type of ThunkActions
type Thunk = ThunkAction<Promise<any>, AppStateType, unknown, Action >
type TDispatch = Dispatch<Action>

export const addUsers =
	(currentPage: number, pageSize: number, filter: FilterType): Thunk =>
	async dispatch => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setCurrentPage(currentPage))
		dispatch(actions.setFilter(filter))

		const usersData = await usersAPI.requestUsers(
			currentPage,
			pageSize,
			filter.term,
			filter.friend
		)
		dispatch(actions.toggleIsFetching(false))
		dispatch(actions.setUsers(usersData.items))
		dispatch(actions.setTotalUsersCount(usersData.totalCount))
	}

const _followUnFollow = async (
	dispatch: TDispatch,
	userId: number,
	apiMethod: any
) => {
	dispatch(actions.toggleFollowingProgress(true, userId))
	const followToggleData = await apiMethod(userId)
	if (followToggleData.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.followingToggle(userId))
	}
	dispatch(actions.toggleFollowingProgress(false, userId))
}
export const unFollow =
	(userId: number): Thunk =>
	async dispatch => {
		_followUnFollow(dispatch, userId, usersAPI.unFollowAPI)
	}
export const follow =
	(userId: number): Thunk =>
	async dispatch => {
		_followUnFollow(dispatch, userId, usersAPI.followAPI)
	}
