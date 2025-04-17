const express = require('express'); //requires server to use express and other 
const mongoose = require('mongoose'); //require mongoose for mongo
const cors = require('cors'); //require cors because ports were being iffy during development
const path = require('path'); //allows for working in directory paths

const transactionRoutes = require('./transactionRoutes'); //imports routing logic

const app = express(); //creates an instance of express framework

app.use(cors()); //middleware
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

//mongoDB connection URL & connection to mongo logging PUT YOUR MONGO URI WITH DATA HERE
const mongoURI = 'mongoose.connect(process.env.MONGO_URI)';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.use('/api/transactions', transactionRoutes); //define routes

const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));

app.use((err, req, res, next) => { //middleware error handling
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000; //define deploy port and start the server
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
