import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './App';
import reducers from './reducers';

const initialState = {
	candidates: []
}
const mockStore = createStore(reducers, initialState)

ReactDOM.render(
	<Provider store={mockStore}>
		<App />
	</Provider>
	, document.getElementById('root'));
