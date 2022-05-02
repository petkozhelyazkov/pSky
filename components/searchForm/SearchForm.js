import styles from './SearchForm.module.css';
import { useContext, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';
import PassengersSelect from './PassengersSelect';
import FlightOptions from './FlightOptions';
import FlightClassSelect from './FlightClassSelect';
import FlightTypeSelect from './FlightTypeSelect';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';


export default function SearchForm() {
    const { flightCriteria, formValidationReducer, formValidation } = useContext(SearchFormContext);

    useEffect(() => {
        console.log(formValidation.formComponents);
    }, [flightCriteria, formValidation])

    function onFormSubmit(e) {
        e.preventDefault();
        formValidationReducer(true, 'IS_SENT');
    }

    useEffect(() => {
        formValidationReducer(false, 'IS_SENT');
    }, [formValidation.isSent])

    return (
        <form onSubmit={onFormSubmit}>
            <div className={styles.wrapper}>
                <div className={styles.lineTop}>
                    <FlightTypeSelect />
                    <FlightClassSelect />
                </div>
                <div className={styles.line}>
                    <div className={styles.flightOptionsWrapper}>
                        <FlightOptions />
                    </div>
                    <div>
                        <PassengersSelect />
                    </div>
                    <div className={styles.button}>
                        <Button size='small' type='submit'>
                            <div>
                                <SearchIcon fontSize='large' />
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}