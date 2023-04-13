import React from 'react';
import s from './Header.module.css'
import { NavLink } from "react-router-dom";
import bird from '../../assets/images/bird.jpg'
import legoLogo from '../../assets/images/LEGO_logo.png'
import { ProfileType } from '../../types/commonTypes'


type Props = {
	profile: ProfileType
	isAuth: boolean
	login: string
	logout: () => void
}

const Header: React.FC<Props> = props => {
	return (
		<header className={s.header}>
			<div className={s.headerLogoContainer}>
				<img alt='#' src={legoLogo} />
				{/* <img alt='#' className={s.headerLogo} src={props.profile.photos.small ? props.profile.photos.small : ''} /> */}
			</div>
			{props.isAuth && props.profile ? (
				<div className={s.loginBlock}>
					<img
						alt='#'
						src={
							props.profile.photos.small !== null && props.profile.photos.small !== undefined && props.profile.photos.small !== ""
								? props.profile.photos.small
								: bird
						}
					/>
					{props.login}
					<button onClick={props.logout}>logout</button>
				</div>
			) : (
				<NavLink className={s.loginLink} to={'/Login'}>
					login
				</NavLink>
			)}
		</header>
	)
}
export default Header;