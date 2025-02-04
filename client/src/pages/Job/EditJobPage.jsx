import { useEffect, useState } from 'react'

import styles from '@styles/pages/Job/EditJobPage.module.scss'

import {
    useGetJobQuery,
    useUpdateJobMutation,
    useDeleteJobMutation,
} from '@store/api/apiSlice/jobsSlice'
import { useGetSkillsQuery } from '@store/api/apiSlice/skillsSlice'

import { useParams, useNavigate } from 'react-router-dom'

import { Modal } from '@components/UI/Modal'

export const EditJobPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [displayModalDelete, setDisplayModalDelete] = useState(false)

    const {
        data: skills,
        isLoading: skillIsLoading,
        isError: skillIsError,
        refetch: refetchSkills,
    } = useGetSkillsQuery()

    const {
        data: job,
        isLoading: jobIsLoading,
        isError: jobIsError,
        refetch: refetchJob,
    } = useGetJobQuery(id)

    const [
        deleteJob,
        { isSuccess: isDeleted, isError: isErrorDelete, isLoading: isDeleting },
    ] = useDeleteJobMutation()

    const [
        updateJob,
        { isSuccess: isUpdated, isError: isErrorUpdate, isLoading: isUpdating },
    ] = useUpdateJobMutation()

    const [formValues, setFormValues] = useState({
        title: '',
        location: '',
        salary: '',
        description: '',
        skills: [],
    })

    useEffect(() => {
        if (job?.data?.length > 0) {
            const jobData = job.data[0]
            setFormValues({
                title: jobData.title || '',
                location: jobData.location || '',
                salary: jobData.salary || '',
                description: jobData.description || '',
                skills: jobData.skills?.map((skill) => skill.id) || [],
            })
        }
    }, [job])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }))
    }

    const handleSkillChange = (skillCod) => {
        setFormValues((prevFormValues) => {
            const skillsArray = prevFormValues.skills.includes(skillCod)
                ? prevFormValues.skills.filter((cod) => cod !== skillCod)
                : [...prevFormValues.skills, skillCod]
            return { ...prevFormValues, skills: skillsArray }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedJobData = {
            id: Number(id),
            title: formValues.title,
            description: formValues.description,
            location: formValues.location,
            salary: Number(formValues.salary),
            skills: formValues.skills.map((skill) => Number(skill)),
        }

        updateJob(updatedJobData)
    }

    const handleDelete = () => {
        setDisplayModalDelete(true)
    }

    return (
        <section className={styles.editJobSection}>
            {displayModalDelete && (
                <Modal>
                    <div className={styles.deleteJobContainer}>
                        <h3 className={styles.deleteJobTitle}>
                            Are you sure you want to delete this job #{id}?
                        </h3>
                        <div className={styles.deleteJobButtons}>
                            <button
                                className={styles.cancelDeleteButton}
                                onClick={() => {
                                    setDisplayModalDelete(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.confirmDeleteButton}
                                onClick={() => {
                                    deleteJob({ id })
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {isErrorDelete && (
                <Modal>
                    <div className={styles.errorDeleteJobContainer}>
                        <h3 className={styles.errorTitle}>
                            Error deleting job. Please try again later
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
            {isDeleting && (
                <Modal>
                    <h3 className={styles.deletingTitle}>Deleting job...</h3>
                </Modal>
            )}
            {isDeleted && (
                <Modal>
                    <div className={styles.deletedJobContainer}>
                        <h3 className={styles.deletedTitle}>
                            JOB DELETED SUCCEFULLY
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
            {isUpdating && (
                <Modal>
                    <h3 className={styles.updatingTitle}>Updating job...</h3>
                </Modal>
            )}
            {isUpdated && (
                <Modal>
                    <div className={styles.updatedJobContainer}>
                        <h3 className={styles.updatetitle}>
                            JOB UPDATED SUCCEFULLY
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
            {isErrorUpdate && (
                <Modal>
                    <div className={styles.errorUpdateJobContainer}>
                        <h3 className={styles.errorTitle}>
                            Error updating job. Please try again later
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

            <h2 className={styles.editJobTitle}>Edit Job</h2>
            {jobIsLoading && (
                <div className={styles.loadingJobContainer}>
                    Loading Job data... Please wait :)
                </div>
            )}
            {jobIsError && (
                <div className={styles.errorJobContainer}>
                    Error loading job data. Please try again
                    <button
                        type="button"
                        className={styles.errorJobButton}
                        onClick={refetchJob}
                    >
                        Reload
                    </button>
                </div>
            )}
            {!jobIsLoading && job && (
                <form onSubmit={handleSubmit} className={styles.editJobForm}>
                    <div className={styles.formContent}>
                        <div
                            className={`${styles.formGroup} ${styles.formTitle}`}
                        >
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
                        <div
                            className={`${styles.formGroup} ${styles.formSalary}`}
                        >
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
                                            checked={formValues.skills.includes(
                                                skill.id
                                            )}
                                            onChange={() =>
                                                handleSkillChange(skill.id)
                                            }
                                        />
                                        <label>{skill.name}</label>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={styles.editJobButtons}>
                        <button
                            className={styles.deleteButton}
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button className={styles.editButton} type="submit">
                            Edit
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}
