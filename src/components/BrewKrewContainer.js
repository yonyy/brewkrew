import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';
import HeaderContainer from './HeaderContainer';
import Menu from './Menu';
import Search from './Search';
import Map from './Map';
import MapOverlayButtons from './MapOverlayButtons';
import PaginationCards from './PaginationCards';
import Conquerors from './Conquerors';

import { setFiltering } from '../actions';

class BrewKrewContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			filteredBreweries,
			breweries,
			setFiltering,
			searchTerm,
		} = this.props;

		return (
			<ErrorBoundary>
				<div className="bk-container">
					<HeaderContainer>
						<div className="bk-heading-item">
							<Menu />
						</div>
						<div className="bk-heading-item">
							<header className="bk-header">
								<h1>Brew Krew</h1>
							</header>
						</div>
						<div className="bk-heading-item">
							<Search onChange={setFiltering} value={searchTerm} />
						</div>
					</HeaderContainer>
					<div className="bk-sections-container">
						<div className="bk-section">
							<MapOverlayButtons resetSearch={() => setFiltering('')}>
								<Map
									data={breweries}
									points={filteredBreweries}
									doubleClick={setFiltering}
								/>
							</MapOverlayButtons>
						</div>
						<div className="bk-section" id="cards">
							<PaginationCards limit={10} breweries={filteredBreweries} />
						</div>
						<div className="bk-section" id="conquerors">
							<Conquerors />
						</div>
					</div>
				</div>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = ({ breweries, filteredBreweries, searchTerm }) => ({
	breweries,
	filteredBreweries,
	searchTerm,
});

const mapDispatchToProps = dispatch => ({
	setFiltering: text => dispatch(setFiltering(text)),
});

BrewKrewContainer.propTypes = {
	breweries: PropTypes.array,
	filteredBreweries: PropTypes.array,
	setFiltering: PropTypes.func,
	searchTerm: PropTypes.string,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrewKrewContainer);
