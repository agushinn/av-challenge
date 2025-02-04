import React from 'react'

import styles from '@styles/pages/Job/components/ErrorBox.module.scss'

const ErrorBox = ({ refetch }) => {
    return (
        <div className={styles.errorBoxContainer}>
            <p>Something went wrong </p>
            <button onClick={refetch}>Try Again</button>
        </div>
    )
}

export { ErrorBox }
