import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import HomePage from '../HomePage';
import CategoryPage from '../../containers/CategoryPage';
import RecipePage from '../../containers/RecipePage';
import styles from './layout.scss';

export const App = (props) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:category" component={CategoryPage} />
      <Route path="/:category/:id" component={RecipePage} />
    </Switch>
  </div>
);

export default App;
