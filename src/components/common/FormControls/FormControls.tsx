import React from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form'
import s from './FormControls.module.css'

type Props = {
	input: WrappedFieldInputProps
	meta: WrappedFieldMetaProps
	typeField: string
}

export const FormControl:React.FC<Props> = ({ input, meta, ...props }) => {
	const hasError = meta.touched && meta.error;
	return <div className={s.formControl + " " + (hasError ? s.error : "")}>
		<div>
			{props.typeField === "textarea" && <textarea {...input} {...props} />}
			{props.typeField === "input" && <input {...input} {...props} />}
		</div>
		{hasError && <span>{meta.error}</span>}
	</div>
}

// export const Textarea = ({input,meta,...props}) => {

//     const hasError = meta.touched && meta.error;

//     return <div className={s.formControl + " " + (hasError ? s.error :"")}>
//       <div>
//           <textarea {...input} {...props}/>
//       </div>
//            { hasError && <span>{meta.error}</span>}
//     </div>
// }

// export const Input = ({input,meta,...props}) => {

//     const hasError = meta.touched && meta.error;

//     return <div className={s.formControl + " " + (hasError ? s.error :"")}>
//         <div>
//             <input {...input} {...props}/>
//         </div>
//         { hasError && <span>{meta.error}</span>}
//     </div>
// }