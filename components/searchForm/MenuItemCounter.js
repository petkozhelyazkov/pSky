import styles from './MenuItemCounter.module.css';
import { MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';
import { SearchFormContext } from '../../contexts/searchFormState';

export default function MenuItemCounter({
    name,
    text,
    description
}) {
    const { flightCriteria, flightCriteriaReducer } = useContext(SearchFormContext);
    const [value, setValue] = useState(flightCriteria.passengers[name]);

    function onAdd() {
        setValue(value + 1);

        let passengers = { ...flightCriteria.passengers };
        passengers[name] = value + 1;
        passengers.sum += 1;
        flightCriteriaReducer(passengers, 'PASSENGERS');
    }

    function onSubtract() {
        if (value == 0) return;
        if (value == 1 && name == 'adult') return;

        setValue(value - 1);

        let passengers = { ...flightCriteria.passengers };
        passengers[name] = value - 1;
        passengers.sum -= 1;
        flightCriteriaReducer(passengers, 'PASSENGERS');
    }

    return (
        <MenuItem>
            <div className={styles.menuItemWrapper}>
                <div className={styles.descriptionWrapper}>
                    <p className={styles.itemName}>{text}</p>
                    <p className={styles.itemDescription}>{description}</p>
                </div>
                <div className={styles.passengerCounter}>
                    <RemoveIcon className={styles.passengerSubtractButton} onClick={onSubtract} />
                    <span>{value}</span>
                    <AddIcon className={styles.passengerAddButton} onClick={onAdd} />
                </div>
            </div>
        </MenuItem>
    )
}