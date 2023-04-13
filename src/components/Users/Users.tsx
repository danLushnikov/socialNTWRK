import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { AnyAction } from 'redux'
import { AppDispatch } from '../../redux/reduxStore'
import {
	addUsers,
	FilterType,
	follow,
	unFollow,
} from '../../redux/usersReducer'
import {
	getCurrentPage,
	getFilter,
	getFollowingInProgress,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/usersSelector'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import s from './Users.module.css'
import { UsersSearchForm } from './UsersSearchForm'

export const Users: React.FC = () => {
	const users = useSelector(getUsers)
	const totalUsersCount = useSelector(getTotalUsersCount)
	const currentPage = useSelector(getCurrentPage)
	const pageSize = useSelector(getPageSize)
	const filter = useSelector(getFilter)
	const followingInProgress = useSelector(getFollowingInProgress)
	//todo: u should do correct typing of dispatch function, type AppDispatch in redux-store is not working
	const dispatch: AppDispatch = useDispatch()
	const onPageChange = (pageNumber: number) => {
		dispatch(addUsers(pageNumber, pageSize, filter) as unknown as AnyAction)
	}
	const onFilterChange = (filter: FilterType) => {
		dispatch(addUsers(1, pageSize, filter) as unknown as AnyAction)
	}
	const following = (userId: number) => {
		dispatch(follow(userId) as unknown as AnyAction)
	}
	const unFollowing = (userId: number) => {
		dispatch(unFollow(userId) as unknown as AnyAction)
	}

	const navigate = useNavigate()
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams(location.search)
	// Users for first rendering with useEffect with empty dependencies
	useEffect(() => {
		const parsed = Object.fromEntries([
			...(searchParams as any),
		]) as QueryParamsType
		let actualPage = currentPage
		let actualFilter = filter
		if (!!parsed.page) actualPage = Number(parsed.page)
		if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
		if (!!parsed.friend)
			actualFilter = {
				...actualFilter,
				friend:
					parsed.friend === 'null'
						? null
						: parsed.friend === 'true'
						? true
						: false,
			}
		dispatch(
			addUsers(actualPage, pageSize, actualFilter) as unknown as AnyAction
		)
	}, [])
	//	useEffect for rerendering when we get different filter info
	useEffect(() => {
		const query = {} as QueryParamsType
		if (filter.term) query.term = filter.term
		if (filter.friend !== null) query.friend = String(filter.friend)
		if (currentPage !== 1) query.page = String(currentPage)
		const queryToString = new URLSearchParams(query)
		navigate('/users')
		setSearchParams(String(queryToString))
	}, [filter, currentPage])

	return (
		<div className={s.usersPage}>
			<h2>Users</h2>
			<UsersSearchForm onFilterChange={onFilterChange} />
			<div>
				<Paginator
					onPageChange={onPageChange}
					totalItemsCount={totalUsersCount}
					pageSize={pageSize}
					currentPage={currentPage}
				/>
			</div>
			{users.map(user => (
				<User
					key={user.id}
					user={user}
					follow={following}
					unFollow={unFollowing}
					followingInProgress={followingInProgress}
				/>
			))}
		</div>
	)
}
type QueryParamsType = {
	term: string
	friend: string
	page: string
}
