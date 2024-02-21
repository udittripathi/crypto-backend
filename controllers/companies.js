const axios = require('axios');
const companies  = async(req,res) => {
    const { currency } = req.body;

    if (!currency) {
        return res.status(400).json({ message: 'Invalid currency parameter.' });
    }
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
        res.status(200).send({
            companies : response.data,
            message : "success"
        }
            )
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({
            message :"something went wrong"
        }
        )
    }
}

module.exports = companies;