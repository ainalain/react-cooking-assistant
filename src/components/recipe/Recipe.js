import React from 'react';
import PropTypes from 'prop-types';
import ItemsList from '../common/ItemsList';
import Icon from '../common/Icon';
import InfoLine from './InfoLine';
import styles from './Recipe.scss';

const pathToImages = '../../assets/images';

const Recipe = ({ recipe }) => {
  return (
    <section className={styles.recipe}>
       <h1 className={styles.recipeHeader}>{recipe.title}</h1>
       <p className={styles.category}>{recipe.category}</p>
       <InfoLine time={recipe.cookingTime} serving={recipe.serving} />
       <div className={styles.card}>
         <div className={styles.photo}>
           <img className={styles.image}
             src={`${pathToImages}/${recipe.id}.png`}
             alt={`${recipe.title} recipe`} />
         </div>
          <ItemsList items={recipe.ingredients} title='ingredients' />
        </div>
       <div className={styles.steps}>
       <ItemsList items={recipe.steps} title='steps' />
       </div>
      </section>
  );
};

Recipe.propTypes = {

};

export default Recipe;
