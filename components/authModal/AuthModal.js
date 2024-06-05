import styles from './AuthModal.module.css';
import { Modal } from '@mui/material';
import SignIn from './SignIn';
import { useContext } from 'react';
import { AuthModalContext } from '../../contexts/authModalState';

export default function AuthModal() {
    const handleClose = () => authModalReducer(false);
    const { authModal, authModalReducer } = useContext(AuthModalContext);

    return (
        <Modal
            open={authModal}
            onClose={handleClose}
        >
            <div className={styles.modalWrapper}>
                <SignIn />
            </div>
        </Modal>
    );
}