import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';

export default function SelectFlightType() {
    const { flightCriteria, flightCriteriaReducer } = useContext(SearchFormContext);
    const [defaultType, setDefaultType] = useState('');

    useEffect(() => {
        setDefaultType(flightCriteria.type);
    }, [flightCriteria]);

    function onFlightTypeChanage(e) {
        let type = e.target.value;

        if (type == 'multi') {
            let newFlights = [...flightCriteria.flights];
            newFlights.push({});

            flightCriteriaReducer({ flights: newFlights, type }, 'FLIGHTS/TYPE');
        } else {
            flightCriteriaReducer({ flights: [flightCriteria.flights[0]], type }, 'FLIGHTS/TYPE');
        }
    }

    return (
        <RadioGroup onChange={onFlightTypeChanage} value={defaultType} name='type' row>
            <FormControlLabel control={<Radio value="twoway" id='twoway' />} label="Двупосочен" />
            <FormControlLabel control={<Radio value="oneway" id='oneway' />} label="Еднопосочен" />
            <FormControlLabel control={<Radio value="multi" id='multi' />} label="Полет с много отсечки" />
        </RadioGroup>
    )
}