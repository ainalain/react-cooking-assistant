import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.scss';

const pathToImages = '../../assets/images';

const Card = ({ recipe }) => {

  return (
    <div className={styles.card}>
        <div className={styles.photo}>
          <img className={styles.image}
            src={`${pathToImages}/${recipe.id}.png`}
            alt={`${recipe.title} recipe`} />
        </div>
        <div className={styles.cookingTime}>
        cookingTime={recipe.cookingTime}
        </div>
    </div>
  );
};

Card.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default Card;
