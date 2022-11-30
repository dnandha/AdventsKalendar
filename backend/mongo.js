const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const {MongoClient} = require('mongodb');

const { config } = require('dotenv');

//const recordRoutes = express.Router();
//recordRoutes.route("/testCode").get(async function (req, res) {
//});

config();

const app = express();

app.use(cors());
app.use(bodyParser.json())


app.get("/testCode", (req, res) => {
    //const today = new Date().getDate();
    const today = parseInt(req.query.day);
    const code = parseInt(req.query.code);

    const client = new MongoClient(process.env.URI);

    //console.log(today, code);
    getCalVal(client, "codes", {
        day: today
    }).then(r => {
        //console.log(today, r.code);
        if (r.code === code) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
});

app.get("/getSolved", (req, res) => {
    const today = parseInt(req.query.day);
    //console.log(today);

    const client = new MongoClient(process.env.URI);

    getCalVal(client, "solved", {
            day: today
        }).then(r => {
            if (r != null) {
                res.json({solved: r.solved});
            } else {
                res.json({solved: false});
            }
    });
});

app.put("/setSolved", (req, res) => {
    const today = parseInt(req.body.day);

    const client = new MongoClient(process.env.URI);

    setSolved(client, {
            day: today
        },
        {
            day: today,
            solved: true
        }).then(r => res.send("OKMAN"));
});

function rand(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

async function insert(collection) {
    for (let i = 1; i <= 31; i++) {
        const r = rand(100000, 999999);
        console.log(r);
        await collection.insertOne({
            day: i,
            code: r,
        })
    }
}

async function setSolved(client, filter, setVal) {
    try {
        await client.connect();
        const collection = client.db("advkal").collection("solved");

        const res = await collection.updateOne(filter, {$set: setVal}, {upsert: true});
        //console.log(res)

        return 0;
    } catch (e) {
        console.error(e);
        return -1;
    } finally {
        await client.close();
    }
}

async function getCalVal(client, collName, filter) {
    try {
        await client.connect();
        //const dbs = await client.db().admin().listDatabases();
        //dbs.databases.map(console.log);

        const collection = client.db("advkal").collection(collName);
        //await insert(collection);

        return await collection.findOne(filter);
    } catch (e) {
        console.error(e);
        return -1;
    } finally {
        await client.close();
    }
}

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));