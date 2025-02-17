import { useEffect, useState } from 'react'

import styles from '@styles/pages/Job/EditJobPage.module.scss'

import {
    useGetJobQuery,
    useUpdateJobMutation,
    useDeleteJobMutation,
} from '@store/api/apiSlice/jobsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { DeleteJobModal, StatusModal } from '@pages/Job/components/JobModals'
import { JobForm } from '@pages/Job/components/JobForm'

export const EditJobPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [displayModalDelete, setDisplayModalDelete] = useState(false)

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
                <DeleteJobModal
                    id={id}
                    onCancel={() => setDisplayModalDelete(false)}
                    onDelete={() => deleteJob({ id })}
                />
            )}
            <StatusModal
                isLoading={isDeleting || isUpdating}
                isSuccess={isDeleted || isUpdated}
                isError={isErrorDelete || isErrorUpdate}
                successMessage={
                    isDeleted
                        ? 'JOB DELETED SUCCESSFULLY'
                        : 'JOB UPDATED SUCCESSFULLY'
                }
                errorMessage={
                    isErrorDelete
                        ? 'Error deleting job. Please try again later'
                        : 'Error updating job. Please try again later'
                }
                onNavigate={() => navigate('/')}
            />
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
                <JobForm
                    formValues={formValues}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    handleSkillChange={handleSkillChange}
                    isEdit={true}
                />
            )}
        </section>
    )
}
