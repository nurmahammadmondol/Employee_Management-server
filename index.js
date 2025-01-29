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
    // Connect the client to the server (optional starting in v4.7)
    // await client.connect();

    const database = client.db('Employee_Management');
    const EmployeeManagement_LatestNews = database.collection('Latest_News');
    const EmployeeManagement_NewUser = database.collection('User');
    const EmployeeManagement_EmployeeWorkSheet =
      database.collection('Work_Sheet');
    const EmployeeManagement_PaymentRequest =
      database.collection('Payment_Request');

    // Latest News Routes:
    app.get('/latest-news', async (req, res) => {
      try {
        const filter = await EmployeeManagement_LatestNews.find().toArray();
        res.send(filter);
      } catch (error) {
        console.error('Error fetching latest news:', error);
        res.status(500).send('Failed to fetch latest news');
      }
    });

    app.get('/latest-news/:id', async (req, res) => {
      try {
        const ID = req.params.id;
        const RealID = { _id: new ObjectId(ID) };
        const result = await EmployeeManagement_LatestNews.findOne(RealID);
        res.send(result);
      } catch (error) {
        console.error('Error fetching specific news:', error);
        res.status(500).send('Failed to fetch specific news');
      }
    });

    // User Routes:
    app.get('/User', async (req, res) => {
      try {
        const filter = await EmployeeManagement_NewUser.find().toArray();
        res.send(filter);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Failed to fetch users');
      }
    });

    app.get('/User/:id', async (req, res) => {
      try {
        const ID = req.params.id;
        const quary = { _id: new ObjectId(ID) };
        const filter = await EmployeeManagement_NewUser.findOne(quary);
        res.send(filter);
      } catch (error) {
        console.error('Error fetching specific user:', error);
        res.status(500).send('Failed to fetch specific user');
      }
    });

    app.post('/User', async (req, res) => {
      try {
        const Data = req.body;
        const quary = { Email: Data?.Email };
        const axistingUser = await EmployeeManagement_NewUser.findOne(quary);
        if (axistingUser) {
          return res.send({ message: 'User already exists' });
        }

        const result = await EmployeeManagement_NewUser.insertOne(Data);
        res.send(result);
      } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Failed to insert user');
      }
    });

    app.patch('/User/:id', async (req, res) => {
      try {
        const Data = req.body;
        const ID = req.params.id;
        const filter = { _id: new ObjectId(ID) };
        const updateDoc = {
          $set: {
            Name: Data?.Name,
            Email: Data?.Email,
            Photo: Data?.Photo,
            UserRole: Data?.UserRole,
            verified: Data?.verified,
            dismiss: Data?.Dismiss,
          },
        };

        const result = await EmployeeManagement_NewUser.updateOne(
          filter,
          updateDoc
        );
        res.send(result);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Failed to update user');
      }
    });

    // Employee Work Sheet Routes:
    app.get('/WorkSheet', async (req, res) => {
      try {
        const filter =
          await EmployeeManagement_EmployeeWorkSheet.find().toArray();
        res.send(filter);
      } catch (error) {
        console.error('Error fetching worksheets:', error);
        res.status(500).send('Failed to fetch worksheets');
      }
    });

    app.get(`/WorkSheet/:id`, async (req, res) => {
      try {
        const ID = req.params.id;
        const quary = { _id: new ObjectId(ID) };
        const filter = await EmployeeManagement_EmployeeWorkSheet.findOne(
          quary
        );
        res.send(filter);
      } catch (error) {
        console.error('Error fetching specific worksheet:', error);
        res.status(500).send('Failed to fetch specific worksheet');
      }
    });

    app.post('/WorkSheet', async (req, res) => {
      try {
        const Data = req.body;
        const result = await EmployeeManagement_EmployeeWorkSheet.insertOne(
          Data
        );
        res.send(result);
      } catch (error) {
        console.error('Error inserting worksheet:', error);
        res.status(500).send('Failed to insert worksheet');
      }
    });

    app.patch('/WorkSheet/:id', async (req, res) => {
      try {
        const Data = req.body;
        const ID = req.params.id;
        const filter = { _id: new ObjectId(ID) };
        const updateDoc = {
          $set: {
            tasks: Data.tasks,
            WorkingTime: Data.WorkingTime,
            startDate: Data.startDate,
          },
        };
        const result = await EmployeeManagement_EmployeeWorkSheet.updateOne(
          filter,
          updateDoc
        );
        res.send(result);
      } catch (error) {
        console.error('Error updating worksheet:', error);
        res.status(500).send('Failed to update worksheet');
      }
    });

    app.delete('/WorkSheet/:id', async (req, res) => {
      try {
        const ID = req.params.id;
        const findData = { _id: new ObjectId(ID) };
        const result = await EmployeeManagement_EmployeeWorkSheet.deleteOne(
          findData
        );
        res.send(result);
      } catch (error) {
        console.error('Error deleting worksheet:', error);
        res.status(500).send('Failed to delete worksheet');
      }
    });

    // Payment Request Routes:
    app.get('/Payment_Request', async (req, res) => {
      try {
        const result = await EmployeeManagement_PaymentRequest.find().toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching payment requests:', error);
        res.status(500).send('Failed to fetch payment requests');
      }
    });

    app.post('/Payment_Request', async (req, res) => {
      try {
        const Data = req.body;
        const result = await EmployeeManagement_PaymentRequest.insertOne(Data);
        res.send(result);
      } catch (error) {
        console.error('Error inserting payment request:', error);
        res.status(500).send('Failed to insert payment request');
      }
    });

    app.patch('/Payment_Request/:id', async (req, res) => {
      try {
        const { approvedTime, request, salary } = req.body; // Relevant fields destructured
        const ID = req.params.id;
        const filter = { _id: new ObjectId(ID) };

        const updateDoc = {
          $set: {},
        };

        if (approvedTime !== undefined) {
          updateDoc.$set.approvedTime = approvedTime;
        }

        if (request !== undefined) {
          updateDoc.$set.request = request;
        }

        if (salary !== undefined) {
          updateDoc.$set.salary = salary;
        }

        const result = await EmployeeManagement_PaymentRequest.updateOne(
          filter,
          updateDoc
        );
        res.send(result);
      } catch (error) {
        console.error('Error updating payment request:', error);
        res.status(500).send('Failed to update payment request');
      }
    });

    // Ping the MongoDB server
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
  res.send('Hello World, this is our Employee Management Server Site!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
