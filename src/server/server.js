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
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Replace the following with your Atlas connection string
const url = process.env.ATLAS_URI;
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





app.post('/new-task', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        const newTask = {
            title: req.body.title,
            date: new Date(),
            status: 'pending',
            urgency: req.body.urgency
        };

        const result = await db.collection('TaskManager').insertOne(newTask);

        await client.close();

        res.status(201).json({ message: 'Task added successfully', taskId: result.insertedId });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = app;


