export function setGoogle(google) {
	return {
		type: 'SET_GOOGLE',
		payload: {
			google
		}
	};
}

export function setTheme(theme) {
	return {
		type: 'SET_THEME',
		payload: {
			theme
		}
	};
}

export function setPosition(position) {
	return {
		type: 'SET_POSITION',
		payload: {
			position
		}
	};
}

export function setFiltering(text) {
	return {
		type: 'EXECUTE_SEARCH',
		payload: {
			text
		}
	};
}
