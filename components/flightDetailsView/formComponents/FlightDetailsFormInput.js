import styles from './FlightDetailsFormInput.module.css';

export default function FlightDetailsFormInput({
    label,
    placeholder,
    required,
    defaultValue,
    small,
    onBlur,
    error,
}) {
    return (
        <div className={styles.formInput}>
            {label &&
                <label htmlFor="name">{label}
                    {required
                        &&
                        <span style={{ color: 'red' }}>*</span>
                    }
                </label>
            }
            <div className={`${small ? styles.smallInput : styles.input} ${error?.isFalse && styles.error}`}>
                <input
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    type="text"
                    id='name'
                    placeholder={placeholder}
                />
                <p className={styles.errorMsg}>{error?.isFalse ? error.msg : ''}</p>
            </div>
        </div>
    )
}