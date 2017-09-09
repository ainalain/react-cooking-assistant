import React from 'react';
import PropTypes from 'prop-types';
import styles from './ItemsList.scss';

const ItemsList = ({ items, title }) => (
  <div className={styles.section}>
    <h2 className={`${styles.heading} ${styles[title]}`}>{title}</h2>
    <ul className={`${styles.items} ${styles[title]}`}>
      {items.map(item => (
        <li key={item} className={styles.item}>{item}</li>
      ))}
    </ul>
  </div>
);

ItemsList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default ItemsList;
