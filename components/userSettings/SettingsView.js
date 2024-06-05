import styles from './SettingsView.module.css';
import { Modal } from '@mui/material';
import { useState, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../contexts/authState';
import { useRouter } from 'next/router';

export default function SettingsView() {
    const [modal, setModal] = useState(false);
    const { userAuthReducer } = useContext(AuthContext);
    const router = useRouter();

    function onModalOpen(e) {
        e.preventDefault();

        setModal(true);
    }

    function onModalClose() {
        setModal(false);
    }

    function onDelete() {
        userAuthReducer({}, 'DELETE');
        onModalClose();

        router.push('/');
    }

    return (
        <div className={styles.wrapper}>
            <Modal open={modal} onClose={onModalClose}>
                <div className={styles.modalWrapper}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <h5>Изтриване на профил</h5>
                            <CloseIcon className={styles.icon} onClick={onModalClose} />
                        </div>
                        <div className={styles.content}>
                            <p>Изтриването на профила е необратимо!</p>
                            <div className={styles.desciption}>
                                <p>С изтриването на профила ще изгубиш достъп до всички минали резервации и отстъпки за регистрирани потребители!</p>
                            </div>
                            <div className={styles.deleteButtonWrapper}>
                                <button onClick={onDelete} className={styles.deleteButton}>Изтриване на профил</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <h1>Насторйки на профила</h1>
            <div className={styles.box}>
                <div>
                    <h4>Изтриване на профил</h4>
                    <p>Кликни, ако искаш да премахнеш профила си <span style={{ fontWeight: '700' }}>завинаги</span></p>
                </div>
                <div>
                    <a href='#' onClick={onModalOpen} className={styles.delete}>Изтриване</a>
                </div>
            </div>
        </div>
    );
}