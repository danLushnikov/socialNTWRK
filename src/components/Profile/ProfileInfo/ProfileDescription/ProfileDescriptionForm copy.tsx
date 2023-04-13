import React from 'react'
import { SubmitHandler,useForm } from 'react-hook-form'
import { ProfileType } from '../../../../types/commonTypes'
import s from '../ProfileInfo.module.css'

type Props = {
	profile: ProfileType
	onSubmit: SubmitHandler<ProfileType>
}
//todo:rewrite to formik, useForm not working 
export const ProfileDescriptionFormHooksReact: React.FC<Props> = ({
	profile,
	onSubmit,
}) => {
	const { register, handleSubmit } = useForm<ProfileType>()
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					placeholder={'Inter your name'}
					{...register('fullName', { required: false, maxLength: 50 })}
				/>
			</div>
			<div>
				<span>Are you looking for a job?</span>
				<input
					type={'checkbox'}
					placeholder={'Are you looking for a job?'}
					{...register('lookingForAJob', { required: false })}
				/>
			</div>
			<div>
				<input
					type='textarea'
					placeholder={'Your professional skills'}
					{...register('lookingForAJobDescription')}
				/>
			</div>
			<div>
				<input
					type='textarea'
					placeholder={'Your aboutMe aboutMe'}
					{...register('aboutMe', { required: false })}
				/>
			</div>
			<div className={s.contacts}>
				Contacts:
				{profile &&
					Object.keys(profile.contacts).map(key => {
						return (
							<div className={s.contact} key={key}>
								{key}:{' '}
								<input
									{...register(`contacts.${key}` as any, {
										required: false,
										maxLength: 50,
									})}
								/>
							</div>
						)
					})}
			</div>
			<input type='submit' />
		</form>
	)
}
