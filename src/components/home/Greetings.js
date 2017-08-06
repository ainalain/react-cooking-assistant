import React from 'react';
import PropTypes from 'prop-types';
import Tom from './Tom';
import Assistant from '../common/Assistant';
import styles from './Greetings.scss';

const Greetings = () => {
  let tryOutStyle =`${styles.animated} ${styles.shake}`;
  return (
    <section className={styles.greetings}>
      <h1 className={styles.hiddenHeading}>Hands-free cooking website</h1>
      <div className={styles.container}>
        <div className={styles.tomContainer}>
          <Tom  className={styles.greetingSVG} />
        </div>
        <aside className={styles.aside}>
        <p className={styles.typed}>To speak with Tom, you need to allow Chrome permission to access your microphone. Please be sure that your volume is turned&nbsp;on.</p>
        </aside>
        <p className={styles.hello}>Hello, this is a cooking website with your personal assistant Tom.</p>
        <div className={styles.launch}>
          <p className={`${styles.try} ${tryOutStyle}`}>Want to try now?</p>
          <Assistant category={'bakery'} id={'currant-brownie'} intro={true} />
        </div>
      </div>
    </section>
  );
};

Greetings.propTypes = {

};

export default Greetings;
