import Amadeus from 'amadeus';
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API,
    clientSecret: process.env.AMADEUS_SECRET,
});

export default async function handler(req, res) {
    const { flights, passengers, type, class: flightClass } = JSON.parse(req.body);

    const flightsReq = [];
    const travelers = [];

    flights.forEach((x, i) => {
        if (x != undefined) {
            let newFlight = {
                id: i + 1,
                originLocationCode: x.originLocationCode,
                destinationLocationCode: x.destinationLocationCode,
                departureDateTimeRange: {
                    date: x.goingDate
                }
            };
            flightsReq.push(newFlight);

            if (type == 'twoway') {
                let newFlight = {
                    id: i + 2,
                    originLocationCode: x.destinationLocationCode,
                    destinationLocationCode: x.originLocationCode,
                    departureDateTimeRange: {
                        date: x.comingDate
                    }
                };
                flightsReq.push(newFlight);
            }
        }
    });

    let travelerIndex = 1;

    for (const key in passengers) {
        if (key == 'sum') continue;

        for (let i = 0; i < passengers[key]; i++) {
            if (key != 'young') {
                travelers.push({ id: travelerIndex, travelerType: key.toUpperCase() });
            } else {
                travelers.push({ id: travelerIndex, travelerType: 'ADULT' });
            }
            travelerIndex++;
        }
    }

    const request = {
        "currencyCode": "BGN",
        originDestinations: flightsReq,
        travelers,
        "sources": [
            "GDS"
        ],
        "searchCriteria": {
            "maxFlightOffers": 20,
            "flightFilters": {
                "cabinRestrictions": [
                    {
                        "cabin": flightClass.toUpperCase(),
                        "originDestinationIds": [
                            "1"
                        ]
                    }
                ],
            },
        }
    };

    try {
        const { data } = await amadeus.client.post('/v2/shopping/flight-offers', JSON.stringify(request));

        res.send(data);
    } catch (e) {
        res.send(e);
    }
}