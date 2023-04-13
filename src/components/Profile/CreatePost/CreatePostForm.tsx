import { maxLengthCreator, required } from "../../../utils/validators/validator";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FormControl } from "../../common/FormControls/FormControls";
import s from './CreatePost.module.css'
import React from "react";



export type PostFormValuesType = {
	postText:string
}

const maxlength20 = maxLengthCreator(20)
const CreatePostForm: React.FC<
	InjectedFormProps<PostFormValuesType>
> = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field
					typeField={'textarea'}
					placeholder={'Enter post here! plz'}
					name={'postText'}
					component={FormControl}
					validate={[required, maxlength20]}
				/>
			</div>
			<div className={s.postButtonContainer}>
				<button>Add Post</button>
			</div>
		</form>
	)
}
export const CreatePostReduxForm = reduxForm<PostFormValuesType>({
	form: 'addPost',
})(CreatePostForm)