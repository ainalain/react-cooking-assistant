import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.scss';

const images = require.context('../../assets/images', true);

const Gallery = ({ recipes, category }) => {
  return (
    <section className={styles.gallery}>
      <h1 className={styles.categoryHeader}>{category ? category : 'Favorite recipes'}</h1>
      {recipes.map(recipe => (
        <div className={styles.card} key={recipe.id}>
          <div className={styles.photo}>
            <img className={styles.image}
              src={images(`./${recipe.id}.png`, true)}
              alt={`${recipe.title} recipe`} />
          </div>
          <div className={styles.cookingTime}>
          cookingTime={recipe.cookingTime}
          </div>
        </div>)
      )}
    </section>
  );
};

Gallery.propTypes = {
  recipes: PropTypes.array.isRequired,
  category: PropTypes.string
};

export default Gallery;
