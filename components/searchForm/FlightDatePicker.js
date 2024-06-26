import styles from './FlightDatePicker.module.css';
import moment from 'moment';
import { TextField } from '@mui/material';
import { FormGroup } from 'react-bootstrap';
import { DatePicker } from '@mui/lab';
import { useContext, useState, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';
import { useLazyEffect } from '../../hooks';

export default function FlightDatePicker({
    label,
    type,
    index
}) {
    const { flightCriteria, flightCriteriaReducer, formValidation, formValidationReducer } = useContext(SearchFormContext);
    const [date, setDate] = useState('');
    const [error, setError] = useState({
        isError: false,
        msg: 'Моля попълнете полето!'
    });
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!flightCriteria.flights[index]) return;

        setDate(flightCriteria.flights[index][type])
        setValue(flightCriteria.flights[index][type]);
    }, [flightCriteria]);

    useLazyEffect(() => {
        if ((flightCriteria.type != 'twoway' && type == 'comingDate')) {
            setError({ ...error, isError: false });
            formValidationReducer({ index, type, isTrue: true }, 'FORM_COMPONENT');

            return;
        }

        if (!value) {
            setError({ ...error, isError: true });
            formValidationReducer({ index, type, isTrue: false }, 'FORM_COMPONENT');
        } else {
            setError({ ...error, isError: false });
            formValidationReducer({ index, type, isTrue: true }, 'FORM_COMPONENT');
        }
    }, [formValidation.isSent]);


    function onDateChange(value) {
        let newFlights = [...flightCriteria.flights];

        if (!value) {
            newFlights[index][type] = null;
        } else {
            const isoDate = moment(value).format('yyyy-MM-DD');
            setDate(isoDate);

            if (!newFlights[index]) {
                newFlights[index] = {};
            }
            newFlights[index][type] = isoDate;
            setError({ ...error, isError: false });
        }

        flightCriteriaReducer(newFlights, 'FLIGHTS');
        setValue(value);
    }

    return (
        <FormGroup className={styles.datePicker}>
            <DatePicker
                disabled={flightCriteria.type != 'twoway' && type == 'comingDate'}
                inputFormat="DD-MM-YYYY"
                disableMaskedInput={true}
                value={date || null}
                onChange={onDateChange}
                renderInput={props => {
                    return <TextField
                        error={error.isError}
                        helperText={error.isError ? error.msg : ''}
                        FormHelperTextProps={{
                            style: {
                                margin: '-4px 0px 0px 5px', height: '0px',
                                color: 'rgb(219, 47, 47)'
                            }
                        }}
                        size='small' {...props} label={label} />;
                }
                } />
        </FormGroup>
    )
}