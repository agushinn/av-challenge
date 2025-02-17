import { useState } from 'react'

import styles from '@styles/pages/Job/JobPage.module.scss'

import { useGetJobsQuery } from '@store/api/apiSlice/jobsSlice'

import { ErrorBox } from '@pages/Job/components/ErrorBox'
import { JobSkelleton } from '@pages/Job/components/JobSkelleton'
import { TabbedJobList } from '@pages/Job/components/TabbedJobList'
import { JobListSection } from '@pages/Job/components/JobListSection'
import { Input } from '@components/UI/Form/Input'
import { Checkbox } from '@components/UI/Form/Checkbox'

const JobPage = () => {
    const [activeTab, setActiveTab] = useState('grabShobel')
    const [formValues, setFormValues] = useState({
        include_external: true,
        title: '',
        location: '',
        salaryMax: '',
        salaryMin: '',
    })

    const [queryParams, setQueryParams] = useState({})

    const {
        data: jobs,
        isLoading,
        isError,
        refetch,
    } = useGetJobsQuery(queryParams)

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

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <section className={styles.mainContainer}>
            <h2 className={styles.jobPageTitle}>FIND YOUR JOB</h2>
            <form onSubmit={handleSubmit} className={styles.formJob}>
                <Input
                    className={styles.formTitle}
                    label="Title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Full Stack Developer"
                />
                <Input
                    className={styles.formLocation}
                    label="Location"
                    value={formValues.location}
                    onChange={handleInputChange}
                    name="location"
                    placeholder="USA"
                />
                <div className={styles.salariesContainer}>
                    <Input
                        className={styles.formSalary}
                        label="Min Salary"
                        value={formValues.salaryMin}
                        onChange={handleInputChange}
                        name="salaryMin"
                        placeholder="50000"
                    />
                    <Input
                        className={styles.formSalary}
                        label="Max Salary"
                        value={formValues.salaryMax}
                        onChange={handleInputChange}
                        name="salaryMax"
                        placeholder="100000"
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
                <div className={styles.includeExternalContainer}>
                    <Checkbox
                        label="Include external jobs"
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
                <>
                    <TabbedJobList
                        internalJobs={internalJobs}
                        externalJobs={externalJobs}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                    <JobListSection
                        internalJobs={internalJobs}
                        externalJobs={externalJobs}
                    />
                </>
            )}
        </section>
    )
}

export { JobPage }
