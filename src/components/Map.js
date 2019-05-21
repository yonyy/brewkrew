import React from 'react';
import PropTypes from 'prop-types';

import GoogleMarker from './util/GoogleMarker';
import styledMaps from './util/styledMaps';

const CENTER_LAT_LONG = { lat: 32.8806222, lng: -117.1652732 };

class Map extends React.Component {
	constructor(props) {
		super(props);

		this.filterOutData = this.filterOutData.bind(this);
		this.doubleClick = this.doubleClick.bind(this);
		this.initializeGoogleMap = this.initializeGoogleMap.bind(this);

		this.googleMarker = null;
	}

	componentDidMount() {
		const { google } = this.props;
		if (google) this.initializeGoogleMap();
	}

	componentDidUpdate() {
		const { google, theme } = this.props;

		if (!google) return;

		if (this.googleMarker) this.filterOutData();
		else this.initializeGoogleMap();

		if (theme !== this.googleMarker.style) this.googleMarker.setStyle(theme);
	}

	initializeGoogleMap() {
		const { data, google } = this.props;

		const googleMarker = new GoogleMarker(google);

		googleMarker.setDoubleClick(this.doubleClick);

		googleMarker.createMap(this.mapRef, {
			center: CENTER_LAT_LONG,
			zoom: 11,
			styledMaps
		});

		googleMarker.createMarkers(data);
		this.googleMarker = googleMarker;
	}

	filterOutData() {
		const points = this.props.points;
		const indices = points.map(p => p.id);
		this.googleMarker.filterOutByIndices(indices);
	}

	doubleClick(brewery) {
		this.props.doubleClick(brewery.label);
	}

	render() {
		return (
			<div className="bk-map" id="map" ref={node => (this.mapRef = node)} />
		);
	}
}

Map.propTypes = {
	points: PropTypes.array.isRequired,
	google: PropTypes.object,
	data: PropTypes.array.isRequired,
	doubleClick: PropTypes.func.isRequired,
	theme: PropTypes.string
};

export default Map;
