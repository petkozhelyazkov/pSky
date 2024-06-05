import styles from './FlightDetails.module.css';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';

export default function FlightDetails({
    flightsCount,
    flightClass,
    flightIndex,
    itinerarieIndex
}) {
    let formattedFlightsCount = flightsCount == 1 ? 'директен' : flightsCount == 2 ? `${flightsCount - 1} прекачване` : `${flightsCount - 1} прекачвания`;
    let formatedFlightClass = '';

    if (flightClass == 'economy') formatedFlightClass = 'икономична';
    if (flightClass == 'premium_Economy') formatedFlightClass = 'премиум економи';
    if (flightClass == 'business') formatedFlightClass = 'бизнес';
    if (flightClass == 'first') formatedFlightClass = 'първа';

    return (
        <div className={styles.flightDetailsWrapper}>
            <div className={styles.flightDetails}>
                <div className={styles.labels}>
                    <h6>{formattedFlightsCount}</h6>
                    <p style={{ fontSize: '12px' }}>класа: {formatedFlightClass}</p>
                </div>
                <div className={styles.detailsIconsWrapper}>
                    <div className={styles.detailsIcons}>
                        <FreeBreakfastOutlinedIcon />
                        <LuggageOutlinedIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}