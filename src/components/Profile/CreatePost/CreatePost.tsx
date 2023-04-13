import React from 'react';
import s from './CreatePost.module.css'
import Post from "./Post/Post";
import {CreatePostReduxForm, PostFormValuesType} from "./CreatePostForm";
import { PostDataType } from '../../../types/commonTypes'

type Props = {
    postData: Array<PostDataType>
    addPost:(postText:string)=>void
}

const CreatePost: React.FC<Props> = props => {
	let postElements = props.postData
		.map(p => {
			return (
				<Post
					key={p.id}
					id={p.id}
					message={p.message}
					likesCount={p.likesCount}
				/>
			)
		})
		.reverse()
	let addPost = (values: PostFormValuesType) => {
		props.addPost(values.postText)
	}

	return (
		<div className={s.createPost}>
			<h3 className={s.postTitle}>Напиши пост!</h3>
			<CreatePostReduxForm onSubmit={addPost} />
			{postElements}
		</div>
	)
}

export default CreatePost;