import React from 'react';
import s from './MainMenu.module.css'
import { NavLink } from "react-router-dom";


const MainMenu = () => {
	return (
		<nav className={s.mainMenu}>
			<div className={s.item}>
				<NavLink	to='/profile/' className={navData => navData.isActive && s.active}>
					Profile
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink	to='/messages' className={navData => navData.isActive && s.active}>
					Messages
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/news' className={navData => navData.isActive && s.active}>
					News
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/music'	className={navData => navData.isActive && s.active}>
					Music
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/users'	className={navData => navData.isActive && s.active}>
					Users
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/settings' className={navData => navData.isActive && s.active}>
					Settings
				</NavLink>
			</div>
		</nav>
	)
}
export default MainMenu;