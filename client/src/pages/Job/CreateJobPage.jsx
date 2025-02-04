import { useState } from 'react'

import styles from '@styles/pages/Job/CreateJobPage.module.scss'

import { useCreateJobMutation } from '@store/api/apiSlice/jobsSlice'
import { useGetSkillsQuery } from '@store/api/apiSlice/skillsSlice'
import { useNavigate } from 'react-router-dom'

import { Modal } from '@components/UI/Modal'

const CreateJobPage = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        title: '',
        location: '',
        salary: '',
        description: '',
        skills: [],
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }))
    }

    const {
        data: skills,
        isLoading: skillIsLoading,
        isError: skillIsError,
        refetch: refetchSkills,
    } = useGetSkillsQuery()

    const [
        createJob,
        {
            isSuccess: isCreated,
            isError: isErrorCreated,
            error,
            isLoading: isCreating,
        },
    ] = useCreateJobMutation()

    const handleSkillChange = (skilId) => {
        setFormValues((prevFormValues) => {
            return {
                ...prevFormValues,
                skills: prevFormValues.skills.includes(skilId)
                    ? prevFormValues.skills.filter((id) => id !== skilId)
                    : [...prevFormValues.skills, skilId],
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createJob(formValues)
    }

    return (
        <section className={styles.createJobSection}>
            {isCreating && (
                <Modal>
                    <h3 className={styles.createJobTitle}>Creating job...</h3>
                </Modal>
            )}
            {isCreated && (
                <Modal>
                    <div className={styles.createdJobContainer}>
                        <h3 className={styles.createJobTitle}>
                            JOB CREATED SUCCEFULLY
                        </h3>
                        <button
                            className={styles.homepageButton}
                            onClick={() => navigate('/')}
                        >
                            Back to Homepage
                        </button>
                    </div>
                </Modal>
            )}

            {isErrorCreated && (
                <Modal>
                    <div className={styles.errorCreateJobContainer}>
                        <h3 className={styles.errorTitle}>
                            Error creating job. Please try again later
                        </h3>
                        <button
                            className={styles.homepageButton}
                            onClick={() => navigate('/')}
                        >
                            Back to Homepage
                        </button>
                    </div>
                </Modal>
            )}

            <h2 className={styles.createJobTitle}>Create Job</h2>
            <form onSubmit={handleSubmit} className={styles.createJobForm}>
                <div className={styles.formContent}>
                    <div className={`${styles.formGroup} ${styles.formTitle}`}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`${styles.formGroup} ${styles.formLocation}`}
                    >
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formValues.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles.formGroup} ${styles.formSalary}`}>
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={formValues.salary}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`${styles.formGroup} ${styles.formDescription}`}
                    >
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <h3 className={styles.skillsTitle}>Skills</h3>
                    {skillIsLoading && (
                        <div className={styles.skillsLoading}>
                            Loading skills...
                        </div>
                    )}
                    {skillIsError && (
                        <div className={styles.skillsError}>
                            Error loading skills. Please try again
                            <button
                                type="button"
                                className={styles.skillsErrorButton}
                                onClick={refetchSkills}
                            >
                                Reload
                            </button>
                        </div>
                    )}
                    <div className={styles.skillsContainer}>
                        {!skillIsLoading &&
                            skills?.data.map((skill) => (
                                <div
                                    key={skill.id}
                                    className={styles.skillItem}
                                >
                                    <input
                                        type="checkbox"
                                        name="skills"
                                        value={skill.id}
                                        onChange={(e) =>
                                            handleSkillChange(skill.id)
                                        }
                                    />
                                    <label>{skill.name}</label>
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.createJobButton}>
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    )
}

export { CreateJobPage }
