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
const client = new MongoClient(url);

const dbName = "NodeTasks";

async function connectAndFetchData() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("TaskManager");

        const data = await col.find().toArray();

        return data.map(({_id, ...rest}) => ({id: _id.toString(), ...rest}));
    } finally {
        await client.close();
    }
}

app.get('/buttons', async (req, res) => {
    try {
        connectAndFetchData().then((buttons) => res.send(buttons));
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
            date: new Date().toLocaleString(),
            status: 'pending',
            urgency: req.body.urgency
        };

        const result = await db.collection('TaskManager').insertOne(newTask);

        if (result.insertedId != null) {
            res.status(200).json({ message: 'Task inserted successfully' });
        } else {
            res.status(404).json({ error: 'Task insertion error' });
        }



    } catch (error) {
        console.error('Error adding task:', error);

    } finally {
        await client.close();
    }
});

app.post('/resolve-task', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);

        const taskId = req.body.taskId;
        // eslint-disable-next-line no-unused-vars
        const result = await db.collection('TaskManager').updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { status: 'resolved' } }
        );


        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Task resolved successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error resolving task:', error);
    } finally {
        await client.close();
    }
});



app.delete('/delete-task/:taskId', async (req, res) => {
    try {
        await client.connect();

        const db = client.db(dbName);
        const taskId = req.params.taskId;

        const result = await db.collection('TaskManager').deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await client.close();
    }
});


module.exports = app;
