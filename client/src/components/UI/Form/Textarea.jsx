import styles from '@styles/components/UI/Form/Textarea.module.scss'

export const Textarea = ({ className, label, name, value, onChange }) => {
    return (
        <div className={`${styles.formGroup} ${className}`}>
            <label htmlFor={name}>{label}</label>
            <textarea
                className={styles.textareaComponent}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
