import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

import smoothScroll from './util/smoothScroll';
import defaultMenuItems from './util/menuItems';

import { setTheme } from '../actions';
const ESC = 'Escape';

const getOnClick = (type, action, payload, dispatch) => {
	if (type === 'link') return null;

	if (type === 'scroll_dom') return smoothScroll;

	if (action === 'SET_THEME') return () => dispatch(setTheme(payload));
};

const MenuItem = ({ menuItem, dispatch }) => {
	const { type, icon, href, action, payload, text } = menuItem;

	const onClick = getOnClick(type, action, payload, dispatch);
	return (
		<li role="menuitem" className="bk-nav-list-item">
			<a href={href} className="bk-link" onClick={onClick}>
				{text}
				{icon ? (
					<i aria-hidden="true" className={`bk-icon fas fa-${icon}`} />
				) : null}
			</a>
		</li>
	);
};

MenuItem.propTypes = {
	menuItem: PropTypes.object.isRequired,
	dispatch: PropTypes.func,
};

class Menu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.toggledOff = false;
		this.toggleNav = this.toggleNav.bind(this);
		this.closeOnBlur = this.closeOnBlur.bind(this);
		this.resetFocus = this.resetFocus.bind(this);
		this.captureEsc = this.captureEsc.bind(this);
	}

	componentDidUpdate() {
		if (this.state.navOpen) this.addListeners();
		else this.removeListeners();
	}

	addListeners() {
		document.body.addEventListener('click', this.closeOnBlur, false);
		document.body.addEventListener('keyup', this.captureEsc, false);
	}

	removeListeners() {
		document.body.removeEventListener('click', this.closeOnBlur);
		document.body.removeEventListener('keyup', this.captureEsc);
	}

	captureEsc(evt) {
		if (evt.key !== ESC) return;

		this.toggleNav(evt);
		this.resetFocus();
	}

	closeOnBlur(evt) {
		if (evt.target.matches('button#menu-toggle *')) return;

		this.toggleNav();
	}

	toggleNav() {
		this.setState({ navOpen: !this.state.navOpen });
	}

	resetFocus() {
		let node = ReactDOM.findDOMNode(this.navButtonRef);
		node.focus();
	}

	render() {
		const { navOpen } = this.state;
		const { dispatch, menuItems } = this.props;
		const bkNavClass = 'bk-nav' + (this.state.navOpen ? '' : ' bk-nav-hidden');

		return (
			<div className="bk-nav-container">
				<button
					type="button"
					aria-label="Menu"
					aria-haspopup="true"
					aria-controls="menuItems"
					aria-expanded={navOpen}
					type="button"
					ref={node => {
						this.navButtonRef = node;
					}}
					id="menu-toggle"
					onClick={this.toggleNav}
					className="bk-button bk-button-icon bk-nav-control"
				>
					<i aria-hidden="true" className="bk-icon fas fa-bars bk-icon" />
				</button>
				<nav className={bkNavClass} id="menuItems">
					<ul className="bk-nav-list" role="menubar">
						{map(menuItems, (menuItem, index) => (
							<MenuItem menuItem={menuItem} key={index} dispatch={dispatch} />
						))}
					</ul>
				</nav>
			</div>
		);
	}
}

Menu.propTypes = {
	dispatch: PropTypes.func.isRequired,
	menuItems: PropTypes.array.isRequired,
};

Menu.defaultProps = {
	menuItems: defaultMenuItems,
};

export default connect()(Menu);
