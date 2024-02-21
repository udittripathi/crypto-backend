# crypto-backend

## To run:
```
git clone https://github.com/udittripathi/crypto-backend.git
```
```
npm i
```

```
nodemon index.js
```

### Task 1
http://localhost:5000/cryptocurrencies
- To get all the cryptocurriencies name and id from MongoDB Databases.

### Task 2
http://localhost:5000/price
- API endpoint to get price of one currency in another on a particular date
- requrest body
   ```
   {
    "fromCurrency" : "bitcoin" ,
    "toCurrency" : "basic-attention-token",
    "date" : "12-01-2023"
  }
   ```
### Task 3
http://localhost:5000/companies/public_treasury
- API endpoint to get the list of companies that hold a particular cryptocurrency
- request body
```
  {
  "currency" : "bitcoin"
  }
```