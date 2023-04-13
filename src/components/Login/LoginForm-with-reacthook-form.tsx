import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Props = {
	captchaUrl: string|null
	onSubmit: SubmitHandler<IFormInput>
}
export type IFormInput = {
	email: string
	password: string
	captcha: string
	rememberMe: boolean
}
export const LoginFormWithReactHookForm: React.FC<Props> = ({	captchaUrl,	onSubmit}) => {
	
	const { register, handleSubmit } = useForm<IFormInput>()
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('email', { required: true, maxLength: 50 })} />
			<input {...register('password', { required: true })} />
			<input type='checkbox' {...register('rememberMe')} />
			{captchaUrl && <img src={captchaUrl} />}
			{captchaUrl && <input {...register('captcha')} />}
			<input type='submit' />
		</form>
	)
}
