import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BrewKrewContainer from './BrewKrewContainer';
import ErrorBoundary from './ErrorBoundary';
import ThemeWrapper from './ThemeWrapper';
import Position from './Position';

import style from '../sass/main.scss';

import { setGoogle } from '../actions';

class BrewKrewComponent extends React.PureComponent {
	constructor(props) {
		super(props);
		const { google } = this.props;
		this.createGoogleInterval = this.createGoogleInterval.bind(this);
		this.clearGoogleInterval = this.clearGoogleInterval.bind(this);

		const state = {
			id: !google ? this.createGoogleInterval() : null,
		};

		this.state = state;
	}

	createGoogleInterval() {
		const { setGoogle } = this.props;
		const { clearGoogleInterval } = this;
		return setInterval(() => {
			if (!window.google) return;

			clearGoogleInterval();
			setGoogle(window.google);
		}, 500);
	}

	clearGoogleInterval() {
		if (!this.state || !this.state.id) return;

		clearInterval(this.state.id);
		this.setState({
			id: null,
		});
	}

	render() {
		return (
			<ErrorBoundary>
				<ThemeWrapper>
					<Position>
						<BrewKrewContainer />
					</Position>
				</ThemeWrapper>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = ({ google }) => ({
	google,
});

const mapDispatchToProps = dispatch => ({
	setGoogle: google => dispatch(setGoogle(google)),
});

BrewKrewComponent.style = style;

BrewKrewComponent.propTypes = {
	google: PropTypes.object,
	setGoogle: PropTypes.func.isRequired,
};

const BrewKrew = connect(
	mapStateToProps,
	mapDispatchToProps
)(BrewKrewComponent);

export default BrewKrew;
