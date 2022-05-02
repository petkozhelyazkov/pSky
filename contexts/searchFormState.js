import { createContext, useState } from 'react';

export const SearchFormContext = createContext();

export const SearchFormState = ({ children }) => {
    const [flightCriteria, setFlightCriteria] = useState({
        passengers: {
            adult: 1,
            child: 0,
            seated_infant: 0,
            sum: 1
        },
        type: 'twoway',
        class: 'economy',
        flights: [
            {}
        ]
    });

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
            }
        }
    }

    const searchFormState = {
        flightCriteria,
        flightCriteriaReducer
    };

    return (
        <SearchFormContext.Provider value={searchFormState}>
            {children}
        </SearchFormContext.Provider>
    )
}