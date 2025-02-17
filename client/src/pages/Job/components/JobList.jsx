import styles from '@styles/pages/Job/components/JobList.module.scss'
import { currencyFormat } from '@utils/currencyFormat'
import { Link } from 'react-router-dom'

const JobList = ({ jobs, className, canEdit }) => {
    return (
        <div className={className}>
            <h5 className={styles.jobsListTitle}>
                Result quantity: {jobs.length}
            </h5>
            <ul className={styles.jobsList}>
                {jobs.map((job) => (
                    <li key={job.id} className={` ${styles.jobItem}`}>
                        <h2>{job.title}</h2>#{job.id}
                        <p>
                            <span>Location: </span>
                            {job.location}
                        </p>
                        <p>
                            <span>Salary: </span>
                            {currencyFormat(job.salary)}
                        </p>
                        <div>
                            {' '}
                            |
                            {job.skills.map((skill) => (
                                <span key={skill}> {skill} | </span>
                            ))}
                        </div>
                        {canEdit && (
                            <div className={styles.editButton}>
                                <Link to={`/edit/${job.id}`}>Edit</Link>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { JobList }
