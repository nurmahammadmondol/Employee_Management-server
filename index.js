require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.ackxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('Employee_Management');
    const EmployeeManagement_LatestNews = database.collection('Latest_News');

    const EmployeeManagement_NewUser = database.collection('User');

    const EmployeeManagement_EmployeeWorkSheet =
      database.collection('Work_Sheet');

    // Latest News :

    app.get('/latest-news', async (req, res) => {
      const filter = await EmployeeManagement_LatestNews.find().toArray();
      res.send(filter);
    });

    app.get('/latest-news/:id', async (req, res) => {
      const ID = req.params.id;
      const RealID = { _id: new ObjectId(ID) };
      const result = await EmployeeManagement_LatestNews.findOne(RealID);
      res.send(result);
    });

    // User :

    app.get('/User', async (req, res) => {
      const filter = await EmployeeManagement_NewUser.find().toArray();
      res.send(filter);
    });

    app.post('/User', async (req, res) => {
      const Data = req.body;
      // console.log(Data);

      const quary = { Email: Data?.Email };
      const axistingUser = await EmployeeManagement_NewUser.findOne(quary);
      if (axistingUser) {
        return res.send({ message: 'user already exists' });
      }

      const result = await EmployeeManagement_NewUser.insertOne(Data);
      res.send(result);
    });

    // Employee Work Sheet :

    app.get('/WorkSheet', async (req, res) => {
      const filter =
        await EmployeeManagement_EmployeeWorkSheet.find().toArray();
      res.send(filter);
    });

    app.post('/WorkSheet', async (req, res) => {
      const Data = req.body;
      const result = await EmployeeManagement_EmployeeWorkSheet.insertOne(Data);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World this is our Employee Management Server Site!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
