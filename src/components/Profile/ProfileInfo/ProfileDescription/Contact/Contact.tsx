import React from 'react'
import s from '../../ProfileInfo.module.css'
type Props = {
	title: string
	value:string
}
const Contact: React.FC<Props> = ({ title, value }) => {
	return (
		<div className={s.contact}>
			{title}: {value ? value : '--'}
		</div>
	)
}

export default Contact