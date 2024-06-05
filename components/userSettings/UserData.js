import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import styles from './UserData.module.css';
import { Modal } from '@mui/material';

export default function UserData() {
    const { user } = useContext(UserContext);
    const { userData } = user;
    const [modal, setModal] = useState(false);

    function onOpenModal() {
        setModal(true);
    }

    function onCloseModal() {
        setModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <CustomModal modal={modal} onCloseModal={onCloseModal} userData={userData} />
            <h1>Данни за контакт</h1>
            <p>Няма да се налага да ги въвеждаш повторно при резервация.</p>
            <div className={styles.box}>
                <div className={styles.header}>
                    <p>Контакти</p>
                    <span onClick={onOpenModal}>Редактирай</span>
                </div>
                <div className={styles.content}>
                    <Label label='E-mail' data={userData.email} />
                    <Label label='Номер' data={userData.number} />
                </div>
            </div>
        </div>
    );
}

function CustomModal({
    modal,
    onCloseModal,
    userData
}) {
    const { userReducer } = useContext(UserContext);

    function onSubmit(e) {
        e.preventDefault();
        const newUserData = Object.fromEntries(new FormData(e.target));

        userReducer(newUserData, 'UPDATE_USERDATA');
        onCloseModal();
    }

    return (
        <Modal open={modal} onClose={onCloseModal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h3>Данни за контакт</h3>
                        <p>За да можем да се свържем с теб при нужда.</p>
                    </div>
                    <form onSubmit={onSubmit} method='post'>
                        <div className={styles.modalContent}>
                            <div className={styles.inputLabel}>
                                <label htmlFor="email">E-mail:</label>
                                <input type="text" id='email' name='email' defaultValue={userData.email} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="number">Телефон:</label>
                                <input type="text" id='number' name='number' defaultValue={userData.number} />
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={onCloseModal} className={styles.back}>Назад</button>
                            <button type='submit' className={styles.save}>Запази</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}

function Label({
    label,
    data
}) {
    return (
        <div className={styles.labelWrapper}>
            <div className={styles.label}>
                <p>{label}</p>
                <span>{data}</span>
            </div>
        </div>
    )
}