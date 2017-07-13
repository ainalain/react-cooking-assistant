/*
 * This component is a css + svg animation
 * Snippet taken from a pen by Yoksel: https://codepen.io/yoksel/pen/XJbzrO
 */

import React from 'react';
import styles from './Tom.scss';

const Tom = () => {
  return (
      <svg viewBox="10 0 140 80" className={styles.tom}>
        <symbol id='text'>
          <text textAnchor='middle' className={styles.textLine}
            x='50%' y='35%' >
            Cook with
          </text>
          <text textAnchor='middle' className={styles.textLine2}
            x='50%' y='68%' >
            Tom
          </text>
        </symbol>

        <g className={styles.ants}>
          <use xlinkHref={'#text'}
            className={styles.textCopy}></use>
          <use xlinkHref={'#text'}
            className={styles.textCopy}></use>
          <use xlinkHref={'#text'}
            className={styles.textCopy}></use>
          <use xlinkHref={'#text'}
            className={styles.textCopy}></use>
          <use xlinkHref={'#text'}
            className={styles.textCopy}></use>
        </g>
      </svg>
  );
};

export default Tom;
