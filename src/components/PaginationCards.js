import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { connect } from 'react-redux';

import BreweryCards from './BreweryCards';
import PaginationControls from './PaginationControls';
import Pagination from './Pagination';
import Loading from './Loading';
import controls, { defaultControl } from './util/paginationControls.js';

class PaginationCards extends React.Component {
	constructor(props) {
		super(props);

		this.backPage = this.backPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.setActiveControl = this.setActiveControl.bind(this);
		this.state = {
			pageNumber: 0,
			activeControl: defaultControl,
		};
	}

	setPage(pageNumber) {
		this.setState({ pageNumber });
	}

	backPage() {
		if (this.state.pageNumber - 1 >= 0) this.setPage(this.state.pageNumber - 1);
	}

	nextPage(max) {
		return () => {
			if (this.state.pageNumber + 1 < max)
				this.setPage(this.state.pageNumber + 1);
		};
	}

	setActiveControl(activeControl) {
		this.setState({
			activeControl,
		});
	}

	render() {
		const { activeControl } = this.state;
		const { breweries, position, limit } = this.props;
		const sortedBreweries = activeControl.transform(breweries, position);
		const slices = chunk(sortedBreweries, limit);
		const page = slices[this.state.pageNumber];
		const length = slices.length;

		return (
			<React.Fragment>
				<PaginationControls
					activeControl={activeControl}
					controls={controls}
					onSelect={this.setActiveControl}
				/>
				<Loading loading={this.state.loading}>
					<BreweryCards breweries={page} />
					<Pagination
						pageNumber={this.state.pageNumber}
						length={length}
						backPage={this.backPage}
						nextPage={this.nextPage(slices.length)}
					/>
				</Loading>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ position }) => ({
	position,
});

PaginationCards.propTypes = {
	breweries: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			address: PropTypes.string.isRequired,
			visited: PropTypes.bool.isRequired,
			yelp: PropTypes.object.isRequired,
		})
	),
	limit: PropTypes.number.isRequired,
	position: PropTypes.object,
};

export default connect(mapStateToProps)(PaginationCards);
