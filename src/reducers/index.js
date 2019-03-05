import { map } from 'lodash';

import breweries from '../db';

import executeSearch from '../components/util/searchFunctions';
import distance from '../components/util/distance';

export const initialState = {
	theme: '',
	google: null,
	position: null,
	breweries,
	filteredBreweries: breweries,
	searchTerm: '',
};

export default function reducers(state = initialState, action) {
	const { type, payload = {} } = action;
	switch (type) {
		case 'SET_THEME':
			return {
				...state,
				theme: payload.theme,
			};
		case 'SET_POSITION':
			return {
				...state,
				position: payload.position,
				breweries: computeDistance(payload.position, state.breweries),
			};
		case 'SET_GOOGLE':
			return {
				...state,
				google: payload.google,
			};

		case 'EXECUTE_SEARCH':
			return {
				...state,
				filteredBreweries: executeSearch(payload.text, state.breweries),
				searchTerm: payload.text,
			};

		default:
			return state;
	}
}

const computeDistance = (position, breweries) => {
	const { latitude, longitude } = position;
	return map(breweries, brewery => ({
		...brewery,
		distance: distance(
			latitude,
			longitude,
			brewery.coordinates.lat,
			brewery.coordinates.lng
		),
	}));
};
