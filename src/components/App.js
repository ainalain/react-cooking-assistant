import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import CategoryPage from './recipe/CategoryPage';
import RecipePage from './recipe/RecipePage';
import styles from './layout.scss';

const App = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:category" component={CategoryPage} />
        <Route exact path="/category/:id" component={RecipePage} />
      </Switch>
    </div>
  );
};

export default App;
