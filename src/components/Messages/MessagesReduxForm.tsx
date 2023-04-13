import React from 'react';
import s from './Messages.module.css';
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FormControl } from "../common/FormControls/FormControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import { IMessageFormInput } from './MessagesReduxForm copy'

const maxLength50 = maxLengthCreator(50);
type MessageFormOwnProps ={}
const MessagesForm: React.FC<
	InjectedFormProps<IMessageFormInput, MessageFormOwnProps> &
		MessageFormOwnProps
> = props => {
	return (
		<form onSubmit={props.handleSubmit} className={s.addMessage}>
			<div>
				<Field
					typeField={'textarea'}
					placeholder={'ENTER Message'}
					name={'messageText'}
					component={FormControl}
					validate={[required, maxLength50]}
				/>
			</div>
			<button>add message</button>
		</form>
	)
}
export const MessagesReduxForm = reduxForm<IMessageFormInput, MessageFormOwnProps>({
	form: 'messages',
})(MessagesForm)
