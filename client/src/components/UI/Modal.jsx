import ReactDOM from 'react-dom'

import styles from '@styles/components/UI/Modal.module.scss'

const Backdrop = () => {
    return <div className={styles.backdrop}></div>
}

const ModalOverlay = ({ children }) => {
    return (
        <div className={`${styles.modalOverlay} `}>
            <main>{children}</main>
        </div>
    )
}

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay className={`${props.className}`}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById('overlay-root')
            )}
        </>
    )
}

export { Modal }
