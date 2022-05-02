import styles from './SearchAutocomplete.module.css';
import { FormGroup } from 'react-bootstrap';
import { TextField, Autocomplete } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';

export default function SearchAutocomplete({
    label,
    type,
    index,
}) {
    const { flightCriteria, flightCriteriaReducer } = useContext(SearchFormContext);
    const [defaultValue, setDefaultValue] = useState(
        flightCriteria.flights[index]
            ? flightCriteria.flights[index][`${type}AutocompleteValue`]
            : ''
    );
    const [error, setError] = useState({
        isError: false,
        msg: 'Моля попълнете полето!'
    });
    const [destinations, setDestinations] = useState(['']);

    const autocompleteTimeout = 300;
    let autocompleteTimeoutHandle = 0;
    function onSearch(e) {
        clearTimeout(autocompleteTimeoutHandle);
        autocompleteTimeoutHandle = setTimeout(async () => {
            try {
                let keyword = e.target.value;

                let autocomplete = await fetch('/api/airports/autocomplete', {
                    method: 'POST',
                    'content-type': 'application/json',
                    body: JSON.stringify(keyword)
                }).then(x => x.json());

                setDestinations(autocomplete.map(x => `${x.address}, ${titleCase(x.name)}, (${x.iataCode})`));
            } catch (error) {
                console.error(error);
            }
        }, autocompleteTimeout);
    }

    function onDestinationSelect(e, value) {
        let newFlights = [...flightCriteria.flights];

        if (!value) {
            newFlights[index][type] = null;
            newFlights[index][`${type}AutocompleteValue`] = null;
        } else {
            const iataCode = value.substring(value.lastIndexOf('(') + 1, value.length - 1);

            if (!newFlights[index]) {
                newFlights[index] = {};
            }
            newFlights[index][type] = iataCode;
            newFlights[index][`${type}AutocompleteValue`] = value;
        }

        flightCriteriaReducer(newFlights, 'FLIGHTS');
    }

    return (
        <div>
            <FormGroup className={styles.autocomplete}>
                <Autocomplete onChange={onDestinationSelect} size='small' type="text"
                    options={destinations}
                    defaultValue={defaultValue}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => <TextField
                        error={error.isError}
                        helperText={error.isError ? error.msg : ''}
                        FormHelperTextProps={{
                            style:
                            {
                                margin: '-4px 0px 0px 5px',
                                height: '0px'
                            }
                        }}
                        onChange={onSearch} {...params} label={label}
                    />} >
                </Autocomplete>
            </FormGroup >
        </div>
    )
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
}