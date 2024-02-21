const axios = require('axios');
const mongoose = require('mongoose');
const Crypto = require('./models/Cryptocurrency'); // MongoDB model for cryptocurrencies
const express = require("express");
const cron = require("node-cron");
const cors = require('cors');
const prices = require('./controllers/price');
const companies = require('./controllers/companies')

const app = express();
app.use(express.json());
app.use(cors()); 


// MongoDB connection
mongoose.set('bufferCommands', true)
mongoose.connect('mongodb://0.0.0.0:27017/crypto')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Fetch cryptocurrency data from Coingecko API
const fetchAndStoreCryptoData = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-EwfDRfFRoFzeqsJNN2rFnwmS');
        const cryptoList = response.data;
        await Crypto.deleteMany({});
        await Crypto.insertMany(cryptoList);
        console.log('Cryptocurrency data updated successfully.');
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
};

// Cron job to update cryptocurrency data every hour
cron.schedule('0 * * * *', fetchAndStoreCryptoData);

app.get('/cryptocurrencies', async (req, res) => {
    try {
      const cryptocurrencies = await Crypto.find();
      res.json(cryptocurrencies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// API endpoint to get price of one currency in another on a particular date
app.get("/price",prices);  

// API endpoint to get the list of companies that hold a particular cryptocurrency
app.get("/companies/public_treasury",companies)  



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
