import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import { AppStateType } from '../redux/reduxStore'

let mapStateToPropsForNavigate = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
})
type MapStateProps = ReturnType<typeof mapStateToPropsForNavigate>

function withAuthRedirect<WCProps extends MapStateProps>(WrappedComponent: React.ComponentType<WCProps>) {
	const redirectComponent: React.FC<MapStateProps> = props => {
		let { isAuth, ...restProps } = props
		return !isAuth ? (
			<Navigate to={'/login'} />
		) : (
			<WrappedComponent {...restProps as WCProps} />
		)
	}
	return connect<MapStateProps,{}, WCProps, AppStateType>(
		mapStateToPropsForNavigate
	)(redirectComponent)
}
export default withAuthRedirect;
