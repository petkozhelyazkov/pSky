import styles from '../styles/search.module.css';
import { useContext, useState } from "react";
import { SearchFormContext } from "../contexts/searchFormState";
import SearchForm from '../components/searchForm/SearchForm';
import Flight from '../components/flight/Flight';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Footer from '../components/footer/Footer';

export async function getServerSideProps({ query }) {
    const res = await fetch(`${process.env.BASE_URL}/api/search`, {
        method: 'POST',
        'content-type': 'application/json',
        body: query ? query?.flightCriteria : null
    })
        .then(x => { x.json(); console.log(x.json) })
        .catch(err => console.log(err))



    return (
        { props: { flights: res || { type: 'offers' } } }
    )
}

export default function Search({ flights }) {
    const { flightCriteria } = useContext(SearchFormContext);
    const [flightType, setFlightType] = useState(flightCriteria.type);
    const [flightClass, setFlightClass] = useState(flightCriteria.class);

    return (
        <>
            <div className={styles.searchPageWrapper}>
                <div className={styles.flightSearch}>
                    <SearchForm />
                </div>
                <div className={styles.flightOffers}>
                    <div>
                        {
                            !flights || flights.length > 0
                                ? flights.map((x, i) => <Flight flightIndex={i} flight={{ ...x, flightType: flightType, flightClass: flightClass }} key={i} />)
                                : <div style={{ marginBottom: '300px', display: 'flex', gap: '5px' }}>
                                    {flights.type != 'offers'
                                        ? <>
                                            <ErrorOutlineIcon />
                                            <p>
                                                За съжаление не открихме такъв полет!
                                                Опитай да смениш датата на излитане или летището, за да потърсим алтернативен полет.
                                            </p>
                                        </>
                                        : <p>Въведете критерии, по които да намерим полет за вас!</p>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}