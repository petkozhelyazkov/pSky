import styles from './AuthModal.module.css';
import { Modal } from '@mui/material';
import SignIn from './Signin';
import { useContext } from 'react';
import { ModalContext } from '../../../context/modalState';

export default function AuthModal() {
    const handleClose = () => modalReducer(false);
    const { modal, modalReducer } = useContext(ModalContext);

    return (
        <Modal
            open={modal}
            onClose={handleClose}
        >
            <div className={styles.modalWrapper}>
                <SignIn />
            </div>
        </Modal>
    );
}