import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '../Card';
import styles from './Gallery.scss';


const Gallery = ({ recipes, category }) => {
  return (
    <section className={styles.gallery}>
      <h1 className={styles.categoryHeader}>
        {category ? category : 'Favorite recipes'}</h1>
      {recipes.map(recipe => (
        <Link className={styles.link}
          to={`/${recipe.category.toLowerCase()}/${recipe.id}`}
          key={recipe.id}>
            <Card recipe={recipe} />
          </Link>)
      )}
    </section>
  );
};

Gallery.propTypes = {
  recipes: PropTypes.array.isRequired,
  category: PropTypes.string
};

export default Gallery;
