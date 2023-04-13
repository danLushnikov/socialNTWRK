export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => {
    return value
        ? undefined
        : 'Field is required, bitch!'
}
export const maxLengthCreator =
	(maxLength: number): FieldValidatorType =>
	(value) => {
		return value && value.length < maxLength
			? undefined
			: `Max length is ${maxLength} symblols, bitch!`
	}
