import React from 'react';
import PropTypes from 'prop-types';
import { smoothScrollById } from './util/smoothScroll';

class AnchorButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { reverse: false };

		this.smoothScroll = this.smoothScroll.bind(this);
	}

	smoothScroll() {
		smoothScrollById(this.target);
		this.setState({ reverse: !this.state.reverse });
	}

	render() {
		const { targetDown, targetUp } = this.props;

		this.target = this.state.reverse ? targetUp : targetDown;
		const reverseClass = this.state.reverse ? ' bk-icon-reverse' : '';
		const label = this.state.reverse ? 'Scroll up' : 'Scroll down';

		return (
			<a
				aria-label={label}
				className="bk-link bk-button-icon bk-button"
				href={'#' + this.target}
				onClick={this.smoothScroll}
			>
				<i
					aria-hidden="true"
					className={'fas fa-arrow-down bk-icon' + reverseClass}
				/>
			</a>
		);
	}
}

AnchorButton.propTypes = {
	targetDown: PropTypes.string.isRequired,
	targetUp: PropTypes.string.isRequired,
	children: PropTypes.object
};

export default AnchorButton;
