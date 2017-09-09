import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../../assets/icons/clock.svg';
import Serving from '../../assets/icons/serving.svg';
import Icon from '../Icon';
import Assistant from '../../containers/Assistant';
import styles from './InfoLine.scss';

const InfoLine = ({ card, time, serving, category, id }) => {
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
      {card ? null : <Assistant category={category} id={id} />}
    </div>
  );
};

InfoLine.defaultProps = {
  card: false,
  category: null,
  id: null,
  time: '30',
  serving: '3',
};

InfoLine.propTypes = {
  serving: PropTypes.string,
  time: PropTypes.string,
  category: PropTypes.string,
  card: PropTypes.bool,
  id: PropTypes.string,
};

export default InfoLine;
