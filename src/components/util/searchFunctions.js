import { filter } from 'lodash';

const handlers = [
	{
		regex: /^:$/i,
		handler: (_, b) => b,
	},
	{
		regex: /:visited/i,
		handler: (_, breweries) => filterVisited(true, breweries),
	},
	{
		regex: /:notvisited/i,
		handler: (_, breweries) => filterVisited(false, breweries),
	},
	{
		regex: /\*+/,
		handler: (text, breweries) => filterNames(text, breweries),
	},
];

const getHandler = (text = '') => {
	for (let i = 0; i < handlers.length; i++) {
		const { regex, handler } = handlers[i];
		if (regex.test(text)) return handler;
	}

	return (_, b) => b;
};

const filterNames = (label = '', breweries = []) => {
	return filter(breweries, brewery => {
		return brewery.label.toLowerCase().startsWith(label.toLowerCase());
	});
};

const filterVisited = (visited = true, breweries = []) => {
	return filter(breweries, brewery => {
		return brewery.visited === visited;
	});
};

export default (text, breweries) => {
	const handler = getHandler(text);
	return handler(text, breweries);
};
