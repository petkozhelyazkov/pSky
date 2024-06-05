import styles from './Reservations.module.css';
import { UserContext } from '../../contexts/userContext';
import { useContext, useEffect, useState } from 'react';

export default function Reservations() {
    const { user } = useContext(UserContext);
    const reservations = user.reservations;

    const [flights, setFlights] = useState([]);

    console.log(reservations)

    useEffect(() => {
        setFlights(reservations);
    }, [reservations])

    return (
        <div style={{ marginLeft: '15px' }}>
            <h1>Мойте резервации</h1>
            {

                flights?.map((x) => {
                    <Reservation key={x.id} reservation={x} />
                })
            }

        </div>
    );
}

function Reservation({
    key,
    reservation
}) {
    return (
        <div style={{ backgroundColor: 'red' }} key={key}>
            <p>asda</p>
        </div>
    )
}