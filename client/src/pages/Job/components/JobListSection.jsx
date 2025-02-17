import styles from '@styles/pages/Job/components/JobListSection.module.scss'
import { JobList } from '@pages/Job/components/JobList'

const JobListSection = ({ internalJobs, externalJobs }) => {
    return (
        <div className={styles.jobsContainer}>
            <JobList
                className={styles.internalJobs}
                jobs={internalJobs}
                canEdit
            />
            <JobList className={styles.externalJob} jobs={externalJobs} />
        </div>
    )
}

export { JobListSection }
