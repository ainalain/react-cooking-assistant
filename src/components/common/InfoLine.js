import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../../assets/icons/clock.svg';
import Serving from '../../assets/icons/serving.svg';
import Icon from './Icon';
import Assistant from './Assistant';
import styles from './InfoLine.scss';

const InfoLine = ({ card, time, serving }) => {
  const cssClass = card ? `${styles.info} ${styles.card}` : `${styles.info}`;
  return (
    <div className={cssClass}>
       <div className={styles.time}>
         <div className={styles.iconWrap}>
         <Icon glyph={Clock} className={styles.icon} />
        </div>
        <span className={styles.text}>{time} min</span>
       </div>
       <div className={styles.serving}>
         <div className={styles.iconWrap}>
           <Icon glyph={Serving} className={styles.icon} />
        </div>
        <span className={styles.text}>{serving} person</span>
       </div>
       {card ? null : <Assistant />}
    </div>
  );
};

InfoLine.propTypes = {
  time: PropTypes.string.isRequired,
  serving: PropTypes.string.isRequired
};

export default InfoLine;
