import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../../assets/icons/clock.svg';
import Icon from '../common/Icon';
import styles from './Recipe.scss';

const pathToImages = '../../assets/images';

const Recipe = ({ recipe }) => {
  return (
    <section className={styles.recipe}>
       <h1 className={styles.recipeHeader}>{recipe.title}</h1>
       <p className={styles.category}>{recipe.category}</p>
       <div className={styles.info}>
          <div className={styles.time}>
            <div className={styles.clock}>
            <Icon glyph={Clock} className={styles.clockIcon} />
           </div>
           <span className={styles.cookingTime}>{recipe.cookingTime} min</span>
          </div>
          <div className={styles.serving}>{recipe.serving} person</div>
       </div>
       <div className={styles.card}>
         <div className={styles.photo}>
           <img className={styles.image}
             src={`${pathToImages}/${recipe.id}.png`}
             alt={`${recipe.title} recipe`} />
         </div>
         <div className={styles.ingredients}>
         <h2 className={styles.ingredientsHeading}>ingredients</h2>
          <ul className={styles.ingredientsList}>
            {recipe.ingredients.map(item => (
              <li key={item} className={styles.item}>{item}</li>
              )
            )}
          </ul>
         </div>
        </div>
       <div className={styles.steps}>
       <h2 className={styles.stepsHeading}>Steps</h2>
        <ul className={styles.stepsList}>
          {recipe.steps.map(item => (
            <li key={item} className={styles.step}>{item}</li>
            )
          )}
        </ul>
       </div>
      </section>
  );
};

Recipe.propTypes = {

};

export default Recipe;
