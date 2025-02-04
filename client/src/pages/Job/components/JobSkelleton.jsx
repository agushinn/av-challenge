import React from 'react'
import styles from '@styles/pages/Job/components/JobSkelleton.module.scss'

const JobSkelleton = () => {
    return (
        <div className={styles.jobSkelletonContainer}>
            <div className={styles.jobSkelleton}></div>
            <div className={styles.jobSkelleton}></div>
            <div className={styles.jobSkelleton}></div>
            <div className={styles.jobSkelleton}></div>
        </div>
    )
}

export { JobSkelleton }
