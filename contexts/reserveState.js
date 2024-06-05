import { createContext, useEffect, useState } from "react";

export const ReserveContext = createContext();

export const ReserveState = ({ children }) => {
    const [reserve, setReserve] = useState({
        passengers: [],
        flight: {},
        card: {},
        email: ''
    });

    const [formValidation, setFormValidation] = useState({
        isSent: false,
        formComponents: []
    });

    const reserveReducer = (payload, action) => {
        switch (action) {
            case 'PASSENGER': {
                let index = Object.getOwnPropertyNames(payload)[0];
                let newPassengers = reserve.passengers;
                newPassengers[index] = { firstName: payload[index].firstName, lastName: payload[index].lastName, price: payload[index].price };

                setReserve({ ...reserve, passengers: newPassengers });
            } break;

            case 'FLIGHT': {
                setReserve({ ...reserve, flight: payload });
            } break;

            case 'CARD': {
                setReserve({ ...reserve, card: payload });
            } break;
            case 'EMAIL': {
                setReserve({ ...reserve, email: payload });
            } break;
        }
    }

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


    const reserveState = {
        reserve,
        reserveReducer,
        formValidation,
        formValidationReducer
    };

    return (
        <ReserveContext.Provider value={reserveState}>
            {children}
        </ReserveContext.Provider>
    )
}
