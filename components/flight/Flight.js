import styles from './Flight.module.css';
import Airports from './Airports';
import Times from './Times';
import FlightDetails from './FlightDetails';
import { useRouter } from 'next/router';

export default function Flight({
    flight,
    flightIndex
}) {
    const router = useRouter();

    let arr = [];
    flight.itineraries.forEach((x, i) => {
        let date = x.segments[0].arrival.at;;

        let departureTime = x.segments[0].departure.at;
        let arrivalTime = x.segments.at(-1).arrival.at;
        let duration = x.duration;

        let carrierCode = x.segments[0].carrierCode;
        let departureIataCode = x.segments[0].departure.iataCode;
        let arrivalIataCode = x.segments.at(-1).arrival.iataCode;

        let segments = x.segments;

        let flightType = '';

        if (flight.flightType == 'oneway') flightType = 'еднопосочен';
        if (flight.flightType == 'twoway') flightType = 'двупосочен';
        if (flight.flightType == 'multi') flightType = 'полет с много отсечки';

        let price = flight.price.total;
        let travelerCount = flight.travelerPricings.length;

        let seatsLeft = flight.numberOfBookableSeats;

        arr.push({ date, departureTime, arrivalTime, duration, carrierCode, departureIataCode, arrivalIataCode, segments, flightType, price, travelerCount, seatsLeft });
    });
    let flightsInfo = arr[0];

    function onFlightSelect() {
        router.push({
            pathname: '/flights',
            query: { flight: JSON.stringify(flight) }
        });
    }

    return (
        <div className={styles.flightWrapper}>
            <div style={{ display: 'flex' }}>
                <div>
                    {arr.map((x, i) => (
                        <div key={i}>
                            <div>
                                <div className={i == 0 ? styles.detailsWrapper : styles.multipleDetailsWrapper}>
                                    <div className={styles.flightInfo}>
                                        <Airports segments={x.segments} date={x.date} carrierCode={x.carrierCode} departureAirportIata={x.departureIataCode} arrivalAirportIata={x.arrivalIataCode} />
                                        <Times departureTime={x.departureTime} arrivalTime={x.arrivalTime} duration={x.duration} />
                                    </div>
                                    <FlightDetails flightsCount={x.segments.length} flightIndex={flightIndex} itinerarieIndex={i} flightClass={flight.flightClass} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.sectionWrapper}>
                    <span className={styles.price}>BGN {flightsInfo.price}</span>
                    <span className={styles.smallText}>Цена за {flightsInfo.travelerCount} {flightsInfo.travelerCount > 1 ? 'пътници' : 'пътник'},</span>
                    <span style={{ marginBottom: '35px' }} className={styles.smallText}>{flightsInfo.flightType}</span>

                    <button onClick={onFlightSelect} className={styles.chooseButton}>Избери</button>

                    {flightsInfo.seatsLeft < 7 &&
                        <span style={{ color: 'rgb(234,90,106)', fontWeight: '800' }} className={styles.smallText}>{flightsInfo.seatsLeft} свободни места</span>
                    }
                </div>
            </div>
        </div>
    )
}