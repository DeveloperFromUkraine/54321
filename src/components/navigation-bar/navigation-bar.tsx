import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './navigation-bar.module.scss'

export const NavigationBar = () => {
  return (
    <ul>
      <li>
        <NavLink activeClassName={styles.active} className={styles.default} to='/select-team'>
          Select your Team
        </NavLink>
      </li>
    </ul>
  )
}
