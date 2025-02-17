import { useState } from 'react'

import styles from '@styles/pages/Job/components/JobList.module.scss'
import { currencyFormat } from '@utils/currencyFormat'
import { Link } from 'react-router-dom'

const SORT_TYPES = {
    TITLE: 'TITLE',
    SALARY: 'SALARY',
}

const SORT_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC',
}

const JobList = ({ jobs, className, canEdit }) => {
    const [sortType, setSortType] = useState(SORT_TYPES.TITLE)
    const [sort, setSort] = useState(SORT_ORDER.ASC)

    const handleSortType = (e) => {
        setSortType(e.target.value)
    }

    const handleSort = (e) => {
        setSort(e.target.value)
    }

    const sortedJobs = () => {
        let sortedJobs = [...jobs]
        if (sortType === SORT_TYPES.TITLE) {
            sortedJobs.sort((a, b) => {
                if (sort === SORT_ORDER.ASC) {
                    return a.title.localeCompare(b.title)
                }
                return b.title.localeCompare(a.title)
            })
        }

        if (sortType === SORT_TYPES.SALARY) {
            sortedJobs.sort((a, b) => {
                if (sort === SORT_ORDER.ASC) {
                    return a.salary - b.salary
                }
                return b.salary - a.salary
            })
        }
        return sortedJobs
    }

    return (
        <div className={className}>
            <div className={styles.sortContainer}>
                <select name="sortType" id="sortType" onChange={handleSortType}>
                    <option value={SORT_TYPES.TITLE}>Title</option>
                    <option value={SORT_TYPES.SALARY}>Salary</option>
                </select>
                <select name="sort" id="sort" onChange={handleSort}>
                    <option value={SORT_ORDER.ASC}>Ascending</option>
                    <option value={SORT_ORDER.DESC}>Descending</option>
                </select>
            </div>
            <div className={styles.sortInfo}>
                <span>Sort by: </span>
                <span>{sortType}</span>
                <span> - </span>
                <span>{sort}</span>
            </div>
            <h5 className={styles.jobsListTitle}>
                Result quantity: {jobs.length}
            </h5>
            <ul className={styles.jobsList}>
                {sortedJobs().map((job) => (
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
