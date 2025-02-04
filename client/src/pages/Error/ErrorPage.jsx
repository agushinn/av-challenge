import { Outlet, NavLink } from 'react-router-dom'

import { Layout } from '@pages/Layout/Layout'

import styles from '@styles/pages/ErrorPage/ErrorPage.module.scss'

const ErrorPage = () => {
    return (
        <Layout>
            <div className={styles.errorPageContainer}>
                <h1 className={styles.errorPageTitle}>404</h1>
                <h3 className={styles.errorPageSubtitle}>Page not found :(</h3>
                <NavLink to="/" className={styles.errorPageLink}>
                    Go back to home
                </NavLink>
            </div>
        </Layout>
    )
}

export { ErrorPage }
