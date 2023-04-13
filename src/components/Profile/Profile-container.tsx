import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { compose } from 'redux'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import {
	actions,
	getProfileStatus,
	getUserProfile,
	savePhoto,
	saveProfile,
	updateProfileStatus,
} from '../../redux/profileReducer'
import { AppStateType } from '../../redux/reduxStore'
import { PostDataType, ProfileType } from '../../types/commonTypes'
import Profile from './Profile'

type MapStateProps =
	{
	postData: Array<PostDataType>
	postText: string
	profile: ProfileType
	status: string
	authorizedUserId: number
}
type MapDispatchProps = {
	addPost: (postText: string) => void
	getUserProfile: (userId: number) => void
	getProfileStatus: (userId: number) => void
	updateProfileStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => Promise<void>
}
type MyOwnProps = {
	router: {
		navigate: NavigateFunction
		params: { userId: string }
	}
}
type PropsType = MapStateProps & MapDispatchProps & MyOwnProps

const ProfilePage = () => {
	const postData = useSelector((state: AppStateType) => state.profilePage.postData)
	const profile = useSelector((state: AppStateType) => state.profilePage.profile)
	const status = useSelector((state: AppStateType) => state.profilePage.status)
	const authorizedUserId = useSelector((state: AppStateType) => state.auth.id)

	return (
		<Profile
			profile={profile}
			postData={postData}
			status={status}
			isOwner={false}
			addPost={function (postText: string): void {
				throw new Error('Function not implemented.')
			}}
			savePhoto={function (file: any): void {
				throw new Error('Function not implemented.')
			}}
			updateStatus={function (status: string): void {
				throw new Error('Function not implemented.')
			}}
			saveProfile={function (profile: ProfileType): Promise<void> {
				throw new Error('Function not implemented.')
			} }			// isOwner={!this.props.router.params.userId}
			// savePhoto={this.props.savePhoto}
			// addPost={this.props.addPost}
			// updateStatus={this.props.updateProfileStatus}
			// saveProfile={this.props.saveProfile}
		/>
	)
}

class ProfileContainer extends React.Component<PropsType> {
	
	profileRefresh() {
		let userId = +this.props.router.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {this.props.router.navigate('/login')}
		}
		this.props.getUserProfile(userId)
		this.props.getProfileStatus(userId)
	}

	componentDidMount() {
		this.profileRefresh()
	}
	componentDidUpdate(prevProps: PropsType) {
		if (this.props.router.params.userId !== prevProps.router.params.userId) {
			this.profileRefresh()
		}
	}

	render() {
		return (
			<Profile
			postData={this.props.postData}
			isOwner={!this.props.router.params.userId}
			profile={this.props.profile}
			status={this.props.status}
			savePhoto={this.props.savePhoto}
			addPost={this.props.addPost}
				updateStatus={this.props.updateProfileStatus}
				saveProfile={this.props.saveProfile}
			/>
		)
	}
}
let mapStateToProps = (state: AppStateType) => ({
	postData: state.profilePage.postData,
	postText: state.profilePage.postText,
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.id,
})
function withRouter(Component: React.ComponentType) {
	function ComponentWithRouterProp(	props:any	) {
		let navigate = useNavigate()
		let params = useParams()
		return <Component {...props} router={{ navigate, params }} />
	}
	return ComponentWithRouterProp
}
export default compose(
	connect(mapStateToProps, {
		addPost:actions.addPost,
		getUserProfile,
		getProfileStatus,
		updateProfileStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect
)(ProfileContainer) as React.ComponentType
