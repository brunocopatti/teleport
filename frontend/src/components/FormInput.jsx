function FormInput(props) {
	return (
		<input
			className="border px-4 py-1 rounded-full w-60 disabled:opacity-50"
			{...props}
		/>
	)
}

export default FormInput;