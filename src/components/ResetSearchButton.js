import React from 'react';
import PropTypes from 'prop-types';

class ResetSearchButton extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { onClick } = this.props;

		return (
			<button
				aria-label="Clear search text"
				className="bk-button bk-button-icon"
				onClick={onClick}
			>
				<i aria-hidden="true" className="fas fa-undo bk-icon" />
			</button>
		);
	}
}

ResetSearchButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default ResetSearchButton;
