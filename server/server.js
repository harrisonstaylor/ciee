// const { MongoClient } = require("mongodb");
//
// // Replace the following with your Atlas connection string
// const url = "mongodb+srv://hst:Vg43IJPOcsc9f38L@nodetasks.thuggr0.mongodb.net/?retryWrites=true&w=majority"
// const client = new MongoClient(url);
//
// // Reference the database to use
// const dbName = "NodeTasks";
//
// async function run() {
//     try {
//         // Connect to the Atlas cluster
//         await client.connect();
//         const db = client.db(dbName);
//
//         const col = db.collection("TaskManager");
//
//
//     } catch (err) {
//         console.log(err.stack);
//     }
//
//     finally {
//         await client.close();
//     }
// }
//
// run().catch(console.dir);


// server.js
const express = require('express');
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Replace the following with your Atlas connection string
const url = "mongodb+srv://hst:Vg43IJPOcsc9f38L@nodetasks.thuggr0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = "NodeTasks";

async function connectAndFetchData() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("TaskManager");

        const data = await col.find().toArray();
        return data;
    } finally {
        await client.close();
    }
}

app.get('/buttons', async (req, res) => {
    try {
        // const buttons = await connectAndFetchData();
        connectAndFetchData().then((butt) => res.send(butt));
        // console.log(buttons);
        // res.send(buttons);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;


