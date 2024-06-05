import { useContext, useState } from 'react';
import { ReserveContext } from '../../contexts/reserveState';
import { useLazyEffect } from '../../hooks';
import FlightDetailsForm from './formComponents/FlightDetailsForm';
import FlightDetailsFormHeader from './formComponents/FlightDetailsFormHeader';
import FlightDetailsFormInput from './formComponents/FlightDetailsFormInput';
import FlightDetailsFormSelect from './formComponents/FlightDetailsFormSelect';
import DetailsFormSelectGroup from './formComponents/FlightDetailsFormSelectGroup';

const travelerTypes = {
    'ADULT': { type: 'Възрастен', age: '(Над 18г.)' },
    'YOUNG': { type: 'Младеж', age: '(12-18г.)' },
    'CHILD': { type: 'Дете', age: '(2-12г.)' },
    'SEATED_INFANT': { type: 'Бебе', age: '(До 2г.)' },
}

const genders = {
    'мъж': 'male',
    'жена': 'female',
    'друг': 'other'
}

export default function TravelerForm({
    traveler,
    index,
    userPassengers
}) {
    const { reserveReducer, formValidation, formValidationReducer } = useContext(ReserveContext);
    const [passengerSelect, setPassengersSelect] = useState();
    const [currentSelectedPassenger, setCurrentSelectedPassenger] = useState({});


    useLazyEffect(() => {
        let passenger = userPassengers.filter(x => x.id == passengerSelect)[0];
        setCurrentSelectedPassenger({ ...passenger, gender: genders[passenger?.gender] });

        setPassengerInfo({
            firstName: passenger?.firstName,
            lastName: passenger?.lastName,
            gender: 'male',
            dateOfBirth: {
                day: passenger?.day,
                month: passenger?.month,
                year: passenger?.year
            }
        })

        setValidation({
            firstName: {
                isFalse: false,
                msg: 'Моля, въведете името на латинница!'
            },
            lastName: {
                isFalse: false,
                msg: 'Моля, фамилията на латинница!'
            },
            gender: {
                isFalse: false,
                msg: 'Моля изберете пол!'
            },
            dateOfBirth: {
                isFalse: false,
                msg: 'Въведете дата на раждане!'
            }
        })
    }, [passengerSelect]);

    const [passengerInfo, setPassengerInfo] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: {
            day: '',
            month: '',
            year: ''
        }
    });
    const [validation, setValidation] = useState({
        firstName: {
            isFalse: false,
            msg: 'Моля, въведете името на латинница!'
        },
        lastName: {
            isFalse: false,
            msg: 'Моля, фамилията на латинница!'
        },
        gender: {
            isFalse: false,
            msg: 'Моля изберете пол!'
        },
        dateOfBirth: {
            isFalse: false,
            msg: 'Въведете дата на раждане!'
        }
    });

    useLazyEffect(() => {
        let isValid = true;

        if (traveler.travelerType == 'ADULT') {
            setPassengerInfo({
                ...passengerInfo, dateOfBirth: {
                    day: '1',
                    month: '1',
                    year: '1'
                }
            });
        }

        Object.keys(passengerInfo).forEach(x => {
            if (passengerInfo[x] == '') {
                validation[x].isFalse = true;
                isValid = false;
                formValidationReducer({ index, type: x, isTrue: false }, 'FORM_COMPONENT');
            } else {
                formValidationReducer({ index, type: x, isTrue: true }, 'FORM_COMPONENT');
            }
            if (x == 'dateOfBirth') {
                Object.keys(passengerInfo.dateOfBirth).forEach(x => {
                    if (passengerInfo.dateOfBirth[x] == '') {
                        validation.dateOfBirth.isFalse = true;
                        isValid = false;
                        formValidationReducer({ index, type: 'dateOfBirth', isTrue: isValid }, 'FORM_COMPONENT');
                    } else {
                        formValidationReducer({ index, type: 'dateOfBirth', isTrue: true }, 'FORM_COMPONENT');
                    }
                });
            }
        });

        if (isValid) {
            reserveReducer({ [index]: { ...passengerInfo, price: traveler.price } }, 'PASSENGER');
        }
    }, [formValidation.isSent]);

    function onPassengerInfoChange(type) {
        return (e) => {
            let value = e.target.value;
            let pattern = /([A-Z])+/gi;
            let currValidation = {
                isFalse: false,
                msg: 'Моля, въведете името на латинница!'
            }

            if (!pattern.test(value) && type != 'gender') {
                currValidation.isFalse = true;
            } else {
                currValidation.isFalse = false;
            }

            setValidation({ ...validation, [type]: { ...currValidation } });
            setPassengerInfo({ ...passengerInfo, [type]: value });
        }
    }

    function onDateOfBirthChange(type) {
        return (e) => {
            let value = e.target.value;
            setPassengerInfo({ ...passengerInfo, dateOfBirth: { ...passengerInfo.dateOfBirth, [type]: value } });
        }
    }

    useLazyEffect(() => {
        if (passengerInfo.dateOfBirth.day != ''
            && passengerInfo.dateOfBirth.month != ''
            && passengerInfo.dateOfBirth.year != '') {
            setValidation({ ...validation, dateOfBirth: { ...validation.dateOfBirth, isFalse: false } });
        }
    }, [passengerInfo.dateOfBirth]);

    return (
        <FlightDetailsForm>
            <FlightDetailsFormHeader
                label={travelerTypes[traveler.travelerType].type + ' ' + traveler.index}
                subLabel={travelerTypes[traveler.travelerType].age}
                passengersSelect={
                    userPassengers &&
                        traveler.travelerType == 'ADULT'
                        ? userPassengers?.filter(x => x.age > 17)
                        : traveler.travelerType == 'YOUNG'
                            ? userPassengers?.filter(x => x.age > 11 && x.age < 18)
                            : traveler.travelerType == 'CHILD'
                                ? userPassengers?.filter(x => x.age > 1 && x.age < 13)
                                : traveler.travelerType == 'SEATED_INFANT'
                                    ? userPassengers?.filter(x => x.age < 2)
                                    : ''
                }
                setPassengersSelect={setPassengersSelect}
            />

            <FlightDetailsFormInput
                error={validation.firstName}
                onBlur={onPassengerInfoChange('firstName')}
                label='Име:'
                required
                placeholder='по документ за самоличност(латиница)'
                defaultValue={currentSelectedPassenger?.firstName}
            />
            <FlightDetailsFormInput
                error={validation.lastName}
                onBlur={onPassengerInfoChange('lastName')}
                label='Фамилия:'
                required
                placeholder='по документ за самоличност(латиница)'
                defaultValue={currentSelectedPassenger?.lastName}
            />

            <FlightDetailsFormSelect
                onSelect={onPassengerInfoChange('gender')}
                error={validation.gender}
                label='Пол:'
                required
                defaultValue={currentSelectedPassenger?.gender}
                placeholder='избери'
            >
                <option value="male">Мъж</option>
                <option value="female">Жена</option>
                <option value="other">Друг</option>
            </FlightDetailsFormSelect>

            {traveler.travelerType != 'ADULT' &&
                <DetailsFormSelectGroup
                    error={validation.dateOfBirth}
                    label='Дата на раждане:'
                    required
                >
                    <FlightDetailsFormSelect
                        defaultValue={currentSelectedPassenger?.day}
                        onSelect={onDateOfBirthChange('day')}
                        required
                        placeholder='ден'
                    >
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </FlightDetailsFormSelect>

                    <FlightDetailsFormSelect
                        defaultValue={currentSelectedPassenger?.month}
                        onSelect={onDateOfBirthChange('month')}
                        placeholder='месец'>
                        <option value="01">яну</option>
                        <option value="02">фев</option>
                        <option value="03">март</option>
                        <option value="04">апр</option>
                        <option value="05">май</option>
                        <option value="06">юни</option>
                        <option value="07">юли</option>
                        <option value="08">авг</option>
                        <option value="09">сеп</option>
                        <option value="10">окт</option>
                        <option value="11">ное</option>
                        <option value="12">дек</option>
                    </FlightDetailsFormSelect>


                    <FlightDetailsFormSelect
                        defaultValue={currentSelectedPassenger?.year}
                        onSelect={onDateOfBirthChange('year')}
                        placeholder='година'>
                        {traveler.travelerType == 'SEATED_INFANT'
                            ?
                            <>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </>
                            : traveler.travelerType == 'CHILD' ?
                                <>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                </>
                                : <>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                </>
                        }
                    </FlightDetailsFormSelect>
                </DetailsFormSelectGroup>
            }
        </FlightDetailsForm >
    )
}