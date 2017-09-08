import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './components/App';
import '../config/Reactotron.config';
import store from './store';

const history = createBrowserHistory();
console.log('app: ', App);
render(<Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
</Provider>, document.getElementById('app'));
