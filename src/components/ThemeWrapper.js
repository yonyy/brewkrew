import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ThemeWrapper extends React.PureComponent {
	render() {
		const { theme } = this.props;
		return <div className={theme || ''}>{this.props.children}</div>;
	}
}

const mapStateToProps = ({ theme }) => ({
	theme
});

ThemeWrapper.propTypes = {
	children: PropTypes.object,
	theme: PropTypes.string
};

export default connect(mapStateToProps)(ThemeWrapper);
