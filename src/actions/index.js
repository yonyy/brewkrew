export function setGoogle(google) {
	return {
		type: 'SET_GOOGLE',
		payload: {
			google,
		},
	};
}

export function setTheme(theme) {
	return {
		type: 'SET_THEME',
		payload: {
			theme,
		},
	};
}

export function setLocation(location) {
	return {
		type: 'SET_LOCATION',
		payload: {
			location,
		},
	};
}
