import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		console.log(error, info); // eslint-disable-line
	}

	render() {
		if (this.state.hasError)
			return (
				<h1>
					Something went wrong.
					<i className="far fa-frown" />
				</h1>
			);
		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.object
};

export default ErrorBoundary;
