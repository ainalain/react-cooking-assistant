import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const history = createBrowserHistory();

render(<Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>, document.getElementById('app'));
