import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import HDRRouter from './HDRRouter';
// import * as serviceWorker from './serviceWorker';

import './css/custom-css-bootstrap-magic-2020-02-10.css';
import 'react-datepicker/dist/react-datepicker.css';
import './css/styles.scss';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
	gtmId: 'GTM-NL9B25X',
    auth: 'OaO70X9Iqr1iIzTL76PNAQ',
    preview: 'env-4'
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<HDRRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
