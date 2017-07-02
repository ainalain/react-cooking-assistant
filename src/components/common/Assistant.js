import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import AssistantIcon from '../../assets/icons/assistant.svg';
import styles from './Assistant.scss';

const Assistant = () => {
  return (
    <div className={styles.assistant}>
      <button
        value='submit'
        className={styles.button}>
        <div className={styles.robot}>
          <Icon glyph={AssistantIcon} className={styles.icon} />
        </div>
        <span className={styles.text}>Assistant</span>
      </button>
    </div>
  );
};

Assistant.propTypes = {

};

export default Assistant;
