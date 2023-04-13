// import React from 'react'
// import { Field, InjectedFormProps, reduxForm } from 'redux-form'
// import s from '../ProfileInfo.module.css'
// import { FormControl } from "../../../common/FormControls/FormControls";
// import { maxLengthCreator, required } from "../../../../utils/validators/validator";
import { ProfileType } from '../../../../types/commonTypes'

// type ProfileFormOwnProps = {
// 	profile: ProfileType
// }
// const maxlength20 = maxLengthCreator(20)

// const ProfileDescriptionForm: React.FC<
// 	InjectedFormProps<ProfileType, ProfileFormOwnProps> &
// 		ProfileFormOwnProps
// > = ({ handleSubmit, profile, error }) => {
// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div className={s.fullName}>
// 				Full Name:
// 				<Field
// 					typeField={'input'}
// 					placeholder={'Enter name here! plz'}
// 					name={'fullName'}
// 					component={FormControl}
// 					validate={[required, maxlength20]}
// 				/>
// 			</div>
// 			<div className={s.lookingForAJob}>
// 				Looking for a job:
// 				<Field
// 					typeField={'input'}
// 					placeholder={'Are you looking for a job?'}
// 					name={'lookingForAJob'}
// 					component={FormControl}
// 					validate={[required]}
// 					type={'checkbox'}
// 				/>
// 			</div>
// 			<div className={s.lookingForAJobDescription}>
// 				My professional skills:{' '}
// 				<Field
// 					typeField={'textarea'}
// 					placeholder={'Your professional skills'}
// 					name={'lookingForAJobDescription'}
// 					component={FormControl}
// 				/>
// 			</div>

// 			<div className={s.contacts}>
// 				Contacts:
// 				{profile &&
// 					Object.keys(profile.contacts).map(key => {
// 						return (
// 							<div className={s.contact} key={key}>
// 								{key}:{' '}
// 								<Field
// 									typeField={'input'}
// 									placeholder={key}
// 									name={'contacts.' + key}
// 									component={FormControl}
// 									validate={[]}
// 								/>
// 							</div>
// 						)
// 					})}
// 			</div>
// 			{error && <div className={s.formError}>{error}</div>}
// 			<div className={s.saveBtnContainer}>
// 				<button>Save</button>
// 			</div>
// 		</form>
// 	)
// }

// export const ProfileDescriptionReduxForm = reduxForm<
// 	ProfileType,
// 	ProfileFormOwnProps
// >({
// 	form: 'editProfile',
// 	enableReinitialize: true,
// 	destroyOnUnmount: false,
// })(ProfileDescriptionForm)

