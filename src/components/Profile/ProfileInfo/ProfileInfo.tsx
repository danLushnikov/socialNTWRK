import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { ContactsType, ProfileType } from '../../../types/commonTypes'
import Preloader from '../../common/Preloader/Preloader'
import ProfileAvatar from './ProfileAvatar/ProfileAvatar'
import ProfileDescription from './ProfileDescription/ProfileDescription'
import { ProfileDescriptionFormHooksReact } from './ProfileDescription/ProfileDescriptionForm copy'
import s from './ProfileInfo.module.css'
import ProfileMainPicture from './ProfileMainPicture/ProfileMainPicture'
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks'

type Props = {
	profile: ProfileType|null
	status: string
	isOwner: boolean
	savePhoto: (file: File) => void
	updateStatus: (status: string) => void
	saveProfile: (profile: ProfileType) => Promise<void>
}

const ProfileInfo: React.FC<Props> = props => {
	
	const [editMode, setEditMode] = useState(false)
	
	if (!props.profile) {
		return <Preloader />
	}


	// todo: remove 'then' 
	const onSubmit: SubmitHandler<ProfileType> = profileData => {
		props.saveProfile(profileData).then(() => {
			setEditMode(false)
		})
	}
	return (
		<div className={s.profileInfo}>
			<ProfileMainPicture />
			<div className={s.mainInfo}>
				<ProfileAvatar
					savePhoto={props.savePhoto}
					profile={props.profile}
					isOwner={props.isOwner}
				/>
				{editMode ? (
					<ProfileDescriptionFormHooksReact
						profile={props.profile}
						onSubmit={onSubmit}
					/>
				) : (
					<ProfileDescription
						profile={props.profile}
						goToEditMode={() => {
							setEditMode(true)
						}}
					/>
				)}
			</div>
			<ProfileStatusWithHooks
				status={props.status}
				updateStatus={props.updateStatus}
			/>
		</div>
	)
}

export default ProfileInfo
