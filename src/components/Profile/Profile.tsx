import { FC } from 'react'
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import CreatePost from "./CreatePost/CreatePost";
import { PostDataType, ProfileType } from '../../types/commonTypes';


type Props = {
	isOwner: boolean
	profile: ProfileType|null
	status: string
	postData: Array<PostDataType>
	addPost: (postText: string) => void
	savePhoto: (file: any) => void
	updateStatus: (status: string) => void
	saveProfile: (profile: ProfileType) => Promise<void>
}

const Profile:FC<Props> = (props) => {
	return (
		<div className={s.profile}>
			<ProfileInfo
				savePhoto={props.savePhoto}
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
				saveProfile={props.saveProfile}
			/>
			<CreatePost
				postData={props.postData}
				addPost={props.addPost} />
		</div>
	)
}
export default Profile;