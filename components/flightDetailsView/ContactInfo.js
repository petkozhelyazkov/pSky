import { useContext, useEffect, useState } from 'react';
import { ReserveContext } from '../../contexts/reserveState';
import { useLazyEffect } from '../../hooks';
import FlightDetailsForm from './formComponents/FlightDetailsForm';
import FlightDetailsFormInput from './formComponents/FlightDetailsFormInput';

export default function ContactInfo({
    user
}) {
    const { formValidation, formValidationReducer, reserveReducer } = useContext(ReserveContext);

    const [values, setValues] = useState({
        number: "",
        email: "",
        reEmail: "",
    });

    const [validation, setValidation] = useState({
        number: {
            isFalse: false,
            msg: '',
        },
        email: {
            isFalse: false,
            msg: '',
        },
        reEmail: {
            isFalse: false,
            msg: '',
        }
    });

    useLazyEffect(() => {
        let isValid = true;

        Object.keys(values).forEach((x, i) => {
            if (values[x] == '') {
                validation[x].isFalse = true;
                isValid = false;
                formValidationReducer({ index: i + 40, type: x, isTrue: false }, 'FORM_COMPONENT');
            } else {
                formValidationReducer({ index: i + 40, type: x, isTrue: true }, 'FORM_COMPONENT');
            }
        });

        if (isValid) {
            reserveReducer(values.reEmail, 'EMAIL');
        }
    }, [formValidation.isSent]);

    useEffect(() => {
        if (user.userData) {
            setValues(user.userData);
        }
    }, [user]);

    function onDataChange(type) {

        return (e) => {
            let value = e.target.value;
            let currValidation = {
                isFalse: false,
                msg: ''
            }

            if (type == 'number') {
                let pattern = /\d+/;

                if (!pattern.test(value) || value.length != 10) {
                    currValidation.msg = 'Въведете валиден телефонен номер!';
                    currValidation.isFalse = true;
                }
            }
            if (type == 'email') {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (!pattern.test(value) || value.length < 6) {
                    currValidation.msg = 'Въведете валиден имейл адрес!';
                    currValidation.isFalse = true;
                }
            }
            if (type == 'reEmail') {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (value != values.email) {
                    currValidation.msg = 'Имейл адресите не съвпадат!';
                    currValidation.isFalse = true;
                }

                if (!pattern.test(value) || value.length < 6) {
                    currValidation.msg = 'Въведете валиден имейл адрес!';
                    currValidation.isFalse = true;
                }
            }

            setValidation({ ...validation, [type]: { ...currValidation } });
            setValues({ ...values, [type]: value });
        }
    }

    return (
        <div>
            <FlightDetailsForm label='Данни за контакт'>
                <FlightDetailsFormInput
                    error={validation.number}
                    onBlur={onDataChange('number')}
                    label='Телефон:'
                    placeholder='Номер'
                    required
                    defaultValue={values?.number} />
                <FlightDetailsFormInput
                    error={validation.email}
                    onBlur={onDataChange('email')}
                    label='E-mail:'
                    required
                    defaultValue={values?.email} />
                <FlightDetailsFormInput
                    error={validation.reEmail}
                    onBlur={onDataChange('reEmail')}
                    label='Повтори E-mail:'
                    required defaultValue={values?.reEmail} />
            </FlightDetailsForm>
        </div>
    )
}
