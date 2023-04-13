import React from 'react'
import { Field, Formik } from 'formik'
import { FilterType } from '../../redux/usersReducer'
import { useSelector } from 'react-redux'
import { getFilter } from '../../redux/usersSelector'


const usersSearchFormValidate = (values: FormProps) => {
	const errors = {} as any
	if (!values) {
		errors.term = 'Required'
	}
	return errors
}

export const UsersSearchForm:React.FC<Props> = (props) => {

	
	const submit = (values: FormProps, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		const IFilter: FilterType = {
			term: values.term,
			friend: values.friend === 'null'? null : values.friend === 'true'? true: false 
		}
		props.onFilterChange(IFilter)
		setSubmitting(false)
	}
		const filter = useSelector(getFilter)
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{
					term: filter.term,
					friend: String(filter.friend) as FriendFormType,
				}}
				validate={usersSearchFormValidate}
				onSubmit={submit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting /* and other goodies */,
				}) => (
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='term'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.term}
						/>
						{errors.term && touched.term && errors.term}
						<Field as='select' name='friend'>
							<option value='null'>all</option>
							<option value='true'>only followed</option>
							<option value='false'>only unFollowed</option>
						</Field>
						<div>
						<button type='submit' disabled={isSubmitting}>
							Search
						</button>
						</div>
					</form>
				)}
			</Formik>
		</>
	)
}
type Props = {
	onFilterChange: (filter: FilterType) => void
}
type FriendFormType = 'null' | 'true' | 'false'

type FormProps = {
	term: string
	friend: FriendFormType
}