import React from 'react';
import PropTypes from 'prop-types';
import InfoLine from '../InfoLine';
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
        <div className={styles.info}>
          <div className={styles.title}>{recipe.title}</div>
          <InfoLine card='true' time={recipe.cookingTime} serving={recipe.serving} />
        </div>
    </div>
  );
};

Card.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default Card;
