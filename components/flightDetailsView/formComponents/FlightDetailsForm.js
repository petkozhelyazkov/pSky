import styles from './FlightDetailsForm.module.css';

export default function FlightDetailsForm({
    children,
    label
}) {
    return (
        <div>
            <h4>{label}</h4>
            <div className={styles.formWrapper}>
                <div className={styles.inputsWrapper}>
                    {children}
                </div>
            </div>
        </div >
    )
}

