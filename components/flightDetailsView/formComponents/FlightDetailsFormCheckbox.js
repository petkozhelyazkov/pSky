import styles from './FlightDetailsFormCheckbox.module.css';

export default function FlightDetailsFormCheckbox({
    label,
    required,
    error,
    onSelect
}) {
    return (
        <div className={`${styles.checkboxWrapper}`}>
            <input onChange={onSelect} type="checkbox" name="checkbox" id="checkbox" />
            <label className={`${error ? styles.error : ''}`} htmlFor='checkbox'>{required && <span style={{ color: 'red' }}>*</span>}{label}</label>
        </div>
    );
}