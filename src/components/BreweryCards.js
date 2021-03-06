import React from 'react';
import PropTypes from 'prop-types';
import BreweryCard from './BreweryCard';

import { map, isEmpty } from 'lodash';

class BreweryCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { breweries } = this.props;
		if (isEmpty(breweries))
			return (
				<div className="bk-card-empty">
					<p>No matching breweries found</p>
				</div>
			);

		return (
			<div className="bk-cards-container">
				<div className="bk-cards-row">
					{map(breweries, brewery => {
						return <BreweryCard brewery={brewery} key={brewery.id} />;
					})}
				</div>
			</div>
		);
	}
}

BreweryCards.propTypes = {
	breweries: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			visited: PropTypes.bool.isRequired,
			yelp: PropTypes.object.isRequired
		})
	)
};

export default BreweryCards;
