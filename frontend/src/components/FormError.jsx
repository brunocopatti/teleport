function FormError(props) {
	return (
		<p className="text-red-700 dark:text-red-400">{props.children}</p>
	);
}

export default FormError;