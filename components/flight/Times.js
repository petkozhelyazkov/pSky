import styles from './Times.module.css';
import moment from 'moment';
import 'moment/locale/bg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Times({
    departureTime,
    arrivalTime,
    duration,
    style
}) {
    let departureTimeMoment = moment(departureTime);
    departureTimeMoment.locale('bg');
    let formatedDepartureTime = departureTimeMoment.format('HH:mm');

    let arrivalTimeMoment = moment(arrivalTime);
    arrivalTimeMoment.locale('bg');
    let formatedArrivalTime = arrivalTimeMoment.format('HH:mm');

    let dayDifference = arrivalTimeMoment.dayOfYear() - departureTimeMoment.dayOfYear();

    let durationMoment = moment.duration(duration);
    let durationHours = durationMoment.hours();
    let durationMinutes = `${durationMoment.minutes()}мин.`;

    let formatedDuration = durationHours > 0 ? `${durationHours}ч. ${durationMinutes}` : durationMinutes;

    return (
        <div style={style} className={styles.wrapper}>
            <div className={styles.timeWrapper}>
                <p className={styles.time}>{formatedDepartureTime}</p>
                <div className={styles.timeArrow}><ArrowRightAltIcon /></div>
                <p className={styles.time}>{formatedArrivalTime}</p>
                {dayDifference > 0 &&
                    <p className={styles.dayDifference}>+{dayDifference}d</p>
                }
            </div>
            <div className={styles.timeAttributes}>
                <AccessTimeIcon />
                <p>{formatedDuration}</p>
            </div>
        </div>
    )
}