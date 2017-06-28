import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../../assets/icons/clock.svg';
import Serving from '../../assets/icons/serving.svg';
import Icon from '../common/Icon';
import styles from './InfoLine.scss';

const InfoLine = ({ time, serving }) => {
  return (
    <div className={styles.info}>
       <div className={styles.time}>
         <div className={styles.clock}>
         <Icon glyph={Clock} className={styles.clockIcon} />
        </div>
        <span className={styles.text}>{time} min</span>
       </div>
       <div className={styles.serving}>
         <div className={styles.clock}>
           <Icon glyph={Serving} className={styles.clockIcon} />
        </div>
        <span className={styles.text}>{serving} person</span>
       </div>
    </div>
  );
};

InfoLine.propTypes = {
  time: PropTypes.string.isRequired,
  serving: PropTypes.string.isRequired
};

export default InfoLine;
