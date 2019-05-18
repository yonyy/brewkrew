import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { setPosition } from '../actions';

const MINUTE = 60000; // 1 minute in miliseconds

const getCurrentLocation = (callback, errorHandler) =>
	navigator.geolocation.getCurrentPosition(callback, errorHandler, {
		enableHighAccuracy: true,
		timeout: MINUTE,
		maximumAge: 5 * MINUTE
	});

const watchPosition = (callback, errorHandler) =>
	navigator.geolocation.watchPosition(callback, errorHandler, {
		enableHighAccuracy: true
	});

class Location extends React.PureComponent {
	constructor(props) {
		super(props);
		this.initPosition = this.initPosition.bind(this);
		this.state = { id: this.initPosition() };
	}

	errorHandler(e) {
		console.warn(`Error grabbing position: ${e.message}`); // eslint-disable-line
	}

	initPosition() {
		const cb = pos => {
			const latitude = get(pos, 'coords.latitude', null);
			const longitude = get(pos, 'coords.longitude', null);
			this.props.setPosition({ latitude, longitude });
		};

		getCurrentLocation(cb, this.errorHandler);
		return watchPosition(cb, this.errorHandler);
	}

	render() {
		return this.props.children;
	}
}

const mapDispatchToProps = dispatch => ({
	setPosition: position => dispatch(setPosition(position))
});

Location.propTypes = {
	children: PropType.object,
	setPosition: PropType.func.isRequired
};

export default connect(
	() => ({}),
	mapDispatchToProps
)(Location);
