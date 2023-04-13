import React, { FC } from 'react';
import s from './Messages.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import { MessagesReduxForm } from './MessagesReduxForm';
import { DialogDataType, MessageDataType } from '../../types/commonTypes';
import { IMessageFormInput, MessagesFormHookReact } from './MessagesReduxForm copy'
import { SubmitHandler } from 'react-hook-form'



type Props = {
	dialogData: Array<DialogDataType>
	messageData: Array<MessageDataType>
	addMessage: (messageText: string) => void
}
// export type MessageFormValuesType = {
// 	messageText:string
// }

const Messages= (props:Props) => {
	let dialogElements = props.dialogData.map(d => (
		<Dialog key={d.id} name={d.name} id={d.id} />
	))
	let messageElements = props.messageData.map(m => (
		<Message key={m.id} message={m.message} />
	))

	// let addMessage = (values: MessageFormValuesType) => {
	// 	props.addMessage(values.messageText)
	// }
	const onSubmit: SubmitHandler<IMessageFormInput> = data => {
		props.addMessage(data.messageText)
	}

	return (
		<div className={s.messages}>
			<nav className={s.dialogs}>{dialogElements}</nav>
			<div className={s.messageItem}>{messageElements}</div>
			<MessagesFormHookReact onSubmit={onSubmit} />
		</div>
	)
}
export default Messages;