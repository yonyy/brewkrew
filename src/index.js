import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import BrewKrew from './components/BrewKrew';
import reducers, { initialState } from './reducers';

const store = createStore(
	reducers,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<BrewKrew />
		</Provider>,
		document.getElementById('root')
	);
	Modal.setAppElement('#root');
}

document.addEventListener('DOMContentLoaded', render, false);
