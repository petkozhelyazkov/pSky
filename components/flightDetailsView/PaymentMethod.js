import styles from './PaymentMethod.module.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useContext, useEffect, useState } from 'react';
import FlightDetailsForm from './formComponents/FlightDetailsForm';
import FlightDetailsFormHeader from './formComponents/FlightDetailsFormHeader';
import FlightDetailsFormInput from './formComponents/FlightDetailsFormInput';
import FlightDetailsFormSelectGroup from './formComponents/FlightDetailsFormSelectGroup';
import FlightDetailsFormSelect from './formComponents/FlightDetailsFormSelect';
import { ReserveContext } from '../../contexts/reserveState';
import { useLazyEffect } from '../../hooks';

export default function PaymentMethod() {
    const { reserveReducer, formValidation, formValidationReducer } = useContext(ReserveContext);
    const [values, setValues] = useState({
        number: '',
        dateOfValidity: {
            month: '',
            year: ''
        },
        cvc: '',
        name: '',
        type: 'Visa'
    })

    const [validation, setValidation] = useState({
        number: {
            isFalse: false,
            msg: '',
        },
        dateOfValidity: {
            isFalse: false,
            msg: '',
        },
        cvc: {
            isFalse: false,
            msg: '',
        },
        name: {
            isFalse: false,
            msg: '',
        }
    });

    function onDataChange(type) {

        return (e) => {
            let value = e.target.value;
            let pattern = /^(\d{3})$/m;

            let currValidation = {
                isFalse: false,
                msg: ''
            }

            if (value == '') {
                currValidation.isFalse = true;
            } else {
                currValidation.isFalse = false;
            }

            switch (type) {
                case 'dateOfValidity': currValidation.msg = 'Въведете фамилия!'; break;
                case 'cvc': currValidation.msg = 'Въведете код за сигурност!'; break;
                case 'name': currValidation.msg = 'Въведете град!'; break;
            }

            if (type == 'cvc' && value != '') {
                if (!pattern.test(value)) {
                    currValidation.isFalse = true;
                    currValidation.msg = 'Въведете валиден код за сигурнст!';
                }
            }

            setValidation({ ...validation, [type]: { ...currValidation } });
            setValues({ ...values, [type]: value });
        }
    }

    useLazyEffect(() => {
        let isValid = true;

        Object.keys(values).forEach((x, i) => {
            if (values[x] == '') {
                validation[x].isFalse = true;
                formValidationReducer({ index: i + 50, type: x, isTrue: false }, 'FORM_COMPONENT');
            } else {
                formValidationReducer({ index: i + 50, type: x, isTrue: true }, 'FORM_COMPONENT');
            }


            if (x == 'dateOfValidity') {
                Object.keys(values.dateOfValidity).forEach(x => {
                    if (values.dateOfValidity[x] == '') {
                        validation.dateOfValidity.isFalse = true;
                        isValid = false;
                        formValidationReducer({ index: i + 50, type: 'dateOfValidity', isTrue: isValid }, 'FORM_COMPONENT');
                    } else {
                        formValidationReducer({ index: i + 50, type: 'dateOfValidity', isTrue: true }, 'FORM_COMPONENT');
                    }
                });
            }
        });

        reserveReducer({ cardNumber: values.number, cardType: values.type }, 'CARD');
    }, [formValidation.isSent]);

    function onDateChange(type) {
        return (e) => {
            let value = e.target.value;
            setValues({ ...values, dateOfValidity: { ...values.dateOfValidity, [type]: value } });
        }
    }

    function onCardNumber(e) {
        let value = e.target.value;
        let pattern = /^(\d{16})$/m;

        let currValidation = {
            isFalse: false,
            msg: ''
        }

        if (value == '') {
            currValidation.isFalse = true;
            currValidation.msg = 'Въведете номер на карта!';
        } else if (!pattern.test(value)) {
            currValidation.isFalse = true;
            currValidation.msg = 'Въведете валиден номер на карта!';
        } else {
            currValidation.isFalse = false;

        }

        setValidation({ ...validation, number: { ...currValidation } });
        setValues({ ...values, number: value });
    }

    useEffect(() => {
        reserveReducer({ cardNumber: values.number, cardType: values.type }, 'CARD');
    }, [values.number, values.type]);

    function onSelect(card) {
        return () => {
            setValues({ ...values, type: card });
        }
    }

    useLazyEffect(() => {
        if (values.dateOfValidity.year != ''
            && values.dateOfValidity.month != '') {
            setValidation({ ...validation, dateOfValidity: { ...validation.dateOfValidity, isFalse: false } });
        }
    }, [values.dateOfValidity]);

    return (
        <div>
            <h4>Начин на плащане</h4>
            <div className={styles.cardPaymentMethod}>
                <CreditCardIcon className={styles.cardIcon} />
                <p className={styles.paymentDescription}>
                    Кредитна/дебитна карта
                </p>
            </div>

            <FlightDetailsForm>
                <FlightDetailsFormHeader label='Избери вид кредитна или дебитна карта:' />
                <div className={styles.cards}>
                    <CardCard name='Visa' onClick={onSelect('Visa')} card={values.type} />
                    <CardCard name='Master Card' onClick={onSelect('Master Card')} card={values.type} />
                    <CardCard name='Maestro' onClick={onSelect('Maestro')} card={values.type} />
                </div>
                <FlightDetailsFormHeader label='Въведи данните от картата:' />
                <FlightDetailsFormInput
                    onBlur={onCardNumber}
                    error={validation.number}
                    label='Номер на картата'
                    required
                    placeholder={values.name != 'Maestro' ? 'Въведете 16-цифрения номер на картата' : 'Въведете номер на картата'}
                />
                <FlightDetailsFormSelectGroup
                    error={validation.dateOfValidity}
                    label='Дата на валидност:'
                    required>
                    <FlightDetailsFormSelect
                        onSelect={onDateChange('month')}
                        placeholder='месец'>
                        <option value="1">яну</option>
                        <option value="2">фев</option>
                        <option value="3">март</option>
                        <option value="4">апр</option>
                        <option value="5">май</option>
                        <option value="6">юни</option>
                        <option value="7">юли</option>
                        <option value="8">авг</option>
                        <option value="9">сеп</option>
                        <option value="10">окт</option>
                        <option value="11">ное</option>
                        <option value="12">дек</option>
                    </FlightDetailsFormSelect>
                    <FlightDetailsFormSelect
                        onSelect={onDateChange('year')}
                        placeholder='година'>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                    </FlightDetailsFormSelect>
                </FlightDetailsFormSelectGroup>

                <FlightDetailsFormInput
                    onBlur={onDataChange('cvc')}
                    error={validation.cvc}
                    label='Код за сигурност:'
                    required
                    placeholder='CVC'
                    small
                />
                <FlightDetailsFormInput
                    onBlur={onDataChange('name')}
                    error={validation.name}
                    label='Име и фамилия на картодържателя:'
                    required
                    placeholder='Въведете име и фамилия'
                />
            </FlightDetailsForm>
        </div>
    )
}

function CardCard({
    name,
    onClick,
    card
}) {
    return (
        <div onClick={onClick} className={card == name ? styles.selectedCard : styles.card}>
            <img style={{ width: '50px' }} src={
                name == 'Visa'
                    ? 'Visa_logo.png'
                    : name == 'Master Card'
                        ? 'MasterCard_Logo.svg.png'
                        : 'Maestro_logo.png'
            }
                alt="" />
            <p className={styles.paymentDescription}>
                {name}
            </p>
        </div>
    )
}