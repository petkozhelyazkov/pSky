import { Client, Entity, Schema } from 'redis-om';
const REDIS_URL = "redis://default:rKB4z1VRiFwqo0TFcHloACiAA483vwxz@redis-15561.c243.eu-west-1-3.ec2.cloud.redislabs.com:15561";
//TODO:MOVE TO .env.local

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(REDIS_URL);
    }
}

class iataCode extends Entity { }

let schema = new Schema(
    iataCode,
    {
        "iataCode": { type: 'string' },
        "airportEn": { type: 'text', textSearch: true },
        "locationEn": { type: 'text', textSearch: true },
        "airportBg": { type: 'text', textSearch: true },
        "locationBg": { type: 'text', textSearch: true },
    },
    {
        dataStructure: 'JSON'
    }
);

async function search(q) {
    if (!q) return;

    await connect();
    const repo = client.fetchRepository(schema);

    const airports = await repo.search()
        .where('iataCode').eq(q)
        .or('airportEn').matches(q)
        .or('locationEn').matches(q)
        .or('airportBg').matches(q)
        .or('locationBg').matches(q)
        .return.all();

    return airports
}

export default async function handler(req, res) {
    let keyword = req.body.replaceAll('"', '');
    if (keyword.length > 2) {
        try {
            let data = [];
            let a = await search(keyword);

            a.forEach(x => {
                let a = x.entityData;

                data.push({ name: a.airportBg, address: a.locationBg, iataCode: a.iataCode, nameEn: a.airportEn, addressEn: a.locationEn });
            });

            res.json(data);
        } catch (e) {
            console.log(e);
            res.end();
        }
    }
    else res.json([]);
}