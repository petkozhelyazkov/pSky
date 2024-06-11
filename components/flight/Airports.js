import styles from './Airports.module.css';
import moment from 'moment';
import IataCodeTooltip from './IataCodeTooltip';
import CircleIcon from '@mui/icons-material/Circle';

export default function Airports({
    carrierCode,
    departureAirportIata,
    arrivalAirportIata,
    date,
    segments
}) {
    let dateMoment = moment(date);
    let formatedDate = dateMoment.format('DD MMM. (dd)');

    let transfers = [];
    for (let i = 0; i < segments.length - 1; i++) {
        transfers.push({ iataCode: segments[i].arrival.iataCode });
    }

    return (
        <div className={styles.displayInfoWrapper}>
            <div className={styles.airlineImg}>
                <img src={`http://pics.avs.io/70/70/${carrierCode}.png`} alt='' />
            </div>
            <div className={styles.airports}>
                <IataCodeTooltip label='Излитане' iataCode={departureAirportIata} />
                <Line transfers={transfers} departureAirportIata={departureAirportIata} />
                <IataCodeTooltip label='Кацане' iataCode={arrivalAirportIata} />
            </div>
            <div className={styles.date}>
                <span>{formatedDate}</span>
            </div>
        </div>
    )
}

function Line({
    transfers
}) {

    return (
        <div style={{ display: 'flex', gap: `${transfers.length > 0 ? '2px' : ''}` }}>
            <div style={{ width: `${50 / transfers.length}px` }} className={styles.line}></div>
            {transfers.map(x => (
                <div style={{ display: 'flex', gap: '2px' }} key={Math.random()}>
                    <div style={{ color: 'rgb(17, 204, 204)', fontSize: '8px', paddingTop: '11px' }}>
                        <CircleIcon fontSize='8px' />
                        <IataCodeTooltip pStyle={{ fontSize: '10px', color: 'rgb(26, 39, 74)', marginLeft: '-6.5px', width: '3px' }} label={'Прекачване'} iataCode={x.iataCode} />
                    </div>
                    <div style={{ width: `${50 / transfers.length}px` }} className={styles.line}></div>
                </div>
            ))}
            {transfers.length == 0
                && <div style={{ width: `${50 / transfers.length}px` }} className={styles.line}></div>
            }
        </div>
    )
}
