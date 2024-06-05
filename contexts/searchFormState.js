import { createContext, useState, useEffect } from 'react';

export const SearchFormContext = createContext();

export const SearchFormState = ({ children }) => {
    const [flightCriteria, setFlightCriteria] = useState({
        passengers: {
            adult: 1,
            young: 0,
            child: 0,
            seated_infant: 0,
            sum: 1
        },
        type: 'twoway',
        class: 'economy',
        flights: [
            {
                // originLocationCode: "VAR",
                // originLocationCodeAutocompleteValue: "Варна, България, Летище Варна, (VAR)"
            }
        ]
    });
    const [formValidation, setFormValidation] = useState({
        isSent: false,
        formComponents: []
    });

    useEffect(() => {
        if (sessionStorage.getItem('SearchFormState')) {
            setFlightCriteria(JSON.parse(sessionStorage.getItem('SearchFormState')));
        } else {
            sessionStorage.setItem('SearchFormState', JSON.stringify(flightCriteria));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('SearchFormState', JSON.stringify(flightCriteria));
    }, [flightCriteria]);

    const formValidationReducer = (payload, action) => {
        switch (action) {
            case 'IS_SENT': {
                setFormValidation({ ...formValidation, isSent: payload });
            } break;
            case 'FORM_COMPONENT': {
                let { index, type, isTrue } = payload;

                let newFormComponents = formValidation.formComponents;
                if (!newFormComponents[index]) {
                    newFormComponents[index] = {};
                }
                newFormComponents[index][type] = isTrue;

                setFormValidation({ ...formValidation, formComponents: newFormComponents });
            } break;
        }
    }

    const flightCriteriaReducer = (payload, action) => {
        switch (action) {
            case 'PASSENGERS': {
                setFlightCriteria({ ...flightCriteria, passengers: payload });
            } break;
            case 'TYPE': {
                setFlightCriteria({ ...flightCriteria, type: payload });
            } break;
            case 'CLASS': {
                setFlightCriteria({ ...flightCriteria, class: payload });
            } break;
            case 'FLIGHTS': {
                setFlightCriteria({ ...flightCriteria, flights: payload });
            } break;
            case 'FLIGHTS/TYPE': {
                setFlightCriteria({ ...flightCriteria, flights: payload.flights, type: payload.type });
            } break;
        }
    }

    const searchFormState = {
        flightCriteria,
        flightCriteriaReducer,
        formValidation,
        formValidationReducer
    };

    return (
        <SearchFormContext.Provider value={searchFormState}>
            {children}
        </SearchFormContext.Provider>
    )
}