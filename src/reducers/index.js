export const initialState = {
	theme: '',
	google: null,
	position: null,
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
			};
		case 'SET_GOOGLE':
			return {
				...state,
				google: payload.google,
			};

		case 'SET_BREWERY_FILTER':
			return {
				...state,
				filterFunction: payload.filterFunction,
			};

		default:
			return state;
	}
}
