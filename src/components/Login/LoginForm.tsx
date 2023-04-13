// import { Field, InjectedFormProps, reduxForm } from 'redux-form'
// import { maxLengthCreator, required } from '../../utils/validators/validator'
// import { FormControl } from '../common/FormControls/FormControls'
// import React from 'react'
import s from '../common/FormControls/FormControls.module.css'


// type LoginFormOwnProps = {
// 	captchaUrl: string|null
// }
// export type LoginFormValuesType = {
// 	captcha: string
// 	rememberMe: boolean
// 	password: string
// 	email:string
// }

// const maxLength30 = maxLengthCreator(30)
// const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
// 	= props => {
// 	return (
// 		<form onSubmit={props.handleSubmit} className={s.loginForm}>
// 			<div>
// 				<Field
// 					typeField={'input'}
// 					placeholder={'Email'}
// 					name={'email'}
// 					component={FormControl}
// 					validate={[required, maxLength30]}
// 				/>
// 			</div>
// 			<div>
// 				<Field
// 					typeField={'input'}
// 					placeholder={'Password'}
// 					name={'password'}
// 					type={'password'}
// 					component={FormControl}
// 					validate={[required, maxLength30]}
// 				/>
// 			</div>
// 			<div className={s.rememberMe}>
// 				<Field
// 					typeField={'input'}
// 					component={FormControl}
// 					name={'rememberMe'}
// 					type={'checkbox'}
// 				/>{' '}
// 				remember me
// 			</div>
// 			<div>
// 				{props.captchaUrl && <img src={props.captchaUrl} />}
// 				{props.captchaUrl && (
// 					<Field
// 						typeField={'input'}
// 						placeholder={'type image numbers'}
// 						name={'captcha'}
// 						component={FormControl}
// 					/>
// 				)}
// 			</div>
// 			{props.error && <div className={s.formSummaryError}>{props.error}</div>}
// 			<div>
// 				<button>Log in</button>
// 			</div>
// 		</form>
// 	)
// }
// export const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({ form: 'login' })(
// 	LoginForm
// )
