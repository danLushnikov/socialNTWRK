import React, { ChangeEvent } from 'react';
import s from './../ProfileInfo.module.css'
import userPhoto from '../../../../assets/images/logoUser.png'
import { ProfileType } from '../../../../types/commonTypes'

type Props = {
	profile: ProfileType
	isOwner: boolean
	savePhoto:(file:File)=>void
}

const ProfileAvatar: React.FC<Props> = ({ profile, isOwner, savePhoto }) => {
	const onChangeMyAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.files?.length && savePhoto(e.target.files[0])
	}
	return (
		<div className={s.profileImageContainer}>
			<img
				className={s.profileImage}
				src={profile.photos.large ? profile.photos.large : userPhoto}
			/>
			{isOwner && <input type='file' onChange={onChangeMyAvatar} />}
		</div>
	)
}

export default ProfileAvatar;