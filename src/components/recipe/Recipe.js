import React from 'react';
import PropTypes from 'prop-types';
import styles from './Recipe.scss';

const pathToImages = '../../assets/images';

const Recipe = ({ recipe }) => {
  return (
    <section className={styles.recipe}>
       <h1 className={styles.recipeHeader}>{recipe.title}</h1>
       <div className={styles.info}>{recipe.cookingTime}</div>
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
              <li key={item}>{item}</li>
              )
            )}
          </ul>
         </div>
        </div>
       <div className={styles.steps}>
       <h2 className={styles.stepsHeading}>Steps</h2>
        <ul className={styles.stepsList}>
          {recipe.steps.map(item => (
            <li key={item}>{item}</li>
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
