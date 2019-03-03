export const initialState = {
	theme: '',
	google: null,
	location: null,
};

export default function reducers(state = initialState, action) {
	const { type, payload = {} } = action;
	switch (type) {
		case 'SET_THEME':
			return {
				...state,
				theme: payload.theme,
			};
		case 'SET_LOCATION':
			return {
				...state,
				location: payload.location,
			};
		case 'SET_GOOGLE':
			return {
				...state,
				google: payload.google,
			};
		default:
			return state;
	}
}
