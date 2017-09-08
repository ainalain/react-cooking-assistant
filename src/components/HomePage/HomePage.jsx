import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/recipeActions';
import Gallery from '../Gallery';
import Greetings from '../Greetings';
import styles from './HomePage.scss';


export const HomePage = ({ recipes, isLoading, match }) => {
  //const props = this.props;
  const category = match.params.category;

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  return (<div className={styles.home}>
    <Greetings />
    <Gallery recipes={recipes} category={category} />
  </div>);
};

HomePage.propTypes = {
  recipes: PropTypes.Array,
  isLoading: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.isLoading,
  recipes: state.recipes,
});

export default connect(mapStateToProps)(HomePage);
