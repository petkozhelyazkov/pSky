import styles from '../styles/flights.module.css';
import FlightDetails from '../components/flightDetailsView/FlightDetails';
import PaymentInfo from '../components/flightDetailsView/PaymentInfo';
import TravelersInfo from '../components/flightDetailsView/TravelersInfo';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authState';
import LoginSuggest from '../components/flightDetailsView/LoginSuggest';
import PaymentMethod from '../components/flightDetailsView/PaymentMethod';
import PayerInfo from '../components/flightDetailsView/PayerInfo';
import ContactInfo from '../components/flightDetailsView/ContactInfo';
import Reserve from '../components/flightDetailsView/Reserve';
import { UserContext } from '../contexts/userContext';
import { SearchFormContext } from '../contexts/searchFormState';
import Footer from '../components/footer/Footer';


export function getServerSideProps({ query }) {
    let flight = JSON.parse(query.flight);

    return {
        props: { flight }
    }
}

export default function Flights({ flight }) {
    const { userAuth } = useContext(AuthContext);
    const { flightCriteria } = useContext(SearchFormContext);
    const { user } = useContext(UserContext);

    let passengers = flightCriteria.passengers

    let travelers = flight.travelerPricings;
    let price = flight.price.total;


    let allSegements = [];
    let flightCount = 0;

    flight.itineraries.forEach(x => {
        x.segments.forEach(x => {
            allSegements.push(x);
            flightCount += 1;
        });
    });

    return (
        <div>
            <div style={{ height: '100vh', backgroundColor: 'rgb(234, 235, 238)' }}>
                <div className={styles.header}>
                    <p>Провери детайлите за полета и продължи напред</p>
                </div>
                <div className={styles.pageWrapper}>
                    <div>
                        <h4>Детайли за полета</h4>
                        {allSegements.map((x, i) =>
                            <FlightDetails segment={x} key={i} index={i} flightType={flight.flightType} flightsCount={flightCount} />
                        )}

                        <LoginSuggest user={userAuth} />

                        <TravelersInfo travelers={travelers} userPassengers={user.passengers} passengers={passengers} user={user} />
                        <PaymentMethod />
                        <PayerInfo user={user} />
                        <ContactInfo user={user} />
                    </div>
                    <PaymentInfo travelers={travelers} passengers={passengers} totalPrice={price} />
                </div>
                <Reserve flight={flight} />
                <div>⁮⁮</div>
                <div>⁮⁮</div>
                <Footer />
            </div>
        </div>
    )
}