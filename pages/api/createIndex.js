import { createIndex } from "./airports/autocomplete";

export default async function handler(req, res) {
    await createIndex();
    res.status(200).send('ok');
}
