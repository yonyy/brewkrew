import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const PaginationControl = ({ label, onClick, icon, descending, active }) => {
	const ariaSort = descending ? 'descending' : 'ascending';
	const className = active ? 'bk-active' : '';
	return (
		<button
			aria-label={label}
			aria-sort={active ? ariaSort : 'none'}
			onClick={onClick}
			type="button"
			className={`bk-sortby-button bk-button bk-button-icon ${className}`}
		>
			<i aria-hidden className={`fas fa-${icon} bk-icon`} />
		</button>
	);
};

PaginationControl.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.string,
	descending: PropTypes.bool,
	active: PropTypes.bool
};

class PaginationControls extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onSelect, activeControl, controls } = this.props;
		const onClick = control => () => {
			onSelect(control);
		};

		return (
			<div className="bk-sortby-buttons">
				{map(controls, (control, index) => {
					return (
						<PaginationControl
							active={activeControl.key === control.key}
							{...control}
							onClick={onClick(control)}
							key={index}
						/>
					);
				})}
			</div>
		);
	}
}

PaginationControls.propTypes = {
	controls: PropTypes.array.isRequired,
	activeControl: PropTypes.object,
	onSelect: PropTypes.func
};

export default PaginationControls;
