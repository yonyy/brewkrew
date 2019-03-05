import {
	sortByAZ,
	sortByZA,
	sortByDistance,
	sortByRating,
} from './sortByMethods';

const controls = [
	{
		icon: 'map-marker-alt',
		transform: sortByDistance,
		label: 'Sort by distance in descending order',
		key: 'sort_by_distance',
	},
	{
		icon: 'sort-alpha-down',
		transform: sortByAZ,
		label: 'Sort by label in descending order',
		descending: true,
		key: 'sort_by_label_desc',
	},
	{
		icon: 'sort-alpha-up',
		transform: sortByZA,
		label: 'Sort by label in ascending order',
		key: 'sort_by_label_asc',
	},
	{
		icon: 'star',
		transform: sortByRating,
		label: 'Sort by rating in descending order',
		key: 'sort_by_rating',
	},
];

export const defaultControl = controls[0];

export default controls;
