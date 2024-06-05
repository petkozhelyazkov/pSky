import TravelerForm from './TravelerForm';

export default function TravelersInfo({
    passengers,
    travelers,
    userPassengers
}) {
    let arr = [];

    for (const key in passengers) {
        for (let i = 0; i < passengers[key]; i++) {
            let price;

            if (key == 'young') {
                price = travelers.filter(x => x.travelerType == 'ADULT')[0]?.price?.total;
            } else {
                price = travelers.filter(x => x.travelerType == key.toUpperCase())[0]?.price?.total;
            }

            if (key == 'adult') arr.push({ adult: passengers.adults, travelerType: 'ADULT', price, index: i + 1 });
            if (key == 'young') arr.push({ young: passengers.young, travelerType: 'YOUNG', price, index: i + 1 });
            if (key == 'child') arr.push({ child: passengers.child, travelerType: 'CHILD', price, index: i + 1 });
            if (key == 'seated_infant') arr.push({ seated_infant: passengers.seated_infant, price, travelerType: 'SEATED_INFANT', index: i + 1 });
        }
    }

    return (
        <div>
            <h4>Пътници</h4>
            <div>
                {arr.map((x, i) =>
                    <div key={i}>
                        <TravelerForm userPassengers={userPassengers} traveler={x} index={i} />
                    </div>)}
            </div>
        </div>
    )
}