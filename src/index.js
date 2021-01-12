//dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
//import store of redux
import store from './store';

//redux..

//routes
import AppRoutes from "./routes";
import './index.css';
//import * as serviceWorker from './serviceWorker';
//import  'bootstrap/dist/css/bootstrap.css';

const app=<Provider store={store}>
	< Router > 
		< AppRoutes / > 
	</Router >
</Provider>

ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//</Router>serviceWorker.unregister();