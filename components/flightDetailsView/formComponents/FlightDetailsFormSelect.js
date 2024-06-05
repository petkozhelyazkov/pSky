import styles from './FlightDetailsFormSelect.module.css';

export default function FlightDetailsFormSelect({
    label,
    placeholder,
    children,
    required,
    defaultValue,
    big,
    onSelect,
    error
}) {
    return (
        <div className={styles.formInput}>
            {label &&
                <label htmlFor="name">{label}
                    {required
                        && <span style={{ color: 'red' }}>*</span>
                    }

                </label>
            }

            <div className={`${styles.input} ${error?.isFalse && styles.error}`}>
                <div className={styles.dateInput}>
                    <select onChange={onSelect} className={big ? styles.bigSelect : styles.select} type="text" defaultValue={defaultValue ? defaultValue : 'value'} value={defaultValue} id='name'>
                        <option style={{ display: 'none' }} value="value">{placeholder}</option>
                        {children}
                    </select>
                    <p className={styles.errorMsg}>{error?.isFalse ? error.msg : ''}</p>
                </div>
            </div>
        </div>
    )
}