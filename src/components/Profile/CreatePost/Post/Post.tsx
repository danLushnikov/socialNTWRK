import React from 'react'
import s from './Post.module.css'

type Props = {
	id: number
	message: string
	likesCount: number
}

const Post:React.FC<Props> = (props) => {
	return (
		<div className={s.post}>
			<div>
				<div>post: {props.id} MESSAGE: {props.message}</div>
				<div className={s.likes}>Likes: {props.likesCount}</div>
			</div>
		</div>

	)
}

export default Post;