const mongoose = require('mongoose');

const cryptocurrencySchema = new mongoose.Schema({
    name: String,
    id: String
});

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema);
