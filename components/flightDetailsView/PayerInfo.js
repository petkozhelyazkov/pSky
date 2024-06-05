import FlightDetailsForm from './formComponents/FlightDetailsForm';
import FlightDetailsFormInput from './formComponents/FlightDetailsFormInput';
import FlightDetailsFormSelect from './formComponents/FlightDetailsFormSelect';
import CountryOptions from './formComponents/CountryOptions';
import { useContext, useEffect, useState } from 'react';
import { ReserveContext } from '../../contexts/reserveState';
import { useLazyEffect } from '../../hooks';

export default function PaymentMethod({
    user
}) {
    const { formValidation, formValidationReducer } = useContext(ReserveContext);

    const [values, setValues] = useState({
        city: "",
        country: "",
        firstName: "",
        lastName: "",
        number: "",
        postCode: "",
        street: "",
    });

    const [validation, setValidation] = useState({
        city: {
            isFalse: false,
            msg: '',
        },
        country: {
            isFalse: false,
            msg: '',
        },
        firstName: {
            isFalse: false,
            msg: '',
        },
        lastName: {
            isFalse: false,
            msg: '',
        },
        postCode: {
            isFalse: false,
            msg: '',
        },
        street: {
            isFalse: false,
            msg: '',
        },
    });


    useLazyEffect(() => {
        Object.keys(values).forEach((x, i) => {
            if (x != 'number') {
                if (values[x] == '') {
                    validation[x].isFalse = true;
                    formValidationReducer({ index: i + 30, type: x, isTrue: false }, 'FORM_COMPONENT');
                } else {
                    formValidationReducer({ index: i + 30, type: x, isTrue: true }, 'FORM_COMPONENT');
                }
            }
        });
    }, [formValidation.isSent]);

    useEffect(() => {
        if (user?.paymentData) {
            setValues(user.paymentData);
        }
    }, [user]);

    function onDataChange(type) {

        return (e) => {
            let value = e.target.value;

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
                case 'firstName': currValidation.msg = 'Въведете име!'; break;
                case 'lastName': currValidation.msg = 'Въведете фамилия!'; break;
                case 'postCode': currValidation.msg = 'Въведете пощенски код!'; break;
                case 'city': currValidation.msg = 'Въведете град!'; break;
                case 'street': currValidation.msg = 'Въведете улица!'; break;
                case 'country': currValidation.msg = 'Въведете държвава!'; break;
            }

            setValidation({ ...validation, [type]: { ...currValidation } });
            setValues({ ...values, [type]: value });
        }
    }

    return (
        <div>
            <FlightDetailsForm label='Данни за платеца'>
                <FlightDetailsFormInput
                    onBlur={onDataChange('firstName')}
                    error={validation.firstName}
                    label='Име:'
                    required
                    defaultValue={values?.firstName} />
                <FlightDetailsFormInput
                    onBlur={onDataChange('lastName')}
                    error={validation.lastName}
                    label='Фамилия:'
                    required
                    defaultValue={values?.lastName} />
                <FlightDetailsFormSelect
                    onSelect={onDataChange('country')}
                    error={validation.country}
                    label='Държава:'
                    required
                    big
                    placeholder={values?.country}>
                    <CountryOptions />
                </FlightDetailsFormSelect>
                <FlightDetailsFormInput
                    onBlur={onDataChange('postCode')}
                    error={validation.postCode}
                    label='Пощенски код:'
                    small
                    required
                    defaultValue={values?.postCode} />
                <FlightDetailsFormInput
                    onBlur={onDataChange('city')}
                    error={validation.city}
                    label='Град:'
                    required
                    defaultValue={values?.city} />
                <FlightDetailsFormInput
                    onBlur={onDataChange('street')}
                    error={validation.street}
                    label='Улица:'
                    required
                    defaultValue={values?.street} />
                <FlightDetailsFormInput label='Номер на улица:' defaultValue={values?.number} />
            </FlightDetailsForm>
        </div >
    )
}
