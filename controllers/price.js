const axios = require('axios');
const price = async(req,res) => {
    try{
        const { fromCurrency, toCurrency, date } = req.body;
        if( ! fromCurrency || !toCurrency || !date){
            return res.status(400).send({message:"Invalid request"})
        }
        try {
            const response1 = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history`, {
                params: {
                    date,
                    localization: false
                }
            });

            const x = response1.data.market_data.current_price["btc"];

            const response2 = await axios.get(`https://api.coingecko.com/api/v3/coins/${toCurrency}/history`, {
                params: {
                    date,
                    localization: false
                }
            });

            const y = response2.data.market_data.current_price["btc"];


            res.status(200).json({
                price: x/y,
            });}
        catch(error){
            //console.log(error);
            res.status(500).send({
                message : "something went wrong"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message : "something went wrong"
        })
    }
}

module.exports = price;