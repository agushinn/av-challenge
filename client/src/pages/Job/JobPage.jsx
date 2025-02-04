import { useState } from 'react'

import styles from '@styles/pages/Job/JobPage.module.scss'

import { Link } from 'react-router-dom'
import { useGetJobsQuery } from '@store/api/apiSlice/jobsSlice'

import { currencyFormat } from '@utils/currencyFormat'

import { ErrorBox } from '@pages/Job/components/ErrorBox'
import { JobSkelleton } from '@pages/Job/components/JobSkelleton'

const JobPage = () => {
    const [formValues, setFormValues] = useState({
        include_external: true,
        title: '',
        location: '',
        salaryMax: '',
        salaryMin: '',
    })

    const [queryParams, setQueryParams] = useState({})

    const {
        data: response,
        isLoading,
        isError,
        refetch,
    } = useGetJobsQuery(queryParams)

    const jobs = response?.data

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevFormValues) => {
            return { ...prevFormValues, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { include_external, title, location, salaryMax, salaryMin } =
            formValues

        setQueryParams({
            include_external,
            title,
            location,
            salary_max: salaryMax,
            salary_min: salaryMin,
        })
        refetch()
    }

    const handleClean = () => {
        setFormValues({
            include_external: true,
            title: '',
            location: '',
            salaryMax: '',
            salaryMin: '',
        })
        setQueryParams({})
        refetch()
    }

    const internalJobs = jobs?.filter(
        (job) => !(typeof job.id === 'string' && job.id.includes('external'))
    )
    const externalJobs = jobs?.filter(
        (job) => typeof job.id === 'string' && job.id.includes('external')
    )

    return (
        <section className={styles.mainContainer}>
            <h2 className={styles.jobPageTitle}>FIND YOUR JOB</h2>
            <form onSubmit={handleSubmit} className={styles.formJob}>
                <label htmlFor="title">Title</label>
                <input
                    value={formValues.title}
                    type="text"
                    placeholder="Title"
                    onChange={handleInputChange}
                    name="title"
                />
                <label htmlFor="location">Location</label>
                <input
                    value={formValues.location}
                    type="text"
                    placeholder="Location"
                    onChange={handleInputChange}
                    name="location"
                />

                <div className={styles.salariesContainer}>
                    <label htmlFor="salaryMin">Min salary</label>
                    <input
                        value={formValues.salaryMin}
                        type="number"
                        placeholder="Min Salary"
                        onChange={handleInputChange}
                        name="salaryMin"
                    />
                    <label htmlFor="salaryMax">Max salary</label>
                    <input
                        value={formValues.salaryMax}
                        type="number"
                        placeholder="Max Salary"
                        onChange={handleInputChange}
                        name="salaryMax"
                    />
                </div>
                <div className={styles.buttonsContainers}>
                    <button
                        className={styles.cleanButton}
                        type="button"
                        onClick={handleClean}
                    >
                        Clean
                    </button>
                    <button className={styles.searchButton} type="submit">
                        Search
                    </button>
                </div>
                <div className={styles.checkboxContainer}>
                    <label htmlFor="include_external">
                        Include external jobs
                    </label>
                    <input
                        type="checkbox"
                        checked={formValues.include_external}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                include_external: e.target.checked,
                            })
                        }
                        name="include_external"
                    />
                </div>
            </form>
            {isError && <ErrorBox refetch={refetch} />}
            {isLoading && <JobSkelleton />}
            {!isLoading && jobs && (
                <div className={styles.jobsContainer}>
                    <ul className={styles.jobsList}>
                        <h5> Result quantity: {internalJobs.length}</h5>
                        {internalJobs.map((job) => (
                            <li key={job.id} className={styles.internalJobs}>
                                <h2>
                                    {job.title} #{job.id}
                                </h2>

                                <p>
                                    <span>Location: </span>
                                    {job.location}
                                </p>
                                <p>
                                    <span>Salary: </span>
                                    {currencyFormat(job.salary)}
                                </p>
                                <div>
                                    {job.skills.map((skill) => (
                                        <span key={skill}>{skill} | </span>
                                    ))}
                                </div>
                                <div className={styles.editButton}>
                                    <Link to={`/edit/${job.id}`}>Edit</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.jobsList}>
                        <h5>Result quantity: {externalJobs.length}</h5>
                        {externalJobs.map((job) => (
                            <li key={job.id} className={styles.externalJob}>
                                <h2>{job.title}</h2>
                                <p>
                                    <span>Location: </span>
                                    {job.location}
                                </p>
                                <p>
                                    <span>Salary: </span>
                                    {currencyFormat(job.salary)}
                                </p>
                                <div>
                                    {job.skills.map((skill) => (
                                        <span key={skill}>{skill} | </span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}

export { JobPage }
