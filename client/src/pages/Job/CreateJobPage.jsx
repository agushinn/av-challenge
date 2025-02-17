import { useState } from 'react'

import styles from '@styles/pages/Job/CreateJobPage.module.scss'

import { useCreateJobMutation } from '@store/api/apiSlice/jobsSlice'
import { useNavigate } from 'react-router-dom'

import { StatusModal } from '@pages/Job/components/JobModals'
import { JobForm } from '@pages/Job/components/JobForm'

const CreateJobPage = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        title: '',
        location: '',
        salary: '',
        description: '',
        skills: [],
    })

    const [
        createJob,
        {
            isSuccess: isCreated,
            isError: isErrorCreated,
            isLoading: isCreating,
        },
    ] = useCreateJobMutation()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }))
    }

    const handleSkillChange = (skillId) => {
        setFormValues((prevFormValues) => {
            return {
                ...prevFormValues,
                skills: prevFormValues.skills.includes(skillId)
                    ? prevFormValues.skills.filter((id) => id !== skillId)
                    : [...prevFormValues.skills, skillId],
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createJob(formValues)
    }

    return (
        <section className={styles.createJobSection}>
            <StatusModal
                isLoading={isCreating}
                isSuccess={isCreated}
                isError={isErrorCreated}
                successMessage="JOB CREATED SUCCESSFULLY"
                errorMessage="Error creating job. Please try again later"
                onNavigate={() => navigate('/')}
            />
            <h2 className={styles.createJobTitle}>Create Job</h2>
            <JobForm
                formValues={formValues}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleSkillChange={handleSkillChange}
                isEdit={false}
            />
        </section>
    )
}

export { CreateJobPage }
