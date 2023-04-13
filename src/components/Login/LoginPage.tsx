import { SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AnyAction } from 'redux'
import { login } from '../../redux/authReducer'
import { getCaptchaSelector, getIsAuthSelector } from '../../redux/authSelector'
import {
	IFormInput,
	LoginFormWithReactHookForm,
} from './LoginForm-with-reacthook-form'


export const LoginPage:React.FC = () => {
	const isAuth = useSelector(getIsAuthSelector)
	const captchaUrl = useSelector(getCaptchaSelector)

	const dispatch = useDispatch()

	const onSubmit: SubmitHandler<IFormInput> = data => {
		dispatch(login(data.email, data.password, data.rememberMe, data.captcha) as unknown as AnyAction)
	}
	if (isAuth) {
		return <Navigate to={'/profile'} />
	}
	return (
		<div>
			<h1>Login</h1>
			<LoginFormWithReactHookForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	)
}

