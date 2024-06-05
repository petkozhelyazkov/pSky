import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import styles from './IataCodeTooltip.module.css';

export default function IataCodeTooltip({
    iataCode,
    label,
    pStyle
}) {
    const [airport, setAirport] = useState({});

    useEffect(() => {
        (async () => {
            let res = await fetch('/api/airports/autocomplete', {
                method: 'POST',
                'content-type': 'application/json',
                body: JSON.stringify(iataCode)
            }).then(x => x.json());

            setAirport(res[0]);
        })();
    }, [iataCode]);

    return (
        <Tooltip componentsProps={{
            tooltip: {
                sx: {
                    bgcolor: 'rgb(26, 39, 74)',
                    p: '10px'
                },
            },
        }} title={
            <div className={styles.tooltipWrapper}>
                <p className={styles.tooltipLabel}>{label}</p>
                <div className={styles.tooltipDescription}>
                    <span>{airport?.address}</span>
                    <br />
                    <span>{`${airport?.name}, (${airport?.iataCode})`}</span>
                </div>
            </div>} followCursor>
            <p style={pStyle} className={styles?.iataCode}>{airport?.iataCode}</p>
        </Tooltip>
    )
}