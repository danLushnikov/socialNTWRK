import React from 'react';
import s from "../Messages.module.css";
import { NavLink } from "react-router-dom";

type Props = {
	id: number
	name:string
}

const Dialog:React.FC<Props> = (props) => {

	return (
		<div className={s.dialog}>
			<NavLink to={'/messages/' + props.id}
				className={navData => navData.isActive ? s.active : undefined}>{props.name}
			</NavLink>
		</div>
	);
};

export default Dialog;