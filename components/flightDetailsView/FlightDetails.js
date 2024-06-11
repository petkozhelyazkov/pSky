import styles from './FlightDetails.module.css';
import moment from 'moment';
import 'moment/locale/bg';
import IataCodeTooltip from '../flight/IataCodeTooltip';
import Times from '../flight/Times';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';

export default function FlightDetails({
    segment,
    index,
    flightType,
    flightsCount
}) {
    const [modal, setModal] = useState(false);
    const [destinations, setDestinations] = useState({
        departure: '',
        arrival: ''
    })

    useEffect(() => {
        fetch('/api/airports/autocomplete', {
            method: 'POST',
            'content-type': 'application/json',
            body: JSON.stringify(segment.departure.iataCode)
        })
            .then(x => x.json())
            .then(x => {
                let a = x[0];

                setDestinations({
                    ...destinations, departure: `${a.address}, ${a.name}, (${a.iataCode})`
                })
            });

        fetch('/api/airports/autocomplete', {
            method: 'POST',
            'content-type': 'application/json',
            body: JSON.stringify(segment.arrival.iataCode)
        })
            .then(x => x.json())
            .then(x => {
                let a = x[0];

                setDestinations({
                    ...destinations, arrival: `${a.address}, ${a.name}, (${a.iataCode})`
                })
            });
    }, [modal])

    let carrierCode = segment.carrierCode;
    let departureIataCode = segment.departure.iataCode;
    let arrivalIataCode = segment.arrival.iataCode;
    let departureDate = segment.departure.at;
    let arrivalDate = segment.arrival.at;

    let departureMoment = moment(departureDate);
    let formatedDepartureDate = departureMoment.format('DD MMM. (dd)');

    let arrivalMoment = moment(arrivalDate);
    let formatedArrivalDate = arrivalMoment.format('DD MMM. (dd)');

    let durationMoment = moment.duration(segment.duration);
    let durationHours = durationMoment.hours();
    let durationMinutes = `${durationMoment.minutes()}мин.`;

    let formatedDuration = durationHours > 0 ? `${durationHours}ч. ${durationMinutes}` : durationMinutes;

    let departureTime = moment(segment.departure.at).format('HH:mm');
    let arrivalTime = moment(segment.arrival.at).format('HH:mm');

    function onDetails() {
        console.log(segment);
        setModal(true);
    }

    return (
        <div className={styles.detailsWrapper}>
            <Modal open={modal} onClose={() => { setModal(false) }}>
                <div className={styles.modalWrapper}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <h4 style={{ fontWeight: '700' }}>Детайли за полета</h4>
                        </div>
                        <div className={styles.detailsTime}>
                            <AccessTimeIcon />
                            <span>Време на пътуването: <span style={{ fontWeight: '600' }}>{formatedDuration}</span></span>
                        </div>
                        <div className={styles.detailsDetails}>
                            <span style={{ fontWeight: '600' }}>{departureTime}, {formatedDepartureDate}</span>
                            <span style={{ marginLeft: '40px' }}>{destinations.departure}</span>
                            <br />
                            <span style={{ fontWeight: '600' }}>{arrivalTime}, {formatedArrivalDate}</span>
                            <span style={{ marginLeft: '40px' }}>{destinations.arrival}</span>
                            <br />
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px' }}>
                                    Авиокомпания: <span style={{ fontWeight: '700' }}>{segment.carrierCode}</span> |
                                    Номер на полета: <span style={{ fontWeight: '700' }}>{segment.number}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
                <div className={styles.details}>
                    <div className={styles.border}>
                        <div className={styles.flightInfo}>
                            <p>{
                                flightType == 'oneway' && flightsCount < 2
                                    ? 'Отиване'
                                    : flightType == 'twoway' && flightsCount < 3
                                        ? index == 0
                                            ? 'Отиване'
                                            : 'Връщане'
                                        : `Полет ${index + 1}`
                            }
                            </p>
                            <span style={{ fontSize: '12.5px' }}>{formatedDepartureDate}</span>
                        </div>
                        <div className={styles.airports}>
                            <Image className={styles.carrierImg} src={`http://pics.avs.io/70/70/${carrierCode}.png`} alt='' />
                            <div className={styles.airportIataCodes}>
                                <IataCodeTooltip label='Излитане' pStyle={{ fontSize: '14px', fontWeight: '700' }} iataCode={departureIataCode} />
                                <div className={styles.line}></div>
                                <IataCodeTooltip label='Кацане' pStyle={{ fontSize: '14px', fontWeight: '700' }} iataCode={arrivalIataCode} />
                            </div>
                        </div>
                        <div className={styles.flightType}>
                            <span>директен</span>
                        </div>
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <div style={{ display: 'inline-block' }}>
                            <Times style={{ height: '5px' }} departureTime={segment.departure.at} arrivalTime={segment.arrival.at} duration={segment.duration} />
                        </div>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                            <button onClick={onDetails} className={styles.detailsButton}>детайли</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}