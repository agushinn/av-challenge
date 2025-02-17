import { Modal } from '@components/UI/Modal'
import styles from '@styles/pages/Job/components/JobModals.module.scss'

export const DeleteJobModal = ({ id, onCancel, onDelete }) => (
    <Modal>
        <div className={styles.deleteJobContainer}>
            <h3 className={styles.deleteJobTitle}>
                Are you sure you want to delete this job #{id}?
            </h3>
            <div className={styles.deleteJobButtons}>
                <button
                    className={styles.cancelDeleteButton}
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className={styles.confirmDeleteButton}
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </Modal>
)

export const StatusModal = ({
    isLoading,
    isSuccess,
    isError,
    successMessage,
    errorMessage,
    onNavigate,
}) => (
    <>
        {isLoading && (
            <Modal>
                <h3 className={styles.loadingTitle}>Processing...</h3>
            </Modal>
        )}
        {isSuccess && (
            <Modal>
                <div className={styles.successContainer}>
                    <h3 className={styles.successTitle}>{successMessage}</h3>
                    <button
                        className={styles.homepageButton}
                        onClick={onNavigate}
                    >
                        Back to Homepage
                    </button>
                </div>
            </Modal>
        )}
        {isError && (
            <Modal>
                <div className={styles.errorContainer}>
                    <h3 className={styles.errorTitle}>{errorMessage}</h3>
                    <button
                        className={styles.homepageButton}
                        onClick={onNavigate}
                    >
                        Back to Homepage
                    </button>
                </div>
            </Modal>
        )}
    </>
)
