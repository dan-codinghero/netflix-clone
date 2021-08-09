import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/index';
import App from './App';

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

render(app, document.getElementById('root'));
