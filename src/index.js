import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './App';


const basicReducer = (state) => state;
const mockStore = createStore(basicReducer)

ReactDOM.render(
	<Provider store={mockStore}>
		<App />
	</Provider>
	, document.getElementById('root'));
