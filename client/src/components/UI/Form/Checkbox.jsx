import styles from '@styles/components/UI/Form/Checkbox.module.scss'

const Checkbox = ({ label, name, onChange, checked }) => {
    return (
        <div className={styles.checkboxContainer}>
            <label htmlFor={name}>{label}</label>
            <input
                checked={checked}
                type="checkbox"
                onChange={onChange}
                name={name}
            />
        </div>
    )
}

export { Checkbox }
