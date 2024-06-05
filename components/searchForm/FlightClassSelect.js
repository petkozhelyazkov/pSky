import styles from './FlightClassSelect.module.css';
import { useState, useContext, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function FlightClassSelect() {
    const { flightCriteria, flightCriteriaReducer } = useContext(SearchFormContext);
    const [defaultFlightClass, setDefaultFlightClass] = useState('');

    useEffect(() => {
        setDefaultFlightClass(flightCriteria.class);
    }, [flightCriteria]);

    function onFlightClassChange(e) {
        const flightClass = e.target.value;
        flightCriteriaReducer(flightClass, 'CLASS');
    }

    return (
        <FormControl>
            <InputLabel id="class">Класа:</InputLabel>
            <Select name='class' onChange={onFlightClassChange} className={styles.class} size='small' label='Класа:' value={defaultFlightClass} labelId="class">
                <MenuItem value='economy'>икономична</MenuItem>
                <MenuItem value='premium_Economy'>премиум икономи</MenuItem>
                <MenuItem value='business'>бизнес</MenuItem>
                <MenuItem value='first'>първа</MenuItem>
            </Select>
        </FormControl>
    )
}