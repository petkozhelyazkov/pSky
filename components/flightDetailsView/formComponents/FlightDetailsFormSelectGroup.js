import { cloneElement } from 'react';
import styles from './FlightDetailsFormSelectGroup.module.css';

export default function FlightDetailsFormSelectGroup({
    label,
    children,
    required,
    error
}) {
    return (
        <div className={styles.formInput}>
            <div style={{ float: 'left', marginTop: '5px' }}>
                {label &&
                    <label htmlFor="name">{label}
                        {required
                            && <span style={{ color: 'red' }}>*</span>
                        }

                    </label>
                }
            </div>
            <div style={{ display: 'inline-block', float: 'right', width: '65%' }}>
                <div style={{ float: 'left' }}>
                    {children.map((x, i) => cloneElement(x, { key: i, error: { isFalse: error?.isFalse } }))}
                </div>
            </div>
            <p className={styles.errorMsg}>{error?.isFalse ? error.msg : ''}</p>
        </div>
    )
}