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
			google,
			theme
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
						<section className="bk-section" aria-label="Map">
							<MapOverlayButtons resetSearch={() => setFiltering('')}>
								<Map
									data={breweries}
									points={filteredBreweries}
									doubleClick={setFiltering}
									google={google}
									theme={theme}
								/>
							</MapOverlayButtons>
						</section>
						<section
							className="bk-section"
							id="cards"
							aria-label="Brewery Cards"
						>
							<PaginationCards limit={10} breweries={filteredBreweries} />
						</section>
						<section
							className="bk-section"
							id="conquerors"
							aria-label="Conquerors"
						>
							<Conquerors />
						</section>
					</div>
				</div>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = ({
	breweries,
	filteredBreweries,
	searchTerm,
	google,
	theme
}) => ({
	breweries,
	filteredBreweries,
	searchTerm,
	google,
	theme
});

const mapDispatchToProps = dispatch => ({
	setFiltering: text => dispatch(setFiltering(text))
});

BrewKrewContainer.propTypes = {
	breweries: PropTypes.array,
	filteredBreweries: PropTypes.array,
	setFiltering: PropTypes.func,
	searchTerm: PropTypes.string,
	google: PropTypes.object,
	theme: PropTypes.string
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrewKrewContainer);
