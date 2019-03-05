import { chain, sortBy } from 'lodash';
import distance from './distance';

export function sortByAZ(breweries) {
	return sortBy(breweries, brewery => {
		return brewery.label;
	});
}

export function sortByZA(breweries) {
	return sortByAZ(breweries).reverse();
}

export function sortByDistance(breweries, position) {
	if (!position || !position.longitude || !position.latitude) return breweries;

	const { latitude, longitude } = position;
	const sorted = sortBy(breweries, brewery => {
		if (brewery.distance) return brewery.distance;

		const d = distance(
			latitude,
			longitude,
			brewery.coordinates.lat,
			brewery.coordinates.lng
		);

		brewery.distance = d;
		return d;
	});

	return sorted;
}

export function sortByRating(breweries) {
	return chain(breweries)
		.sortBy(brewery => {
			return brewery.yelp.businesses.length
				? brewery.yelp.businesses[0].rating
				: -1;
		})
		.reverse()
		.reduce(
			(acc, brewery) => {
				const rating = brewery.yelp.businesses.length
					? brewery.yelp.businesses[0].rating
					: -1;
				const tail = acc[acc.length - 1];
				if (!tail.length) tail.push(brewery);
				else {
					const tailBrewery = tail[0];
					const groupRating = tailBrewery.yelp.businesses.length
						? tailBrewery.yelp.businesses[0].rating
						: -1;
					if (groupRating === rating) tail.push(brewery);
					else acc.push([brewery]);
				}

				return acc;
			},
			[[]]
		)
		.map(group => {
			return chain(group)
				.sortBy(brewery => {
					return brewery.yelp.businesses.length
						? brewery.yelp.businesses[0].review_count
						: -1;
				})
				.reverse()
				.value();
		})
		.reduce((acc, group) => {
			return acc.concat(group);
		}, [])
		.value();
}
