import { Outlet } from 'react-router-dom'
import styles from '@styles/pages/Job/JobPageLayout.module.scss'
const JobPageLayout = () => {
    return (
        <section className={styles.jobPageLayout}>
            <h2 className={styles.jobPageLayoutTitle}>Jobs</h2>
            <Outlet />
        </section>
    )
}

export { JobPageLayout }
