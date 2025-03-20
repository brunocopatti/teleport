function FormButton(props) {
	return (
		<button
        className="rounded-full px-8 py-2 bg-black dark:bg-gray-600 text-white text-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
        {...props}
      >
        {props.children}
      </button>
	)
}

export default FormButton;