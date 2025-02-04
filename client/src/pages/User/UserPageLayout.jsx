import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from '@styles/pages/User/UserPageLayout.module.scss'
const UserPageLayout = () => {
    return (
        <section className={styles.userPageLayout}>
            <h2 className={styles.userPageLayoutTitle}>User</h2>
            <Outlet />
        </section>
    )
}

export { UserPageLayout }
