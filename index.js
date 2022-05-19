const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleWere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejzgg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('to_do').collection('task');

        app.post('/todo', async (req, res) => {
            const todoTask = req.body;
            const result = await todoCollection.insertOne(todoTask);
            res.send(result)
        });

        app.get('/todo', async (req, res) => {
            const todos = await todoCollection.find().toArray();
            res.send(todos);
        })

        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await todoCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    textDecoration: update?.textDecoration
                }
            };
            const result = await todoCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });
    }
    finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('To Do App server in Running...')
})

app.listen(port, () => console.log('to app server run on', port))