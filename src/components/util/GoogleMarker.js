const FONT_FAMILY = 'Lato, sans-serif';
const FONT_WEIGHT = 'bold';

class GoogleMarker {
	constructor(google) {
		this.google = google;
		this.markers = [];
		this.activeMarker = null;
		this.map = null;
		this.style = '';
	}

	setDoubleClick(func) {
		this.doubleClick = func;
	}

	createMap(node, opt) {
		if (!this.google) return;

		const { Map, StyledMapType } = this.google.maps;
		const { styledMaps, center, zoom } = opt;

		const gStyles = styledMaps.map(({ name, styledMap }) => {
			return new StyledMapType(styledMap, {
				name
			});
		});

		const styleIds = styledMaps.map(({ id }) => id);
		const map = new Map(node, {
			center,
			zoom,
			mapTypeControlOptions: {
				mapTypeIds: styleIds
			}
		});

		styleIds.map((id, index) => map.mapTypes.set(id, gStyles[index]));
		this.setStyle(styleIds[0]);
		this.map = map;
	}

	createMarkers(points) {
		if (!this.map) return [];

		const gM = this;
		this.markers = points.map(point => {
			const marker = new gM.google.maps.Marker({
				position: point.coordinates,
				animation: gM.google.maps.Animation.DROP
			});

			marker.addListener('click', function() {
				if (gM.activeMarker === marker) {
					gM.doubleClick && gM.doubleClick(point);
					return;
				}

				gM.clearMarker(gM.activeMarker);
				gM.showMarker(marker, point.label);
				gM.activeMarker = marker;
			});

			marker.addListener('mouseover', function() {
				gM.showMarker(marker, point.label);
				gM.activeMarker = marker;
			});

			marker.addListener('mouseout', function() {
				gM.clearMarker(marker);
			});

			marker.setZIndex(1);

			marker.setMap(gM.map);

			return marker;
		});
	}

	showMarker(marker, label) {
		if (!marker || !this.google) return;

		marker.setAnimation(this.google.maps.Animation.BOUNCE);
		marker.setLabel({
			fontFamily: FONT_FAMILY,
			fontWeight: FONT_WEIGHT,
			fontSize: '18px',
			color: this.style === 'bk-light' ? 'black' : 'white',
			text: label
		});
		marker.setZIndex(100);
	}

	clearMarker(marker) {
		if (!marker) return;

		marker.setAnimation(null);
		marker.setLabel('');
		marker.setZIndex(1);
	}

	filterOutByIndices(indices) {
		this.markers.map((m, index) => {
			if (indices.indexOf(index) === -1) m.setMap(null);
			else if (m.getMap() === null) m.setMap(this.map);
		});
	}

	setStyle(style) {
		if (!this.map) return;

		this.style = style;
		this.map.setMapTypeId(style);
	}
}

export default GoogleMarker;
