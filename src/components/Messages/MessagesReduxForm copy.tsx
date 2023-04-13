import React from 'react';
import s from './Messages.module.css';
import {SubmitHandler, useForm } from 'react-hook-form'

type Props = {
	onSubmit: SubmitHandler<IMessageFormInput>
}

export type IMessageFormInput = {
	messageText: string
}


export const MessagesFormHookReact: React.FC<Props> = ({ onSubmit }) => {
	
	const { register, handleSubmit } = useForm<IMessageFormInput>()
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={s.addMessage}>
			<div>
				<input
				className={s.addMessageTextArea}
				type='textarea'
				{...register('messageText', {})}
			/>
			</div>
			
			{/* <div>
				<Field
					typeField={'textarea'}
					placeholder={'ENTER Message'}
					name={'messageText'}
					component={FormControl}
					validate={[required, maxLength50]}
				/>
			</div>
			<button>add message</button> */}
			<input type='submit' />
		</form>
	)
}

