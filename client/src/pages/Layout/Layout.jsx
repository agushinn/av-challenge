import { Outlet, NavLink } from 'react-router-dom'

import styles from '@styles/pages/Layout/Layout.module.scss'

const Layout = ({ children }) => {
    return (
        <main className={styles.layout}>
            <h1 className={styles.layoutTitle}>GRAB THE SHOVEL</h1>
            <nav className={styles.layoutNav}>
                <ul className={styles.layoutNavList}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles.active : ''
                            }
                        >
                            JOBS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                isActive ? styles.active : ''
                            }
                        >
                            CREATE JOB
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/users/create"
                            className={({ isActive }) =>
                                isActive ? styles.active : ''
                            }
                        >
                            CREATE USER
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
            {children}
        </main>
    )
}

export { Layout }
