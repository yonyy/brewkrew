import React from 'react';
import PropTypes from 'prop-types';
import conquerors from './util/conquerors';

const ConquerorImage = ({ url, initials }) => {
	if (!url)
		return (
			<div className="bk-conqueror-img">
				<p className={'bk-conqueror-initials'}>{initials}</p>
			</div>
		);

	return <img className="bk-conqueror-img" src={url} />;
};

ConquerorImage.propTypes = {
	url: PropTypes.string,
	initials: PropTypes.string
};

const Conqueror = ({ conqueror }) => {
	const initials = name => {
		return name
			.split(' ')
			.reduce((str, name) => str + name[0].toUpperCase(), '');
	};

	debugger;

	return (
		<div className="bk-conqueror-container">
			<div className="bk-conqueror-img-container">
				<ConquerorImage
					url={conqueror.backgroundUrl}
					initials={initials(conqueror.name)}
				/>
			</div>
			<div className="bk-conqueror-name">
				<p>{conqueror.name}</p>
			</div>
		</div>
	);
};

Conqueror.propTypes = {
	conqueror: PropTypes.object.isRequired
};

const Conquerors = () => {
	return (
		<div className="bk-conquerors-container">
			{conquerors.map((c, index) => {
				return <Conqueror conqueror={c} key={index} />;
			})}
		</div>
	);
};

export default Conquerors;
