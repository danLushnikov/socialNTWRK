import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../assets/images/logoUser.png'
import { NavLink } from "react-router-dom";
import { UsersType } from '../../types/commonTypes';

type Props = {
	user: UsersType
	followingInProgress:Array<number>
	follow:(userId:number)=>void
	unFollow: (userId: number) => void
}
let User:React.FC<Props> = ({ user,followingInProgress, follow, unFollow }) => {
	return (
		<div key={user.id} className={s.users}>
			<div className={s.leftSide}>
				<div>
					<NavLink to={'/profile/' + user.id}>
						<img className={s.avatarImg} src={user.photos.small ? user.photos.small : userPhoto}
							alt="#" />
					</NavLink>
				</div>
				<div className={s.followOrUnFollowBtn}>
					{user.followed
						? <button disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								unFollow(user.id)
							}}>UnFollow</button>
						: <button disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								follow(user.id)
							}}>Follow</button>}
				</div>
			</div>
			<div className={s.rightSide}>
				<div className={s.nameAndStatus}>
					<div className={s.name}>{user.name}</div>
					<div className={s.status}>{user.status}</div>
				</div>
				<div className={s.location}>
					<div className={s.country}>{"user.location.country"}</div>
					{/* <div className={s.city}>{"user.location.city"}</div> */}
					<button>qwerty</button>
				</div>
			</div>
		</div>
	)
}
export default User;