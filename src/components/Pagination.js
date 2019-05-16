import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

const min = (num1, num2) => (num1 < num2 ? num1 : num2);
const max = (num1, num2) => (num1 < num2 ? num2 : num1);

const PageNumbers = ({ pageNumber, pagesTotal }) => {
	const maxShow = 5;
	const currentIter = Math.floor(pageNumber / maxShow);
	const max =
		maxShow * currentIter + maxShow < pagesTotal
			? maxShow * currentIter + maxShow
			: pagesTotal;
	const min = maxShow * currentIter + 1;
	const pageNumbers = range(min, max + 1);

	return (
		<span>
			{pageNumbers.map(number => {
				if (number - 1 === pageNumber)
					return (
						<span
							aria-label={`Current page number ${number}`}
							aria-current="true"
							className="bk-control-page-active"
							key={number}
						>
							{number}
						</span>
					);
				return (
					<span aria-label={`Page number ${number}`} key={number}>
						{number}
					</span>
				);
			})}
		</span>
	);
};

PageNumbers.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	pagesTotal: PropTypes.number.isRequired,
};

class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const isDisabled = back => {
			return (
				(back && this.props.pageNumber === 0) ||
				(!back && this.props.pageNumber === this.props.length - 1)
			);
		};

		const getClassName = (baseClass, back) => {
			if (isDisabled(back)) return `${baseClass} bk-button-disabled`;
			return baseClass;
		};

		const previousPageNum = max(this.props.pageNumber - 1, 0) + 1;
		const nextPageNum = min(this.props.pageNumber + 1, this.props.length) + 1;

		const isBackDisabled = isDisabled(true);
		const isForwardDisabled = isDisabled(false);
		const backLabel = isBackDisabled
			? 'Unable to go back a page'
			: `Back to page ${previousPageNum}`;
		const forwardLabel = isForwardDisabled
			? 'Unable to go forward a page'
			: `Forward to page ${nextPageNum}`;

		return (
			<div className="bk-pagination-controls-container">
				<div className="bk-pagination-controls">
					<div className="bk-control-back">
						<button
							type="button"
							aria-label={backLabel}
							aria-disabled={isBackDisabled}
							className={getClassName('bk-button bk-button-icon', true)}
							onClick={this.props.backPage}
						>
							<i aria-hidden="true" className="fas fa-chevron-left bk-icon" />
						</button>
					</div>
					<div className="bk-control-pages" role="presentation">
						<PageNumbers
							pageNumber={this.props.pageNumber}
							pagesTotal={this.props.length}
						/>
					</div>
					<div className="bk-control-forward">
						<button
							type="button"
							aria-label={forwardLabel}
							aria-disabled={isForwardDisabled}
							className={getClassName('bk-button bk-button-icon', false)}
							onClick={this.props.nextPage}
						>
							<i aria-hidden="true" className="fas fa-chevron-right bk-icon" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

Pagination.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired,
};

export default Pagination;
