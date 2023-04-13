import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { AppStateType } from '../../redux/reduxStore'
import { ProfileType } from '../../types/commonTypes'
import Header from './Header'

type MapStateProps = {
	isAuth: boolean
	login: string
	profile: ProfileType
	isOwner:boolean
}

type MapDispatchProps = {
	logout: () => void
}
type MyOwnProps = {}
type Props = MapDispatchProps & MapStateProps & MyOwnProps

const HeaderContainer:React.FC<Props> = props => {
	return <Header {...props} />
}
let mapStateToProps = (state:AppStateType) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
		profile: state.profilePage.profile,
		isOwner:state.app.initialized
	}
}
export default connect(mapStateToProps, { logout })(HeaderContainer as React.ComponentType) 
