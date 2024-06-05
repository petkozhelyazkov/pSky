import { Client, Entity, Repository, Schema } from 'redis-om';
const REDIS_URL = process.env.REDIS_URL;

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(REDIS_URL);
    }
}
connect()

class Airport extends Entity { }

let schema = new Schema(
    Airport,
    {
        "iata": { type: 'string' },
        "nameEn": { type: 'text', textSearch: true },
        "locationEn": { type: 'text', textSearch: true },
        "nameBg": { type: 'text', textSearch: true },
        "locationBg": { type: 'text', textSearch: true },
    },
    {
        dataStructure: 'JSON'
    }
);


async function search(q) {
    if (!q) return;


    const repo = client.fetchRepository(schema);

    const airports = await repo.search()
        .where('iata').eq(q)
        .or('nameEn').matches(q)
        .or('locationEn').matches(q)
        .or('nameBg').matches(q)
        .or('locationBg').matches(q)
        .return.all();

    return airports
}

export async function createIndex() {
    await connect()

    const repo = new Repository(schema, client);
    await repo.createIndex()
}

export default async function handler(req, res) {
    let keyword = req.body.replaceAll('"', '');
    if (keyword.length > 2) {
        try {
            let data = [];
            let a = await search(keyword);

            a.forEach(x => {
                let a = x.entityData;

                data.push({ name: a.nameBg, address: a.locationBg, iataCode: a.iata, nameEn: a.nameEn, addressEn: a.locationEn });
            });

            res.json(data);
        } catch (e) {
            console.log(e);
            res.end();
        }
    }
    else res.json([]);
}