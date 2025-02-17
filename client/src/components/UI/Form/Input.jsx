import styles from '@styles/components/UI/Form/Input.module.scss'

const Input = ({
    className,
    type = 'text',
    placeholder,
    label,
    name,
    value,
    onChange,
}) => {
    return (
        <div className={`${styles.formGroup} ${className}`}>
            <label htmlFor={name}>{label}</label>
            <input
                className={styles.inputComponent}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder ? placeholder : label}
            />
        </div>
    )
}
export { Input }
