import React from 'react';
import PropTypes from 'prop-types';
import styles from './Greetings.scss';

const Greetings = () => {
  return (
    <section className={styles.greetings}>
      <h1>Start cooking without taping and scrolling the recipe!</h1>
      <p>Hello, this is an experimental site for cooking.</p>
    </section>
  );
};

Greetings.propTypes = {

};

export default Greetings;
