
import React from 'react';
import { Link, NavLink, useNavigation, useParams, useRoutes } from 'react-router-dom';
import styles from '../header/header.module.css'
function Header() {
  
  return (
    <nav >
      <ul className={styles.container} >
        <li><NavLink className={({isActive})=> isActive?`active ${styles.link}`: styles.link} to="/">Saat</NavLink></li>
        <li><NavLink className={({isActive})=> isActive?`active ${styles.link}`: styles.link} to="/stopwatch">Saniyəölçən</NavLink></li>
        <li><NavLink className={({isActive})=> isActive?`active ${styles.link}`: styles.link} to="/timer">Taymer</NavLink></li>
      </ul>
    </nav>
  );
}

export default Header;
