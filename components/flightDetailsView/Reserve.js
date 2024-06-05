import styles from './Reserve.module.css';
import FlightDetailsFormCheckbox from './formComponents/FlightDetailsFormCheckbox';
import { useContext, useState } from 'react';
import { ReserveContext } from '../../contexts/reserveState';
import { useLazyEffect } from '../../hooks';
import { UserContext } from '../../contexts/userContext';
import { useRouter } from 'next/router';

export default function Reserve({
    flight
}) {
    const router = useRouter();
    const { formValidationReducer, reserve, formValidation } = useContext(ReserveContext);
    const { userReducer } = useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const [validation, setValidation] = useState(false);

    useLazyEffect(() => {
        let isReady = true;

        if (checked) {
            if (formValidation.isSent) {
                formValidation.formComponents.forEach((x, i) => {
                    for (const key in formValidation.formComponents[i]) {
                        isReady = isReady && formValidation.formComponents[i][key];
                    }
                });

                if (isReady) {
                    userReducer({ flight, passengers: reserve.passengers }, 'ADD_FLIGHT');

                    fetch('/api/pdf', {
                        method: 'POST',
                        'Content-Type': 'application/json',
                        body: JSON.stringify({ flight, passengers: reserve.passengers, cardInfo: reserve.card, email: reserve.email })
                    })
                        .then(x => x.blob())
                        .then(x => {
                            showFile(x);
                            router.push('/thanks');
                        });
                }
            }
        } else {
            setValidation(true);
        }

        formValidationReducer(false, 'IS_SENT');
    }, [formValidation.isSent]);

    async function onReserve() {
        formValidationReducer(true, 'IS_SENT');
    }

    function onSelect(e) {
        let value = e.target.checked;
        setChecked(value);

        if (value) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }

    return (
        <div className={styles.reserveWrapper}>
            <FlightDetailsFormCheckbox
                onSelect={onSelect}
                error={validation}
                label='Потвърждавам, че съм запознат и се съгласявам с: Условия за превоз,
                 Условията за резервация (вкл. условията за анулация), 
                 Общите условия, Информацията за онлайн свързана услуга.'
                required />
            <button onClick={onReserve}>Резервирай</button>
        </div>
    )
}

function showFile(blob) {
    var newBlob = new Blob([blob], { type: "application/pdf" })

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = "ticket.pdf";
    link.click();
    setTimeout(function () {
        window.URL.revokeObjectURL(data);
    }, 100);
}