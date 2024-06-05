import jspdf from 'jspdf';
import moment from 'moment';
import 'moment/locale/en-au';

export default async function handler(req, res) {
    moment.locale('en-au');
    let body = JSON.parse(req.body);

    let flight = body.flight;
    let flightPassengers = body.passengers;
    let card = body.cardInfo;
    let email = body.email;

    let pdf = createPdf(flight, flightPassengers, card, email);
    pdf.save(__dirname + '/ticket.pdf')

    res.send(pdf.output());
}

function createPdf(flight, flightPassengers, card) {
    let pdf = new jspdf();

    let ticketTotal = 0;

    flightPassengers.forEach(x => {
        ticketTotal += Number(x.price);
    });

    logo(pdf);
    barcode(pdf);
    important(pdf);
    let itineraryStartY = passengers(pdf, flightPassengers);
    let receiptStartY = itinerary(pdf, itineraryStartY, flight.itineraries, flight.flightClass);
    receiptDetails(pdf, receiptStartY, card, ticketTotal);

    return pdf;
}

function receiptDetails(pdf, startY, card, ticketTotal) {
    ////////////////////////////
    //Receipt Details
    pdf.setTextColor('white');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);

    pdf.setFillColor(100, 100, 100);
    pdf.rect(10, startY, 100, 4, 'F');
    pdf.text('Your Receipt Details', 11, startY + 3);

    pdf.setFillColor(150, 150, 150);
    pdf.rect(10, startY + 4, 100, 4, 'F');

    pdf.setTextColor('black');
    pdf.setFontSize(8);
    pdf.text('Ticket Charges', 11, startY + 7);
    pdf.text('Charges', 55, startY + 7);
    pdf.text('Total*', 95, startY + 7);

    pdf.setFillColor(200, 200, 200);
    pdf.rect(10, startY + 8.5, 100, 4, 'F');
    pdf.text('Total*', 11, startY + 11.5);
    pdf.text(ticketTotal.toFixed(2).toString(), 55, startY + 11.5);


    pdf.setFillColor(230, 230, 230);
    pdf.rect(10, startY + 12.5, 100, 4, 'F');
    pdf.text('Card Payment Fee', 11, startY + 15.5);
    pdf.text('30.00', 55, startY + 15.5);



    pdf.setFillColor(150, 150, 150);
    pdf.rect(10, startY + 16.5, 100, 7, 'F');

    pdf.setTextColor(194, 3, 3);
    pdf.setFontSize(9);
    pdf.text('Total Amount Payable*', 11, startY + 21.5);
    pdf.text(((ticketTotal + 30).toFixed(2)).toString(), 95, startY + 21.5);

    pdf.setTextColor('black');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', '')
    pdf.text('*Includes Taxes/Fees/carrier Charges', 10, startY + 26.5);


    // ///////////////////////////////////////////////////////////
    // //Payment Details
    pdf.setTextColor('white');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setFillColor(100, 100, 100);
    pdf.rect(111, startY, 90, 4, 'F');
    pdf.text('Payment Details', 112, startY + 2.7);

    //145

    pdf.setFillColor(150, 150, 150);
    pdf.rect(111, startY + 4, 90, 4, 'F');

    pdf.setTextColor('black');
    pdf.setFontSize(8);
    pdf.text('Date', 112, startY + 7);
    pdf.text('Payment Type', 128, startY + 7);
    pdf.text('Referrence', 155, startY + 7);
    pdf.text('Amount*', 187, startY + 7);

    pdf.setFillColor(200, 200, 200);
    pdf.rect(111, startY + 8.5, 90, 4, 'F');

    pdf.text(moment().format('DD MMM YY'), 112, startY + 11.5);
    pdf.text(card.cardType, 128, startY + 11.5);
    pdf.text(formatCard(card.cardNumber), 155, startY + 11.5);
    pdf.text(((ticketTotal + 30).toFixed(2)).toString(), 187, startY + 11.5);


    pdf.setFont('helvetica', '');
    pdf.setTextColor('black');
    pdf.setFontSize(10);
    pdf.text(
        `*This may appear as multiple transactions on your credit card
  statement`, 111, startY + 16);
}

function passengers(pdf, passengers) {
    pdf.setFillColor(100, 100, 100);
    pdf.rect(10, 70, 191, 4, 'F');

    pdf.setTextColor('white');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text('Passenger Ticket Information', 11, 72.7);

    pdf.setFillColor(150, 150, 150);
    pdf.rect(10, 74, 191, 4, 'F');

    pdf.setTextColor('black');
    pdf.setFontSize(8);
    pdf.text('Passenger Name', 11, 77);
    pdf.text('Frequent Flyer No.', 65, 77);
    pdf.text('Ticket No.', 115, 77);
    pdf.text('Issued', 155, 77);
    pdf.text('Ticket Total*', 183, 77);

    let lastPassengerY = 78.5;
    let sum = 0;

    passengers.forEach((x, i) => {
        let textOffset = 4 * i;
        let fieldOffset = 4 * i;

        if (i % 2 == 0) {
            pdf.setFillColor(200, 200, 200);
        } else {
            pdf.setFillColor(230, 230, 230);
        }

        pdf.rect(10, 78.5 + fieldOffset, 191, 4, 'F');

        pdf.text(`${x.firstName} ${x.lastName}`, 11, 81.5 + textOffset);
        pdf.text(generateRandomTicketNumber(), 115, 81.5 + textOffset);
        pdf.text(moment().format('DD MMM YY'), 155, 81.5 + textOffset);
        pdf.text(x.price, 183, 81.5 + textOffset);

        sum += Number(x.price);
        lastPassengerY += 4;
    });

    pdf.setFillColor(150, 150, 150);
    pdf.rect(10, lastPassengerY, 191, 7, 'F');
    pdf.setTextColor(194, 3, 3);
    pdf.setFontSize(11.5);
    pdf.setFont('helvetica', '');
    pdf.text('Ticket Total for all passengers*', 120, lastPassengerY + 4);
    pdf.text(sum.toFixed(2).toString(), 180, lastPassengerY + 4);


    pdf.setTextColor('black');
    pdf.setFontSize(8.5);
    pdf.text('*Amounts are displayed in Bulgarian Lev (BGN)', 141.5, lastPassengerY + 10);

    return lastPassengerY + 12;
}

function itinerary(pdf, startY, itinerary, flightClass) {
    pdf.setFillColor(100, 100, 100);
    pdf.rect(10, startY, 191, 4, 'F');

    pdf.setTextColor('white');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text('Your Itinerary', 11, startY + 2.7);
    pdf.setFillColor(150, 150, 150);
    pdf.rect(10, startY + 4, 191, 4, 'F');
    pdf.setTextColor('black');
    pdf.setFontSize(8);
    pdf.text('Date', 11, startY + 7);
    pdf.text('Flight Number', 50, startY + 7);
    pdf.text('Departing', 100, startY + 7);
    pdf.text('Arriving', 145, startY + 7);
    pdf.text('Status', 183, startY + 7);

    let lastitineraryY = startY + 8.3;

    let index = 0

    itinerary.forEach(x => x.segments.forEach((x, i) => {
        let segment = x;
        let textOffset = 15 * index;
        let fieldOffset = 15.2 * index;
        index++;

        if (i % 2 == 0) {
            pdf.setFillColor(200, 200, 200);
        } else {
            pdf.setFillColor(230, 230, 230);
        }
        pdf.rect(10, startY + 8.3 + fieldOffset, 191, 15, 'F');

        let flightNumber = segment.carrierCode + segment.number;

        let departureDate = segment.departure.at;
        let formattedDepartureDate = departureDate.substring(0, departureDate.indexOf('T'));
        let formattedDepartureTime = departureDate.substring(departureDate.indexOf('T') + 1, departureDate.length - 3);

        let departing =
            `${segment.departure.iataCode}
${formattedDepartureTime}`;

        let arrivalDate = segment.arrival.at;
        let formattedArrivalDate = arrivalDate.substring(arrivalDate.indexOf('-') + 1, arrivalDate.indexOf('T'));
        let formattedArrivalTime = arrivalDate.substring(arrivalDate.indexOf('T') + 1, arrivalDate.length - 3);
        let arrivalTerminal = segment.arrival.terminal

        let arrving = `${segment.arrival.iataCode}
${formattedArrivalTime}
${formattedArrivalDate}
${arrivalTerminal ? `Terminal ${arrivalTerminal}` : ''}`;

        pdf.text(formattedDepartureDate, 10.5, startY + 11.5 + textOffset);
        pdf.text(flightNumber, 50, startY + 11.5 + textOffset);
        pdf.text(departing, 100, startY + 11.5 + textOffset);
        pdf.text(arrving, 145, startY + 11.5 + textOffset);
        pdf.text(flightClass, 183, startY + 11.5 + textOffset);

        lastitineraryY += 15.2;
    }));

    return lastitineraryY + 4.8;
}

function important(pdf) {
    let a = 128;

    for (let i = 0; i < 100; i++) {
        pdf.setDrawColor(a + i, a + i, a + i);
        pdf.rect(11 + i / 10, 37 + i / 10, 9 - (i / 10) * 2, 9 - (i / 10) * 2);
    }

    pdf.setTextColor(250, 61, 61);
    pdf.setFontSize(30);
    pdf.text('i', 14.1, 45.3);

    pdf.setLineWidth(10);

    pdf.setTextColor('black');
    pdf.setFontSize(12);
    pdf.text('Important Information', 24, 39);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', '');

    pdf.text(`-  This is your E-Ticket Itinerary & Receipt. You must bring it with you to the airport for check-in, andit is 
   recommended you retain a copy for your records.`, 24, 44);

    pdf.text(`-  Each passenger travelling needs a printed copy of this document for immigration, customs, airport security 
   checks and duty free purchases.`, 24, 53);

    pdf.text(`-  Please familiarise yourself with the key Conditions of Carriage and other information attached.`, 24, 62);
}

function barcode(pdf) {
    const x = {
        1: 0.2,
        2: 0.4,
        3: 0.6,
        4: 0.8
    }
    const y = 10;

    let posX = 150;
    let posY = 10;

    for (let i = 0; i < 40; i++) {
        let rndBlack = random(1, 4);
        let rndWhite = random(1, 4);

        pdf.rect(posX, posY, x[rndBlack], y, 'F');
        posX += x[rndBlack];
        posX += x[rndWhite] + 0.1;
    }

    pdf.rect(145, 21, 55, 5, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor('white');
    pdf.text('Your Booking Reference', 151.5, 24.5);

    pdf.setDrawColor('darkRed');
    pdf.rect(145, 27, 55, 6);
    pdf.setTextColor('black');
    pdf.setFontSize(14);
    pdf.text(generateCode(6), 162, 32);
}


function logo(pdf) {
    pdf.setFont('helvetica', 'bolditalic');
    pdf.setFontSize(25);
    pdf.text('pSky', 12, 18);
    pdf.setFontSize(13);
    pdf.text('E-Ticket Itinerary & Receipt', 11, 24);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    return result;
}

function generateRandomTicketNumber() {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 13; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    result = result.substring(0, 3) + '-' + result.substring(4, result.length);

    return result;
}

function formatCard(cardNumber) {
    console.log(cardNumber);

    return `xxxx-xxxx-xxxx-${cardNumber.substring(cardNumber.length - 4, cardNumber.length)}`;
}
