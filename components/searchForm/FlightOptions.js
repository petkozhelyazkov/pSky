import styles from './FlightOptions.module.css';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { SearchFormContext } from '../../contexts/searchFormState';
import SearchAutocomplete from './SearchAutocomplete';
import FlightDatePicker from './FlightDatePicker';
import AddIcon from '@mui/icons-material/Add';
import { useLazyEffect } from '../../hooks';


export default function FightOptions() {
    const { flightCriteria, flightCriteriaReducer } = useContext(SearchFormContext);
    const [flights, setFlights] = useState(flightCriteria.flights);

    useLazyEffect(() => {
        setFlights(flightCriteria.flights);
    }, [flightCriteria])


    function onFlightAdded() {
        let newFlights = [...flights];
        newFlights.push({});
        flightCriteriaReducer(newFlights, 'FLIGHTS');
    }

    function onRemoveFlight(i) {
        return () => {
            let newFlights = [...flights];
            newFlights.splice(i, 1);
            flightCriteriaReducer(newFlights, 'FLIGHTS');
        }
    }

    return (
        <div>
            {flights.map((x, i) =>
                <div className={styles.flightOptions} key={i}>
                    <SearchAutocomplete index={i} type='originLocationCode' label='От:' />
                    {flightCriteria.type == 'twoway'
                        ?
                        <div className={styles.arrows}>
                            <ArrowForwardIcon className={styles.topArrow} />
                            <ArrowBackIcon className={styles.bottomArrow} />
                        </div>
                        :
                        <div className={styles.arrow}>
                            <ArrowForwardIcon className={styles.topArrow} />
                        </div>
                    }
                    <SearchAutocomplete index={i} type='destinationLocationCode' label='До:' />
                    <FlightDatePicker index={i} flightType='twoway' label='Отиване:' type='goingDate' />
                    <FlightDatePicker index={i} flightType={flightCriteria.type} label='Връщане:' type='comingDate' />
                    {i > 1 &&
                        <div className={styles.removeFlight}>
                            <Button onClick={onRemoveFlight(i)}>
                                <ClearIcon />
                            </Button>
                        </div>}
                </div>)
            }

            {flightCriteria.type == 'multi'
                && flights.length < 4
                &&
                <div>
                    <Button onClick={onFlightAdded}>
                        <AddIcon className={styles.addFlightButton} />
                    </Button>
                </div>
            }
        </div>
    )
}