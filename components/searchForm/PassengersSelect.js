import styles from './PassengersSelect.module.css';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import MenuItemCounter from "./MenuItemCounter";
import { useContext } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';

export default function PassengersSelect() {
    const { flightCriteria } = useContext(SearchFormContext);

    return (
        <FormControl>
            <InputLabel className={styles.passengersLabel} id="passengers">Пътници:</InputLabel>
            <Select className={styles.passengersSelect} label='Пътници:' defaultValue='test' labelId='passengers' size='small'>
                <MenuItem className={styles.hidden} value='test'>{flightCriteria.passengers.sum}</MenuItem>
                <MenuItemCounter name='adult' main text="Възрастни" description="Над 12 г." />
                <MenuItemCounter name='child' text="Деца" description="2-12 г." />
                <MenuItemCounter name='seated_infant' text="Бебета" description="до 2 г." />
            </Select>
        </FormControl>
    )
}