import { useState } from 'react'

import styles from '@styles/pages/Job/JobPage.module.scss'

import { useGetJobsQuery } from '@store/api/apiSlice/jobsSlice'

import { ErrorBox } from '@pages/Job/components/ErrorBox'
import { JobSkelleton } from '@pages/Job/components/JobSkelleton'
import { JobList } from '@pages/Job/components/JobList'
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
                    <div className={styles.tabsSection}>
                        <div className={styles.tabsContainer}>
                            <button
                                className={
                                    activeTab === 'grabShobel'
                                        ? styles.activeTab
                                        : styles.tab
                                }
                                onClick={() => handleTabClick('grabShobel')}
                            >
                                GrabShobel Jobs ({internalJobs.length})
                            </button>
                            <button
                                className={
                                    activeTab === 'external'
                                        ? styles.activeTab
                                        : styles.tab
                                }
                                onClick={() => handleTabClick('external')}
                            >
                                External Jobs ({externalJobs.length})
                            </button>
                        </div>
                        <div className={styles.jobsContainerTabs}>
                            <JobList
                                className={`${styles.internalJobsTab} ${
                                    activeTab === 'grabShobel'
                                        ? styles.active
                                        : ''
                                }`}
                                jobs={internalJobs}
                                canEdit
                            />
                            <JobList
                                className={`${styles.externalJobTab} ${
                                    activeTab === 'external'
                                        ? styles.active
                                        : ''
                                }`}
                                jobs={externalJobs}
                            />
                        </div>
                    </div>
                    <div className={styles.jobsContainer}>
                        <JobList
                            className={styles.internalJobs}
                            jobs={internalJobs}
                            canEdit
                        />
                        <JobList
                            className={styles.externalJob}
                            jobs={externalJobs}
                        />
                    </div>
                </>
            )}
        </section>
    )
}

export { JobPage }
