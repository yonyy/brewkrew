import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GoogleMarker from './util/GoogleMarker';
import styledMap from '../stylemap/stylemap';

const STYLE_NAME = 'Style';
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
		if (google) {
			this.initializeGoogleMap();
		}
	}

	componentDidUpdate() {
		const { google } = this.props;

		if (!google) return;

		if (this.googleMarker) this.filterOutData();
		else {
			this.initializeGoogleMap();
		}
	}

	initializeGoogleMap() {
		const { data, google } = this.props;

		const googleMarker = new GoogleMarker(google);
		googleMarker.setDoubleClick(this.doubleClick);

		const node = ReactDOM.findDOMNode(this.mapRef);
		googleMarker.createMap(node, {
			center: CENTER_LAT_LONG,
			zoom: 11,
			mapStyles: {
				styleName: STYLE_NAME,
				mapStyleId: 'styled_map',
				styledMap,
			},
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

const mapStateToProps = ({ google }) => ({
	google,
});

Map.propTypes = {
	points: PropTypes.array.isRequired,
	google: PropTypes.object,
	data: PropTypes.array.isRequired,
	doubleClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Map);
