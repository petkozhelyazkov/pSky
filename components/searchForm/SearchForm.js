import styles from './SearchForm.module.css';
import { useContext, useState, useEffect } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';
import PassengersSelect from './PassengersSelect';
import FlightOptions from './FlightOptions';
import FlightClassSelect from './FlightClassSelect';
import FlightTypeSelect from './FlightTypeSelect';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useLazyEffect } from '../../hooks';
import { useRouter } from 'next/router';
import { CircularProgress, Modal } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default function SearchForm() {
    const { flightCriteria, formValidationReducer, formValidation } = useContext(SearchFormContext);
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    function onFormSubmit(e) {
        e.preventDefault();
        formValidationReducer(true, 'IS_SENT');
    }

    useLazyEffect(() => {
        if (formValidation.isSent) {
            let isReady = true;

            for (let i = 0; i < flightCriteria.flights.length; i++) {
                for (const key in formValidation.formComponents[i]) {
                    isReady = isReady && formValidation.formComponents[i][key];
                }
            }

            if (isReady) {
                setLoader(true);
                console.log('ok!');
                router.push({
                    pathname: '/search',
                    query: { flightCriteria: JSON.stringify(flightCriteria) }
                });
            }
        }

        formValidationReducer(false, 'IS_SENT');
    }, [formValidation.isSent]);

    useEffect(() => {
        setLoader(false);
    }, [router.query]);

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
            {loader &&
                <Modal open>
                    <div style={{ display: 'flex', height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '50%', width: '30%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size='200px' thickness={2} >
                            </CircularProgress>
                            <div style={{ position: 'absolute', zIndex: '10', marginBottom: '60px' }}>
                                <FlightTakeoffIcon fontSize='large' htmlColor='rgb(25,118,210)' />
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <p style={{ fontSize: '20px' }}>Търсим полети...</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </form>
    )
}