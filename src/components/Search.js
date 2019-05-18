import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { searchOpen: false };
		this.toggleSearchField = this.toggleSearchField.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	toggleSearchField() {
		this.setState({ searchOpen: !this.state.searchOpen });
	}

	onChange(evt) {
		const value = evt.target.value;
		this.props.onChange(value);
	}

	render() {
		let bkSearchClass =
			'bk-search-field bk-search-expand-animation' +
			(this.state.searchOpen ? ' bk-search-expanded' : '');
		let tabIndex = this.state.searchOpen ? 0 : -1;
		let buttonLabel = this.state.searchOpen
			? 'Collapse search input field'
			: 'Expand search input field';

		return (
			<div className="bk-search-container">
				<div className="bk-search-field-container">
					<button
						type="button"
						aria-label={buttonLabel}
						aria-expanded={this.state.searchOpen}
						aria-controls="brewerySearch"
						className="bk-button bk-button-icon"
						onClick={this.toggleSearchField}
					>
						<i aria-hidden="true" className="fas fa-search bk-icon" />
					</button>
					<input
						id="brewerySearch"
						tabIndex={tabIndex}
						onChange={this.onChange}
						value={this.props.value}
						className={bkSearchClass}
						type="text"
						placeholder=":visited"
						aria-label="Type to filter breweries"
					/>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default Search;
