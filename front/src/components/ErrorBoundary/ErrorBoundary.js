import React from "react";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			hasError: error,
			errorInfo,
		});
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return <h1>Что-то пошло не так.</h1>;
		}

		return this.props.children;
	}
}
