import styles from '@styles/pages/Job/components/SkillsList.module.scss'

export const SkillsList = ({ skills, formSkills = [], handleSkillChange }) => {
    return (
        <div className={styles.skillsContainer}>
            {skills.map((skill) => (
                <div key={skill.id} className={styles.skillItem}>
                    <input
                        type="checkbox"
                        name="skills"
                        value={skill.id}
                        checked={formSkills.includes(skill.id)}
                        onChange={() => handleSkillChange(skill.id)}
                    />
                    <label>{skill.name}</label>
                </div>
            ))}
        </div>
    )
}
