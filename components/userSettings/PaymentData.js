import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import styles from './PaymentData.module.css';
import { Modal } from '@mui/material';
import CountryOptions from '../flightDetailsView/formComponents/CountryOptions';

export default function PaymentData() {
    const { user } = useContext(UserContext);
    const { paymentData } = user;
    const [modal, setModal] = useState(false);


    function onOpenModal() {
        setModal(true);
    }

    function onCloseModal() {
        setModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <CustomModal modal={modal} onCloseModal={onCloseModal} paymentData={paymentData} />
            <h1>Данни на платеца</h1>
            <p>Няма да се налага да ги въвеждаш повторно при резервацията.</p>
            <div className={styles.box}>
                <div className={styles.header}>
                    <p>Платец</p>
                    <span onClick={onOpenModal}>Редактирай</span>
                </div>
                <div className={styles.content}>
                    <Label label='Име и фамилия' data={`${paymentData.firstName} ${paymentData.lastName}`} />
                    <Label label='Държава' data={paymentData.country} />
                    <Label label='Пощенски код' data={paymentData.postCode} />
                    <Label label='Град' data={paymentData.city} />
                    <Label label='Улица' data={paymentData.street} />
                    <Label label='Номер' data={paymentData.number} />
                </div>
            </div>
        </div>
    );
}

function CustomModal({
    modal,
    onCloseModal,
    paymentData
}) {
    const { userReducer } = useContext(UserContext);

    function onSubmit(e) {
        e.preventDefault();
        const newPaymentData = Object.fromEntries(new FormData(e.target));

        userReducer(newPaymentData, 'UPDATE_PAYMENTDATA');
        onCloseModal();
    }

    return (
        <Modal open={modal} onClose={onCloseModal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h3>Данни на платеца</h3>
                        <p>Попълни данните на платеца сега, за да не се налага да ги въвеждаш повторно при резервацията.</p>
                    </div>
                    <form onSubmit={onSubmit} method='post'>
                        <div className={styles.modalContent}>
                            <div className={styles.inputLabel}>
                                <label htmlFor="name">Име:</label>
                                <input type="text" id='name' name='firstName' defaultValue={paymentData.firstName} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="lastName">Фамилия:</label>
                                <input type="text" id='lastName' name='lastName' defaultValue={paymentData.lastName} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="country">Държава:</label>
                                <select name="country" defaultValue={paymentData.country} id="country">
                                    <CountryOptions />
                                </select>
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="postCode">Пощенски&nbsp;код:</label>
                                <input type="text" id='postCode' name='postCode' defaultValue={paymentData.postCode} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="city">Град:</label>
                                <input type="text" id='city' name='city' defaultValue={paymentData.city} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="street">Улица:</label>
                                <input type="text" id='street' name='street' defaultValue={paymentData.street} />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="number">Номер:</label>
                                <input type="text" id='number' name='number' defaultValue={paymentData.number} />
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