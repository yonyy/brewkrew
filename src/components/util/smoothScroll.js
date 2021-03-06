import $ from 'jquery';

const getDuration = target => {
	const currentTop = $(window).scrollTop();
	const rate = 0.75;
	const distance = Math.abs(currentTop - target);
	return distance * rate;
};

export const smoothScrollById = id => {
	const position = document.getElementById(id).offsetTop; // subtract absolute header;
	const duration = getDuration(position); // miliseconds
	$('html, body').animate(
		{
			scrollTop: position
		},
		duration === 0 ? 500 : duration
	);
};

const smoothScroll = evt => {
	const id = evt.target.getAttribute('href').split('#')[1];
	smoothScrollById(id);
};

export default smoothScroll;
