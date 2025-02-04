import { useState } from 'react'

import styles from '@styles/pages/User/CreateUserPage.module.scss'

import { useCreateUserMutation } from '@store/api/apiSlice/usersSlice'
import { useNavigate } from 'react-router-dom'

import { Modal } from '@components/UI/Modal'

const CreateUserPage = () => {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        newsletter_suscribed: false,
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const [
        createUser,
        {
            isSuccess: isCreated,
            isError: isErrorCreated,
            error,
            isLoading: isCreating,
        },
    ] = useCreateUserMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser({
            ...formValues,
            newsletter_suscribed: formValues.newsletter_suscribed ? 1 : 0,
        })
    }

    return (
        <section className={styles.createUserSection}>
            {isCreating && (
                <Modal>
                    <h3 className={styles.createUserTitle}>Creating user...</h3>
                </Modal>
            )}
            {isCreated && (
                <Modal>
                    <div className={styles.createdUserContainer}>
                        <h3 className={styles.createUserTitle}>
                            USER CREATED SUCCEFULLY
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
                    <div className={styles.errorCreateUserContainer}>
                        <h3 className={styles.errorTitle}>
                            Error creating user. Please try again later
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

            <h2 className={styles.createUserTitle}>Create User</h2>
            <form onSubmit={handleSubmit} className={styles.createUserForm}>
                <div className={styles.formContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={
                            styles.formGroup + ' ' + styles.formGroupCheckbox
                        }
                    >
                        <label htmlFor="newsletter_suscribed">
                            Suscribe to newslleter
                        </label>
                        <input
                            type="checkbox"
                            name="newsletter_suscribed"
                            value={formValues.newsletter_suscribed}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.createUserButton}>
                    <button type="submit">Create</button>
                </div>
            </form>
        </section>
    )
}

export { CreateUserPage }
