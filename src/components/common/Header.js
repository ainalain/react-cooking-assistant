import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Header.scss';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li><Link className={styles.link} to='/bakery'>Bakery</Link></li>
            <li><Link className={styles.link} to='/meat'>Meat</Link></li>
            <li><Link className={styles.link} to='/fish'>Fish</Link></li>
            <li><Link className={styles.link} to='/desserts'>Desserts</Link></li>
          </ul>
        </nav>
        <span className={styles.search}>
        <input type='text' placeholder='Search' />
        </span>
    </header>
    );
  }
}
Header.propTypes = {

};

export default Header;
