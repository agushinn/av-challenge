import styles from '@styles/pages/Job/components/JobForm.module.scss'

import { Input } from '@components/UI/Form/Input'
import { Textarea } from '@components/UI/Form/Textarea'
import { useGetSkillsQuery } from '@store/api/apiSlice/skillsSlice'
import { SkillsList } from '@pages/Job/components/SkillsList'

export const JobForm = ({
    formValues,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleSkillChange,
    isEdit,
}) => {
    const {
        data: skills,
        isLoading: skillIsLoading,
        isError: skillIsError,
        refetch: refetchSkills,
    } = useGetSkillsQuery()

    return (
        <form onSubmit={handleSubmit} className={styles.jobForm}>
            <div className={styles.formContent}>
                <Input
                    className={styles.formTitle}
                    label="Title"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    placeholder="Full Stack Developer"
                />
                <Input
                    className={styles.formLocation}
                    label="Location"
                    name="location"
                    value={formValues.location}
                    onChange={handleInputChange}
                    placeholder="USA"
                />
                <Input
                    className={styles.formSalary}
                    label="Salary"
                    name="salary"
                    value={formValues.salary}
                    onChange={handleInputChange}
                    placeholder="50000"
                />
                <Textarea
                    className={styles.formDescription}
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.skillsSection}>
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
                {!skillIsLoading && skills?.data && (
                    <SkillsList
                        skills={skills.data}
                        formSkills={formValues.skills}
                        handleSkillChange={handleSkillChange}
                    />
                )}
            </div>
            <div className={styles.jobFormButtons}>
                {isEdit && (
                    <button
                        className={styles.deleteButton}
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
                <button className={styles.submitButton} type="submit">
                    {isEdit ? 'Edit' : 'Create'}
                </button>
            </div>
        </form>
    )
}
