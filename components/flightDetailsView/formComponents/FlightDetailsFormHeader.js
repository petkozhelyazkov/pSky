import styles from './FlightDetailsFormHeader.module.css';

export default function FlightDetailsFormHeader({
    label,
    subLabel,
    passengersSelect,
    setPassengersSelect
}) {
    function onSelect(e) {
        setPassengersSelect(e.target.value);
    }

    return (
        <div>
            <div style={{ display: 'inline-block', width: '100%' }}>
                <div style={{ display: 'flex', float: 'left' }}>
                    <span className={styles.label}>{label}</span>
                    {subLabel &&
                        <span className={styles.subLabel}>{subLabel}</span>
                    }
                </div>
                <div style={{ float: 'right' }}>
                    {passengersSelect?.length > 0 &&
                        <select onChange={onSelect} className={styles.passengerSelect} defaultValue='choose' >
                            <option value='choose' style={{ display: 'none' }}>Избери от списъка</option>
                            {
                                passengersSelect?.map((x, i) =>
                                    <option key={i} className={styles.option} value={x.id}>{x.firstName} {x.lastName}</option>)
                            }
                        </select>
                    }
                </div>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}