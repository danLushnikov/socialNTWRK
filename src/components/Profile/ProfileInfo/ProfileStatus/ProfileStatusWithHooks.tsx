import React, { ChangeEvent, useEffect, useState } from 'react';

type Props = {
	status: string
	updateStatus:(status:string) => void
}

const ProfileStatusWithHooks: React.FC<Props> = props => {
	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const toggleEditMode = () => {
		setEditMode(!editMode)
		props.updateStatus(status)
	}
	const onUpdateStatus = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget) {
			
			setStatus(e.currentTarget.value)
		}
	}
	return (
		<div>
			{!editMode ? (
				<div>
					{'Status: '}
					<span onDoubleClick={toggleEditMode}>
						{status ? status : 'Insert your status here'}
					</span>
				</div>
			) : (
				<div>
					<input
						onChange={onUpdateStatus}
						autoFocus={true}
						onBlur={toggleEditMode}
						value={status}
					/>
				</div>
			)}
		</div>
	)
}

export default ProfileStatusWithHooks;

