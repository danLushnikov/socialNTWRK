import React from 'react'
import { ContactsType, ProfileType } from '../../../../types/commonTypes'
import s from '../ProfileInfo.module.css'
import Contact from './Contact/Contact'

type Props = {
	profile: ProfileType
	goToEditMode:()=>void
}

const ProfileDescription:React.FC<Props> = ({ profile, goToEditMode }) => {
	return (
		<div className={s.profileDescription}>
			<div className={s.fullName}>
				{profile.fullName.replace(
					profile.fullName[0],
					profile.fullName[0].toUpperCase()
				)}
			</div>
			<div className={s.lookingForAJob}>
				Looking for a job:{' '}
				{profile.lookingForAJob ? 'Я ищу job' : 'Я  не ищу job'}
			</div>
			<div >
				About Me:{' '}
				{profile.aboutMe}
			</div>
			{profile.lookingForAJob && (
				<div className={s.lookingForAJobDescription}>
					My professional skills: {profile.lookingForAJobDescription}
				</div>
			)}
			<div className={s.contacts}>
				Contacts:
				{Object.keys(profile.contacts).map(key => {
					let currentValue = profile.contacts[key as keyof ContactsType]
					return <Contact key={key} title={key} value={currentValue} />
				})}
			</div>
			<div className={s.editBtnContainer}>
				<button onClick={goToEditMode}>Edit</button>
			</div>
		</div>
	)
}

export default ProfileDescription